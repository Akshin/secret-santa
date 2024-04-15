import { useDI } from "@/composables/useUI";

const showControls = {
  "action-row": { showSelect: true, showCancel: true, showNow: false, showPreview: false },
  "auto-apply": false
};

export const useDatePicker = function (type: string) {
  const DI = useDI();
  const formats: any = DI?.date?.formats || {};
  const format = formats[type];

  const props: any = {
    datepicker: {},
    datepicker_range: { range: true, ...showControls },
    timepicker: { "time-picker": true },
    timepicker_range: { "time-picker": true, range: true },
    datetimepicker: { "enable-time-picker": true, "time-picker-inline": true },
    datetimepicker_range: { "enable-time-picker": true, "time-picker-inline": true, range: true },
    monthpicker: { "month-picker": true },
    yearpicker: { "year-picker": true },
    weekpicker: { "week-picker": true },
    quarterpicker: { "quarter-picker": true },
    multidatepicker: {
      "multi-dates": true,
      ...showControls
    }
  };

  const result = props[type];
  if (result && format) result["format"] = format;

  return result;
};
