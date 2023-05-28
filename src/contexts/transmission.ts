import {
  Credentials,
  RpcCall,
  RpcResponse,
  SessionGetCmd,
} from "@/models/transmission";
import { createContext } from "react";

interface TransmissionState {
  isLoggedIn: boolean;
  session: SessionGetCmd["response"];
  call: <T extends RpcCall>(
    method: string,
    args: T["arguments"]
  ) => Promise<RpcResponse<T["response"]>>;
  login: (credentials: Credentials) => Promise<void>;
}

export const TransmissionContext = createContext<TransmissionState>({
  isLoggedIn: false,
  session: { version: "" },
  call: () => Promise.resolve({ arguments: {}, result: "" }),
  login: () => Promise.resolve(),
});
