import { bus } from "@/bus";
import type { IAlertMessage } from "@/types";
import type { IUiSettings } from "@/types/composables";
import { inject, provide, reactive } from "vue";

const DI_KEY: string = "DI";
const DATE_FORMAT: string = "dd.MM.yyyy";
const TIME_FORMAT: string = "HH:mm";
const DATETIME_FORMAT: string = `${DATE_FORMAT} ${TIME_FORMAT}`;
const DATE_RANGE_FORMAT: string = `${DATE_FORMAT} - ${DATE_FORMAT}`;
const TIME_RANGE_FORMAT: string = `${TIME_FORMAT} - ${TIME_FORMAT}`;
const DATETIME_RANGE_FORMAT: string = `${DATETIME_FORMAT} - ${DATETIME_FORMAT}`;
const MONTH_FORMAT: string = "MM.yyyy";
const YEAR_FORMAT: string = "yyyy";
const WEEK_FORMAT: string = `${DATE_FORMAT} - ${DATE_FORMAT}`;
const QUARTER_FORMAT: string = "Q.yyyy";

const DEFAULT_SETTINGS: IUiSettings = {
  urls: {
    apiUrl: "",
    widgetMapUrl: `https://api-maps.yandex.ru/2.1/?apikey=4d736b4b-7943-485c-af31-e6c98fd2a896&lang=ru_RU`
  },
  localization: { current: "en" },
  theme: "dark",
  minimized: false,
  navigation: {
    toTaskCard: () => {},
    to: () => {}
  },
  colors: { statuses: {} },
  localize: (text) => text,
  date: {
    formatDate: (date) => date as any,
    formats: {
      base: DATE_FORMAT,
      datepicker: DATE_FORMAT,
      datepicker_range: DATE_RANGE_FORMAT,
      datetimepicker: DATETIME_FORMAT,
      datetimepicker_range: DATETIME_RANGE_FORMAT,
      timepicker: TIME_FORMAT,
      timepicker_range: TIME_RANGE_FORMAT,
      monthpicker: MONTH_FORMAT,
      yearpicker: YEAR_FORMAT,
      weekpicker: WEEK_FORMAT,
      quarterpicker: QUARTER_FORMAT,
      multidatepicker: DATE_FORMAT
    }
  },
  toggleLayoutSize: () => {},
  changeTheme: () => {},
  alert: () => {}
};

let registered: boolean = false;
export const registerUI = function (settings: Partial<IUiSettings>) {
  if (registered) return console.log("UI is already registered");

  const options = reactive(DEFAULT_SETTINGS);
  Object.assign(options, settings);

  options.toggleLayoutSize = (): void => {
    options.minimized = !options.minimized;
  };

  options.changeTheme = (theme = "dark"): void => {
    options.theme = theme;
  };

  options.alert = (message: IAlertMessage) => bus.emit("alert", message);

  provide<IUiSettings>(DI_KEY, options);

  registered = true;
};

export const useDI = function () {
  return inject<IUiSettings>(DI_KEY);
};
