import type { IAlertMessage } from "@/types";

// bus
export type IBus = {
  alert: any;
};

// useModal
export interface IModal {
  open: () => void;
  close: () => void;
  show: boolean;
}

export interface IModalSettings {
  wrapperSelector?: string;
}

// useUI
export interface IUiSettingsUrls {
  apiUrl: string;
  widgetMapUrl: string;
}

export interface IUiSettingsLocalization {
  // languages?: IUiSettingsLocalizationLenguage
  current: string;
}

export interface IUiSettingsNavigationParamsParams {
  [key: string]: string;
}

export interface IUiSettingsNavigationParams {
  name?: string;
  params?: IUiSettingsNavigationParamsParams;
  path?: string;
}

export interface IUiSettingsNavigation {
  toTaskCard: (key: string) => void;
  to: (params: IUiSettingsNavigationParams) => void;
}

export interface IUiSettingsColorsStatuses {
  [key: string]: string;
}

export interface IUiSettingsColors {
  statuses: IUiSettingsColorsStatuses;
}

export interface IUiSettingsDateFormats {
  base: string;
  datepicker: string;
  datepicker_range: string;
  datetimepicker: string;
  datetimepicker_range: string;
  timepicker: string;
  timepicker_range: string;
  monthpicker: string;
  yearpicker: string;
  weekpicker: string;
  quarterpicker: string;
  multidatepicker: string;
}

export interface IUiSettingsDate {
  formats: IUiSettingsDateFormats;
  formatDate: (date: string | Date, format?: string) => string;
}

export type IUiSettingsTheme = "light" | "dark";

export interface localizeParams {
  [key: string]: string;
}

export interface IUiSettings {
  urls: IUiSettingsUrls;
  localization: IUiSettingsLocalization;
  theme: IUiSettingsTheme;
  minimized: boolean;
  navigation: IUiSettingsNavigation;
  colors: IUiSettingsColors;
  date: IUiSettingsDate;
  localize: (text: string, params?: localizeParams) => string;
  toggleLayoutSize: () => void;
  changeTheme: (theme: IUiSettingsTheme) => void;
  alert: (message: IAlertMessage) => void;
}
