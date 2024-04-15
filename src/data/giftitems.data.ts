import { appSettings } from "@/settings";

interface IGiftItem {
  image: string;
  color: string;
  link: string;
  title: string;
}

interface IGift {
  title: string;
  items: IGiftItem[];
}

const link = appSettings.referalUrl;

export const giftItems: IGift[] = [
  {
    title: "До 1 000 ₽",
    items: [
      {
        image: "gift-item-6",
        color: "var(--grey)",
        title: "Забавные носки",
        link: "https://megamarket.ru/catalog/?q=%D1%81%D0%BC%D0%B5%D1%88%D0%BD%D1%8B%D0%B5%20%D0%BD%D0%BE%D1%81%D0%BA%D0%B8#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22max%22%3A1000%7D%7D"
      },
      {
        image: "gift-item-3",
        color: "var(--grey)",
        title: "Снежный шар",
        link: "https://megamarket.ru/catalog/novogodnie-snezhnye-shary/#?related_search=%D1%81%D0%BD%D0%B5%D0%B6%D0%BD%D1%8B%D0%B9%20%D1%88%D0%B0%D1%80&filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22max%22%3A1000%7D%7D"
      },
      {
        image: "gift-item-2",
        color: "var(--grey)",
        title: "Приставка 8bit",
        link: "https://megamarket.ru/catalog/?q=%D0%B8%D0%B3%D1%80%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BF%D1%80%D0%B8%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0%20%208-bit#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22max%22%3A1000%7D%7D"
      }
    ]
  },
  {
    title: "До 3 000 ₽",
    items: [
      {
        image: "gift-item-5",
        color: "var(--grey)",
        title: "Проектор-космонавт",
        link: "https://megamarket.ru/catalog/?q=%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BE%D1%80%20%D0%B7%D0%B2%D0%B5%D0%B7%D0%B4%D0%BD%D0%BE%D0%B3%D0%BE%20%D0%BD%D0%B5%D0%B1%D0%B0%20%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D0%BD%D0%B0%D0%B2%D1%82#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22max%22%3A3000%7D%7D"
      },
      {
        image: "gift-item-4",
        color: "var(--grey)",
        title: "Игрушка-грелка",
        link: "https://megamarket.ru/catalog/?q=%D0%B8%D0%B3%D1%80%D1%83%D1%88%D0%BA%D0%B0-%D0%B3%D1%80%D0%B5%D0%BB%D0%BA%D0%B0#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A1000%2C%22max%22%3A3000%7D%7D"
      },
      {
        image: "gift-item-8",
        color: "var(--grey)",
        title: "Гусь-обнимусь",
        link: "https://megamarket.ru/catalog/?q=%D0%B3%D1%83%D1%81%D1%8C%20%D0%BE%D0%B1%D0%BD%D0%B8%D0%BC%D1%83%D1%81%D1%8C&suggestionType=constructor#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A1000%2C%22max%22%3A3000%7D%7D"
      }
    ]
  },
  {
    title: "До 5 000 ₽",
    items: [
      {
        image: "gift-item-1",
        color: "var(--grey)",
        title: "Вафельница",
        link: "https://megamarket.ru/catalog/?q=%D0%B2%D0%B0%D1%84%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D0%B0&suggestionType=history#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A3000%2C%22max%22%3A5000%7D%7D"
      },
      {
        image: "gift-item-9",
        color: "var(--grey)",
        title: "Елочные игрушки",
        link: "https://megamarket.ru/catalog/elochnye-igrushki/#?related_search=%D0%B5%D0%BB%D0%BE%D1%87%D0%BD%D1%8B%D0%B5%20%D0%B8%D0%B3%D1%80%D1%83%D1%88%D0%BA%D0%B8&filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22min%22%3A3000%2C%22max%22%3A5000%7D%7D"
      },
      {
        image: "gift-item-7",
        color: "var(--grey)",
        title: "Умная колонка",
        link: "https://megamarket.ru/catalog/?q=sberboom&suggestionType=constructor#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22max%22%3A5000%7D%7D"
      }
    ]
  }
  // {
  //   title: "Подарки от 5 000 ₽",
  //   items: [
  //     {
  //       image: "",
  //       title: "Умная колонка",
  //       link: "https://megamarket.ru/catalog/?q=sberboom&suggestionType=constructor#?filters=%7B%2288C83F68482F447C9F4E401955196697%22%3A%7B%22max%22%3A5000%7D%7D"
  //     }
  //   ]
  // }
];
