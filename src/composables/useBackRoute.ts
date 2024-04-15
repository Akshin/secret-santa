import { onBeforeRouteLeave, useRouter } from "vue-router";

export const useBackRoute = () => {
  const router = useRouter();

  onBeforeRouteLeave((to, from, next) => {
    if (to.name === "lkBase" && from.name !== "home" && from.name !== "login") {
      next({ name: "home" });
    } else {
      next();
    }
  });

  function back() {
    router.go(-1);
  }

  return { back };
};
