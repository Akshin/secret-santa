export const download = (uri: string, filename: string) => {
  if (!uri || !filename) return;
  const element = document.createElement("a") as HTMLAnchorElement;
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(uri));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
