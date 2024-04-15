export const debounce = (f: () => any, ms: number = 400) => {
  let timeout: any = null;
  return function (...args: any) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    // @ts-ignore
    timeout = setTimeout(() => f.apply(this, args), ms);
  };
};
