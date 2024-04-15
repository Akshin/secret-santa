import { ref, watch } from "vue";
import { useRoute, type RouteRecordName } from "vue-router";

export const useRouteName = () => {
  const route = useRoute();
  const currentRoute = ref<RouteRecordName>(route.name || "");

  watch(
    () => route.name,
    () => {
      currentRoute.value = route.name || "";
    },
    { immediate: true }
  );

  return { currentRoute };
};
