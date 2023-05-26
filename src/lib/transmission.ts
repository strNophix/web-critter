interface RpcMessage<T> {
  arguments: T;
  method: string;
  tag: number;
}

interface RpcResponse<T> {
  arguments: T;
  result: string;
  tag: number;
}

interface RpcCall {
  arguments: object;
  response: object;
}

export class TransmissionClient {
  private readonly url = "http://localhost:9091/transmission/rpc";
  private counter = 0;
  private credentials: [string, string] = ["user", "password"];
  private csrfToken = "";

  public async call<T extends RpcCall>(
    method: string,
    args: T["arguments"]
  ): Promise<RpcResponse<T["response"]>> {
    const resp = await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(this.credentials.join(":"))}`,
        "X-Transmission-Session-Id": this.csrfToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arguments: args,
        method: method,
        tag: this.counter++,
      } as RpcMessage<T["arguments"]>),
    });

    if (resp.status === 409) {
      this.csrfToken = resp.headers.get("X-Transmission-Session-Id") ?? "";
      return this.call(method, args);
    }

    const data: RpcResponse<T["response"]> = await resp.json();
    return data;
  }
}
