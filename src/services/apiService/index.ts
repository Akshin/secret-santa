import type {
  IApiServiceGetTokenMethod,
  IApiServiceMethodData,
  IApiServiceRequestMethod,
  IApiServiceRequestParams
} from "./types";

export class ApiService {
  private getTokenMethod;
  private requestMethod;
  private methods;

  constructor(
    getTokenMethod: IApiServiceGetTokenMethod,
    requestMethod: IApiServiceRequestMethod,
    methods: IApiServiceMethodData
  ) {
    this.getTokenMethod = getTokenMethod;
    this.requestMethod = requestMethod;
    this.methods = methods;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.getTokenMethod()}`
    };
  }

  public request({ name, pathParams, payload }: IApiServiceRequestParams) {
    const { path, method, params } = this.methods[name](pathParams);

    const _params = { headers: this.getHeaders() };
    const resultParams = params ? Object.assign(_params, params) : _params;

    return this.requestMethod({ method, path, payload, params: resultParams });
  }
}
