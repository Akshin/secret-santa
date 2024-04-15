import { methods } from "@/data/methods.data";
import { axiosRequest } from "@/plugins/axios";
import { ApiService as _ApiService } from "./apiService";
import { sendGoal } from "./metrika";
import { TokenService as _TokenService } from "./tokenService";

export const TokenService = new _TokenService();
export const ApiService = new _ApiService(() => TokenService.getToken(), axiosRequest, methods);
export const MetrikaSerice = { sendGoal };
