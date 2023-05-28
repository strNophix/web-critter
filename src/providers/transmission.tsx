import { PropsWithChildren, useEffect, useState } from "react";

import {
  Credentials,
  RpcCall,
  RpcMessage,
  RpcResponse,
  SessionGetCmd,
} from "@/models/transmission";
import { TransmissionContext } from "@/contexts/transmission";

export function TransmissionProvider(props: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<SessionGetCmd["response"]>({
    version: "",
  });
  const [credentials, setCredentials] = useState<Credentials>({
    url: "",
    user: "",
    password: "",
  });
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    const inner = async () => {
      if (isLoggedIn === true) return;
      const resp = await _call<SessionGetCmd["arguments"]>("session-get", {
        fields: ["version"],
      });

      if (resp.status === 401) {
        setSession({ version: "" });
        setIsLoggedIn(false);
        return;
      }

      const data: RpcResponse<SessionGetCmd["response"]> = await resp.json();
      setSession(data.arguments);
      setIsLoggedIn(true);
    };

    inner();
  }, [credentials, isLoggedIn]);

  const _call = async <T extends object>(
    method: string,
    args: T,
    _csrfToken?: string
  ): Promise<Response> => {
    _csrfToken ??= csrfToken;
    const authToken = btoa(`${credentials.user}:${credentials.password}`);
    const resp = await fetch(credentials.url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authToken}`,
        "X-Transmission-Session-Id": _csrfToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arguments: args,
        method: method,
      } as RpcMessage<T>),
    });

    if (resp.status === 409) {
      _csrfToken = resp.headers.get("X-Transmission-Session-Id") ?? "";
      setCsrfToken(_csrfToken);
      return await _call(method, args, _csrfToken);
    }

    return resp;
  };

  const call = async <T extends RpcCall>(
    method: string,
    args: T["arguments"]
  ): Promise<RpcResponse<T["response"]>> => {
    const resp = await _call<T["arguments"]>(method, args);
    const data: RpcResponse<T["response"]> = await resp.json();
    return data;
  };

  const login = async (credentials: Credentials) => {
    setCredentials(credentials);
  };

  return (
    <TransmissionContext.Provider value={{ login, call, isLoggedIn, session }}>
      {props.children}
    </TransmissionContext.Provider>
  );
}
