import type { IFieldSettings, IFieldSettingsPropsChangable } from "@/types";

export const PROPS_DEFAULT: IFieldSettings = {
  clearable: false,
  locale: "ru",
  "enable-time-picker": false,
  "auto-apply": true,
  "action-row": { showSelect: false, showCancel: false, showNow: false, showPreview: false },
  "select-text": "Выбрать",
  "cancel-text": "Отменить",
  "now-button-label": "Сейчас",
  "hide-input-icon": true,
  utc: "preserve",
  prependIcon: "calendar",
  inline: false
};

export const PROPS_CHANGEABLE: IFieldSettingsPropsChangable = [
  "range",
  "auto-range",
  "multi-calendars",
  "month-picker",
  "time-picker",
  "year-picker",
  "week-picker",
  "text-input",
  "multi-dates",
  "flow",
  "vertical",
  "model-auto",
  "partial-range",
  "min-range",
  "max-range",
  "fixed-start",
  "fixed-end",
  "multi-calendars-solo",
  "multi-static",
  "multi-dates-limit",
  "no-today",
  "markers",
  "highlight-week-days",
  "show-now-button",
  "action-row",
  "disable-year-select",
  "hide-offset-dates",
  "min-date",
  "max-date",
  "prevent-min-max-navigation",
  "start-date",
  "week-start",
  "disable-month-year-select",
  "year-range",
  "allowed-dates",
  "disabled-dates",
  "disabled-week-days",
  "no-disabled-range",
  "enable-time-picker",
  "enable-seconds",
  "hours-increment",
  "minutes-increment",
  "seconds-increment",
  "hours-grid-increment",
  "minutes-grid-increment",
  "seconds-grid-increment",
  "no-hours-overlay",
  "no-minutes-overlay",
  "no-seconds-overlay",
  "min-time",
  "max-time",
  "start-time",
  "format",
  "month-name-format",
  "model-type",
  "inline",
  "uid",
  "input-class-name",
  "disabled",
  "readonly",
  "placeholder",
  "auto-apply"
];

export const getSettings = (settings?: IFieldSettings) => {
  if (!settings || !Object.keys(settings).length) return PROPS_DEFAULT;

  // setting default props
  const props = Object.assign({}, PROPS_DEFAULT);

  // props validating
  for (const propName in settings) {
    if (!PROPS_CHANGEABLE.includes(propName)) continue;

    props[propName] = settings[propName];
  }

  return props;
};
