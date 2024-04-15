import type { IAppSettings } from "@/types";

export const appSettings: IAppSettings = {
  apiUrl: import.meta.env.VITE_API_URL as string,
  gameUrl: import.meta.env.VITE_GAME_URL as string,
  captchaToken: import.meta.env.VITE_CAPTCHA_TOKEN as string,
  captchaTokenNew: import.meta.env.VITE_CAPTCHA_TOKEN_NEW as string,
  referalUrl: import.meta.env.VITE_REFERAL as string,
  origin: location.origin,
  tokenPrefix: "e"
};
