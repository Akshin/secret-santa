import type { IFieldTypesMap } from "@/types";

export const fieldTypes: IFieldTypesMap = {
  FieldText: ["text", "email"],
  FieldNumber: ["number"],
  FieldPhone: ["phone"],
  FieldSwitch: ["switch"],
  FieldProgress: ["progress"],
  FieldQrCode: ["qrcode"],
  FieldCheckbox: ["checkbox"],
  FieldRadio: ["radio"],
  FieldTextarea: ["textarea", "editor"],
  FieldSelect: ["select"],
  FieldAttachments: ["file"],
  FieldDatePicker: [
    "datepicker",
    "datepicker_range",
    "timepicker",
    "timepicker_range",
    "datetimepicker",
    "datetimepicker_range",
    "monthpicker",
    "yearpicker",
    "weekpicker",
    "quarterpicker",
    "multidatepicker"
  ],
  FieldJson: ["json"],
  FieldAddress: ["address"],
  FieldTextCopy: ["text_copy"]
};
