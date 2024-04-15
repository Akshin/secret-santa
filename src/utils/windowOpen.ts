export const windowOpen = (url: string, newTab: boolean = false) => {
  if (!url) return;
  // @ts-ignore
  window.open(url, newTab ? "_blank" : "_self").focus();
};
