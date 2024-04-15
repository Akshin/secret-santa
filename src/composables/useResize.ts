import { debounce } from "@/utils/debounce";
import { onBeforeUnmount, onMounted } from "vue";

export const useResize = ({ querySelector, cb }: { querySelector: string; cb: () => any }) => {
  if (!querySelector) return console.log("[useResize] requires querySelector");
  if (!cb) return console.log("[useResize] requires callback method");

  let element: HTMLElement | null;
  let resizeObserver: any;
  const _debounce = debounce(cb, 1500);

  onMounted(() => {
    element = document.querySelector(querySelector);
    if (!element) return console.log("[useResize] requires querySelector");

    resizeObserver = new ResizeObserver(() => _debounce());

    resizeObserver.observe(element);
  });

  onBeforeUnmount(() => {
    resizeObserver.unobserve(element);
  });
};
