import type { IFieldSettings, IFieldSettingsPropsChangable, IFieldSettingsMap } from "@/types";

const PLUGIN_MAP: IFieldSettingsMap = {
  optionText: "label",
  optionValue: "trackBy"
};

export const PROPS_DEFAULT: IFieldSettings = {
  options: [],
  optionText: "title",
  optionValue: "value",
  searchable: false,
  selectLabel: "",
  selectedLabel: "",
  deselectLabel: ""
  // showLabels: "",
  // limit: "",
  // limitText: "",
};

export const PROPS_CHANGEABLE: IFieldSettingsPropsChangable = [
  "options",
  "optionText",
  "optionValue",
  "searchable",
  "multiple",
  "clearOnSelect",
  "hideSelected",
  "allowEmpty",
  "resetAfter",
  "closeOnSelect",
  "taggable",
  "tagPlaceholder",
  "tagPosition",
  "max",
  "optionsLimit",
  "blockKeys",
  "preserveSearch",
  "preselectFirst",
  "preventAutofocus"
];

function convertToPluginFormat(props: IFieldSettings) {
  const result: IFieldSettings = {};

  for (const prop in props) {
    if (prop in PLUGIN_MAP) {
      result[PLUGIN_MAP[prop]] = props[prop];
    } else {
      result[prop] = props[prop];
    }
  }

  return result;
}

export const getSettings = (settings?: IFieldSettings) => {
  if (!settings || !Object.keys(settings).length) return convertToPluginFormat(PROPS_DEFAULT);

  // setting default props
  const props = Object.assign({}, PROPS_DEFAULT);

  // props validating
  for (const propName in settings) {
    if (!PROPS_CHANGEABLE.includes(propName)) continue;

    props[propName] = settings[propName];
  }

  return convertToPluginFormat(props);
};
