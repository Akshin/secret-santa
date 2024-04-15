import { useImage } from "@/composables/useImage";
import type { IEventCard } from "@/types/system";
import { randomizeNumber } from "@/utils/random";

interface IUniqueDataProps {
  [key: string]: number;
}

interface ICountData {
  icons: IUniqueDataProps;
  names: IUniqueDataProps;
}

const ICONS_ENUM: any = {
  "0": {
    images: ["avatar-0"],
    titles: ["Задумчивый Бараш", "Мудрый Бараш"]
  },
  "1": {
    images: ["avatar-1"],
    titles: ["Мудрый Тигр", "Серьёзый Тигр"]
  },
  "2": {
    images: ["avatar-2"],
    titles: ["Праздничная Сова", "Мудрая Сова"]
  },
  "3": {
    images: ["avatar-3"],
    titles: ["Довольный Мишка", "Добрый Мишка"]
  },
  "4": {
    images: ["avatar-4"],
    titles: ["Учёный Лось", "Довольный Лось"]
  },
  "5": {
    images: ["avatar-5"],
    titles: ["Хитрая Лиса", "Королева Лис"]
  },
  "6": {
    images: ["avatar-6"],
    titles: ["Элегантная Кошка", "Праздничная Кошка"]
  },
  "7": {
    images: ["avatar-7"],
    titles: ["Меланхоличный заяц", "Тёплый заяц"]
  },
  "8": {
    images: ["avatar-8"],
    titles: ["Праздничный волк", "Новогодний волк"]
  }
};

const ICON_KEYS: string[] = Object.keys(ICONS_ENUM);
const ICON_KEYS_NUMBER: number[] = ICON_KEYS.map((i) => Number(i));

function getRandomIcon(): string {
  return String(randomizeNumber(ICON_KEYS.length - 1));
}

function getRandomText(titles: string[]): string {
  return titles[randomizeNumber(titles.length)];
}

function getCount(eventCards: IEventCard[]): ICountData {
  const icons: any = {};
  const names: any = {};
  eventCards.forEach((card) => {
    const icon: string = String(card.user_icon) || "0";
    const name: string = card.user_name || "";
    icons[icon] = icons[icon] ? icons[icon] + 1 : 1;
    names[name] = names[name] ? names[name] + 1 : 1;
  });

  for (const iconIndex in ICONS_ENUM) {
    if (!icons[iconIndex]) icons[iconIndex] = 0;
    const titles = ICONS_ENUM[iconIndex].titles;
    titles.forEach((title: string) => {
      if (!names[title]) names[title] = 0;
    });
  }

  return { icons, names };
}

function getUniqueIndexies(data: IUniqueDataProps, keys: string[] = []): string[] {
  let lessIconCount: number | null = null;
  let lessIconIndex: string = "";
  let _data: IUniqueDataProps = {};

  if (keys.length) {
    for (const i in data) {
      if (keys.includes(i)) _data[i] = data[i];
    }
  } else {
    _data = Object.assign({}, data);
  }

  for (const i in _data) {
    const iconCount: number = _data[i];

    if (lessIconCount === null) {
      lessIconCount = iconCount;
      lessIconIndex = i;
      continue;
    }

    if (iconCount >= lessIconCount) {
      continue;
    }

    lessIconCount = iconCount;
    lessIconIndex = i;
  }

  const result: string[] = [];

  for (const i in _data) {
    if (_data[i] === lessIconCount) result.push(i);
  }

  return result;
}

export const useUserIcons = () => {
  const { getImage } = useImage();

  function getUniqueUserIconAndName(eventCards: IEventCard[]): {
    username: string;
    usericon: number;
  } {
    if (!eventCards || !eventCards.length) {
      const icon = Number(getRandomIcon());
      const name = getRandomText(ICONS_ENUM[icon].titles);
      return { username: name, usericon: icon };
    }

    const { icons, names } = getCount(eventCards);

    const cathedIconIndexes: string[] = getUniqueIndexies(icons);
    const catchedIconIndex: string = cathedIconIndexes[randomizeNumber(cathedIconIndexes.length)];
    const catchedIcon = ICONS_ENUM[catchedIconIndex];

    const allowedTitles = catchedIcon.titles;
    const cathedTitles: string[] = getUniqueIndexies(names, allowedTitles);
    const catchedTitle: string = cathedTitles[randomizeNumber(cathedTitles.length)];

    return { username: catchedTitle, usericon: Number(catchedIconIndex) };
  }

  const getImageSrc = (icon: number | string): string => {
    const images = ICONS_ENUM[String(icon)]?.images;
    if (!images) return "";

    return getImage(images[0]);
  };

  return {
    ICONS_ENUM,
    ICON_KEYS,
    ICON_KEYS_NUMBER,
    getUniqueUserIconAndName,
    getImageSrc,
    getImage
  };
};

const EVENT_ICONS: any = {
  "0": { image: "event-0", bg: "#FFE3C7" },
  "1": { image: "event-1", bg: "#D7E1FD" },
  "2": { image: "event-2", bg: "#D4F3BB" },
  "3": { image: "event-3", bg: "#FFE9FE" },
  "4": { image: "event-4", bg: "#FFE9FE" },
  "5": { image: "event-5", bg: "#FFE9FE" },
  "6": { image: "event-6", bg: "#FFE9FE" },
  "7": { image: "event-7", bg: "#FFE9FE" },
  "8": { image: "event-8", bg: "#FFE9FE" },
  "9": { image: "event-9", bg: "#FFE9FE" }
};

const EVENT_KEYS: string[] = Object.keys(EVENT_ICONS);
const EVENT_KEYS_NUMBER: number[] = EVENT_KEYS.map((i) => Number(i));

export const useEventIcons = () => {
  const { getImage } = useImage();

  function getIconData(icon: number): { src: string; bg: string } {
    const _icon = EVENT_ICONS[String(icon)];
    if (!_icon) return { src: "", bg: "" };

    return {
      src: getImage(_icon.image),
      bg: _icon.bg
    };
  }

  return { getIconData, EVENT_KEYS, EVENT_KEYS_NUMBER };
};
