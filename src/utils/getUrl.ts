export const getUrl = function (url: string, property?: string) {
  const _url: any = new URL(url);
  if (property && property in _url) {
    return _url[property];
  }
  return _url;
};
