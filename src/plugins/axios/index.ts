import type {
  IApiServiceRequestMethodParams,
  IApiServiceResponse
} from "@/services/apiService/types";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: any) {
    const { status } = error.response;
    const store = useAuthStore();

    if (status === 401) {
      store.logout();
    }

    return Promise.reject(error);
  }
);

async function axiosRequest({
  method,
  path,
  payload,
  params
}: IApiServiceRequestMethodParams): Promise<IApiServiceResponse> {
  if (method === "get" || method === "delete") {
    return axios[method](path, params);
  } else {
    return axios[method](path, payload, params);
  }
}

export { axiosRequest };
