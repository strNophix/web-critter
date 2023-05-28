export interface RpcMessage<T> {
  arguments: T;
  method: string;
}

export interface RpcResponse<T> {
  arguments: T;
  result: string;
}

export interface RpcCall {
  arguments: object;
  response: object;
}

export interface Credentials {
  url: string;
  user: string;
  password: string;
}

export interface SessionGetCmd {
  arguments: {
    fields: string[];
  };
  response: {
    version: string;
  };
}
