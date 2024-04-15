export interface IApiServiceObject {
  [key: string]: any;
}

export type IApiServiceMethodType = "get" | "post" | "patch" | "delete" | "put";

export interface IApiServiceMethodResult {
  path: string;
  method: IApiServiceMethodType;
  params?: IApiServiceObject;
}

export interface IApiServiceMethodData {
  [key: string]: (params?: IApiServiceObject) => IApiServiceMethodResult;
}

export interface IApiServiceRequestParams {
  name: string;
  pathParams?: IApiServiceObject;
  payload?: IApiServiceObject;
}

export type IApiServiceGetTokenMethod = () => string | null | undefined;

export interface IApiServiceRequestMethodParams {
  method: IApiServiceMethodType;
  path: string;
  payload?: IApiServiceObject;
  params?: IApiServiceObject;
}

export type IApiServiceRequestMethod = (params: IApiServiceRequestMethodParams) => Promise;

export interface IApiServiceResponse {
  data: any;
  status?: any;
}
