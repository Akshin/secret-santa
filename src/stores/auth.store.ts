import { TokenService } from "@/services";
import { ApiService } from "@/services/";
import type { ILogin, ILoginPayload } from "@/types/system";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useCommonStore } from "./common.store";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const storeCommon = useCommonStore();

  async function login(payload: ILoginPayload): Promise<ILogin> {
    try {
      const { data } = await ApiService.request({ name: "login", payload });
      TokenService.setToken(data.token);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function sendPhone(payload: any) {
    try {
      const { data } = await ApiService.request({ name: "phoneVerify", payload });
      return data;
    } catch (e) {
      throw e;
    }
  }

  function logout(toLoginPage: boolean = true): void {
    TokenService.clearToken();

    storeCommon.clear();
    if (toLoginPage) router.push({ name: "login" });
  }

  return { login, sendPhone, logout };
});
