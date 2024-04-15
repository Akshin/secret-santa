import { format as _format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

const DEFAULT_FORMAT = "dd MMMM yyyy - EEEEEE";

function getOptions() {
  return {
    locale: ru
  };
}

const format = (date: any, f = DEFAULT_FORMAT) => {
  if (!date) return "";
  const _date = typeof date === "string" ? parseISO(date) : date;
  return _format(_date, f, getOptions());
};

// const formatIfDate = (date, f = DEFAULT_FORMAT) => {
//   if (!date) return "";
//   if (typeof date !== "string") return date;
//   if (date.length < 10) return date; // fix it

//   const parsed = parseISO(date);
//   return isValid(parsed) ? format(date, f) : date;
// };

// function getWeekDay(date) {
//   return i18n.t("WeekDay")[date.getDay()];
// }

// const fGetDay = (date) => getDay(date);

export { format };
// export { fGetDay, format, formatIfDate, getWeekDay };
