import type { ISrollCoords } from "@/types/utils";

const coords: ISrollCoords = {
  x: 0,
  y: 0
};

export const disableScroll = function (wrapperSelector: string) {
  if (!wrapperSelector) return console.log("[disableScroll] element target is required");
  const el = document.querySelector(wrapperSelector) as HTMLElement;
  coords.y = el.scrollTop;
  coords.x = el.scrollLeft;

  el.style.overflow = "hidden";
};

export const enableScroll = function (wrapperSelector: string) {
  if (!wrapperSelector) return console.log("[disableScroll] element target is required");
  const el = document.querySelector(wrapperSelector) as HTMLElement;

  el.style.overflow = "auto";
};
