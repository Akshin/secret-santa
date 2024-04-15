import { TokenService } from "@/services";
import { useCommonStore } from "@/stores/common.store";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const storeCommon = useCommonStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const needInitRequest = !from.name || from.matched.every((record) => !record.meta.requiresAuth);

  if (!requiresAuth) {
    return next();
  }

  if (!TokenService.getToken()) {
    return next({ name: "login" });
  }

  if (needInitRequest) {
    await storeCommon.init();
    return next();
  }

  next();
};
