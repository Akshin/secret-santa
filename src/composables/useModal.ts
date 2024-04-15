import type { IModalSettings } from "@/types/composables";
import { disableScroll, enableScroll } from "@/utils/scrollLock";
import { ref } from "vue";

export const useModal = function ({ wrapperSelector }: IModalSettings) {
  const show = ref<boolean>(false);

  function open(): void {
    if (wrapperSelector) disableScroll(wrapperSelector);
    show.value = true;
  }

  function close(): void {
    if (wrapperSelector) enableScroll(wrapperSelector);
    show.value = false;
  }

  return {
    open,
    close,
    show
  };
};
