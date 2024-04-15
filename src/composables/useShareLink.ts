export const useShareLink = () => {
  function share(title: string = "", text: string = "") {
    if (!canShare()) return console.log("Your system doesn't support sharing files");
    navigator
      .share({ title, text })
      .then(() => console.log("Share was successful."))
      .catch((error) => console.log("Sharing failed", error));
  }

  function canShare(): boolean {
    return Boolean(window.navigator && navigator.canShare);
  }

  return { share, canShare };
};
