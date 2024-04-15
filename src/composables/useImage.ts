import { filename } from "pathe/utils";

const glob = import.meta.glob("@/assets/**/*.png", { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]: any) => [filename(key), value.default])
);

export const useImage = () => {
  function getImage(name: string) {
    return images[name];
  }

  return { getImage };
};
