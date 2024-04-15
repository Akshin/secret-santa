import type {
  IDataServiceChildFields,
  IDataServiceData,
  IFieldStructureFieldObjType,
  IRqlServiceItem,
  IUser
} from "./services";

import type { ModelValue as IDatepickerModelValue } from "@vuepic/vue-datepicker";

// ShareButton
export interface ITimelineProps {
  title?: string;
  shareTitle?: string;
  shareText?: string;
}

// Timeline
export interface ITimelineProps {
  items?: string[] | number[];
  modelValue?: string | number;
  readonly?: boolean;
}

export type ITimelineEmits = {
  "update:modelValue": [modelValue: string | number];
};

// QrCode
export interface IQrCodeProps {
  text: string;
  color?: string;
}

// Progress
export interface IProgressProps {
  modelValue?: number;
  title?: string;
}

// Alert
export type IAlertMessageType = "danger" | "warning" | "info" | "success";

export interface IAlertMessage {
  readonly type: IAlertMessageType;
  readonly text?: string;
  icon?: string;
}

// Status
export interface IStatusProps {
  status?: string;
}

// Button
export interface IButtonProps {
  prependIcon?: string;
  appendIcon?: string;
  disabled?: boolean;
  loading?: boolean;
}

export type IButtonEmits = {
  click: [e?: Event];
};

// Checkbox
export interface ICheckboxProps {
  modelValue?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
  label?: string;
}

export type ICheckboxEmits = {
  "update:modelValue": [modelValue: boolean];
};

// Radio
export interface IRadioProps {
  modelValue: string | number;
  items: string[] | number[];
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
}

export type IRadioEmits = {
  "update:modelValue": [modelValue: string | number];
};

// Icon
export interface IIconProps {
  name: string;
  width?: string;
  height?: string;
  color?: string;
}

// Avatar
export interface IAvatarProps {
  src?: string;
  alt?: string;
  text?: string;
}

// DatePicker
export interface IDatePickerProps {
  modelValue: IDatepickerModelValue;
}

export type IDatePickerEmits = {
  "update:modelValue": [e: any];
};

// Select
export interface ISelectProps {
  modelValue: any;
}

export type ISelectEmits = {
  "update:modelValue": [e: any];
};

// Dropdown
export interface IDropdownOption {
  icon?: string;
  text?: string;
}

export interface IDropdownProps {
  options?: IDropdownOption[];
}

export type IDropdownEmits = {
  optionClick: [option: IDropdownOption];
};

// ExpansionPanel
export interface IExpansionPanelProps {
  modelValue?: number[];
  multiple?: boolean;
}

export type IExpansionPanelEmits = {
  "update:modelValue": [modelValue: number[]];
};

export interface IExpansionPanelItemProps {
  disabled?: boolean;
  index: number;
}

// Grids
export interface IGridItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: number;
  maxW?: number;
  maxH?: number;
  minW?: number;
  minH?: number;
}

export interface IGridsProps {
  layout?: IGridItem[];
  isLayoutDraggable?: boolean;
}

export interface IGridsSettings {
  colNum?: number;
  rowHeight?: number;
  "use-css-transforms"?: boolean;
  margin?: number[];
}

// Modal
export type IModalTransitionTypes = "";

export interface IModalProps {
  transition?: IModalTransitionTypes;
  wrapperSelector?: string;
}

// Modal Prompt
export interface IModalPromptProps {
  cancelText?: string;
  applyText?: string;
  wrapperSelector?: string;
}

export type IModalPromptClicked = "cancel" | "apply";

export type IModalPromptEmits = {
  clicked: [e: IModalPromptClicked];
};

// Switch
export interface ISwitchProps {
  modelValue?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
}

export type ISwitchEmits = {
  "update:modelValue": [modelValue: boolean];
};

// Tabs
export interface ITabsProps {
  modelValue?: number;
}

export type ITabsEmits = {
  "update:modelValue": [modelValue: number];
};

export interface ITabProps {
  disabled?: boolean;
  index: number;
}

export interface ITabContentProps {
  index: number;
}

// Table
export interface ITableClasses {
  [key: string]: string;
}

export interface ITableRow {
  [key: string]: any;
}

export interface ITableProps {
  rows?: ITableRow[];
  headers?: string[];
  loading?: boolean;
  noDataText?: string;
  perPage?: number;
  showHeader?: boolean;
  classes?: ITableClasses;
}

export type ITableEmits = {
  rowClick: [row: ITableRow];
};

// Table Pagination
export interface ITablePaginationProps {
  items?: ITableRow[];
  perPage?: number;
  maxPagesToDisplay?: number;
}

export type ITablePaginationEmits = {
  pageClick: [page: number];
  updateItems: [items: ITableRow[]];
};

export type ITablePaginationPage = number | "...";

// fields
export interface IFieldTypesMap {
  [key: string]: IFieldStructureFieldObjType[];
}

export type IFieldCreatorEmits = {
  "update:modelValue": [modelValue: any];
  attachmentDelete: [attachment: any];
  attachmentAppend: [attachment: any];
  blur: [e: any];
};

export interface IFieldErrorMessagesProps {
  errors?: string[];
}

export interface IFieldSettingsObject {
  [key: string]: any;
}

export interface IFieldPropsErrors {
  [key: string]: string[];
}

export interface IFieldProps {
  readonly?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  errors?: string[];
  name?: string;
  type?: IFieldStructureFieldObjType;
  placeholder?: string;
  modelValue?: any;
  prependIcon?: string;
  appendIcon?: string;
  label?: string;
  settings?: IFieldSettingsObject;
}

export type IFieldEmits = {
  "update:modelValue": [modelValue: any];
  blur: [id: void];
  clear: [id: void];
  onEsc: [id: void];
  iconClick: [id: void];
};

export interface IFieldWrapperProps extends IFieldProps {}
export type IFieldWrapperEmits = IFieldEmits;

export interface IFieldSelectProps extends IFieldProps {
  noOptionsText?: string;
  noResultText?: string;
}
export type IFieldSelectEmits = IFieldEmits;

export interface IFieldSettings {
  [key: string]: any;
}

export type IFieldSettingsPropsChangable = string[];
export interface IFieldSettingsMap {
  [key: string]: "label" | "trackBy";
}

export interface IFieldItem {
  [key: string]: any;
}

export interface IFieldJsonProps extends IFieldProps {
  errors?: IFieldPropsErrors;
  childFields?: IDataServiceChildFields;
}
export type IFieldJsonEmits = IFieldEmits;

export interface IFieldAttachmentProps extends IFieldProps {
  loaderText?: string;
  showMoreText?: string;
  showLessText?: string;
}

export interface IFieldCodeProps extends IFieldProps {
  bars?: number;
}

export type IFieldCodeEmits = {
  "update:modelValue": [modelValue: string];
  complete: [value: string];
};

export interface IFieldCopyProps extends IFieldProps {}
export interface IFieldProgressProps extends IFieldProps {}
export interface IFieldQrCodeProps extends IFieldProps {}

export type IFieldAttachmentEmits = IFieldCreatorEmits;

export interface IFieldAttachmentViwerProps {
  url?: string;
  name?: string;
  user?: IUser;
  loading?: boolean;
  disabled?: boolean;
}

export type IFieldAttachmentViwerEmits = {
  download: [];
  remove: [];
  filebarClick: [];
  titleClick: [];
};

export interface IFieldAttachmentFile {
  url: string;
  name: string;
  user: IUser;
}

// form
export interface IFormData {
  [key: string]: any;
}

export type IFormType = "tabs" | "board" | "simple";

export interface IFormSettings {
  type: IFormType;
  fields?: string[];
  tabs?: string[];
  fields?: string[];
}

export interface IFormValidation {
  [key: string]: any;
}

export interface IFormTabsFields {
  fields?: string[];
  is_active?: boolean;
  title?: string;
}

export interface IFormBoardWidgets {
  title?: string;
  fields?: string[];
  plugin_config_id?: string;
}

export interface IFormPropsMixin {
  title?: string;
  btnSubmitText?: string;
  data: IFormData;
  fieldSettings: IDataServiceData;
  type?: IFormType;
  validation?: IFormValidation;
  agreementLink?: string;
  agreementText?: string;
  readonly?: boolean;
}

export interface IFormSimplePropsMixin {
  fields?: string[];
}

export interface IFormTabsPropsMixin {
  tabs?: IFormTabsFields[];
}

export interface IFormBoardPropsMixin {
  layout?: IGridItem[];
  widgets?: IFormBoardWidgets[];
  isLayoutDraggable?: boolean;
  getPluginSrc?: (id: string) => string | void;
}

export interface IFormProps
  extends IFormPropsMixin,
    IFormSimplePropsMixin,
    IFormTabsPropsMixin,
    IFormBoardPropsMixin {}

export interface IFormSimpleProps extends IFormPropsMixin, IFormSimplePropsMixin {}

export interface IFormTabsProps extends IFormPropsMixin, IFormTabsPropsMixin {}

export interface IFormBoardProps extends IFormPropsMixin, IFormBoardPropsMixin {}

export type IFormEmits = {
  change: [e: any];
  blur: [e: any];
  save: [formData: IFormData];
  attachmentDelete: [e: IFieldAttachmentFile];
  attachmentAppend: [e: IFieldAttachmentFile | IFieldAttachmentFile[]];
};

export interface IFormAgreementObject {
  before: string;
  link: string;
  after: string;
}

export interface IFormValidationErrors {
  [key: string | IFormValidationErrors]: string[] | any;
}

export interface IFormAgreementProps {
  agreement?: IFormAgreementObject;
  agreementLink?: string;
}

// layouts
export interface ISidenavRouteParams {
  [key: string]: string;
}

export interface ISidenavRoute {
  name?: string;
  path?: string;
  params?: ISidenavRouteParams;
}

export interface ISidenavItem {
  title?: string;
  heading?: string;
  icon?: string;
  isActive?: boolean;
  to?: ISidenavRoute;
  items?: ISidenavItem[];
}

export interface ISidenavItems {
  main?: ISidenavItem[];
  footer?: ISidenavItem[];
}

export interface ISidenavProps {
  logoMain?: string;
  logoSmall?: string;
  items?: ISidenavItems;
}

export interface ISidenavMenuProps {
  items?: ISidenavItem[];
}

export interface ISidenavMenuItemProps {
  item?: ISidenavItem;
  level: number;
}

export interface ISidenavProfileProps {
  title?: string;
  subtitle?: string;
  avatarSrc?: string;
}

// widgets
export interface IWidgetTitleProps {
  title?: string;
}

export interface IWidgetSettingsFilters {
  [key: string]: any;
}

export interface IWidgetWrapperProps {
  color?: string;
}

export interface IWidgetSettingsMixinText {
  [key: string]: string;
}

export interface IWidgetSettingsMixinViewSidebar {
  title?: string;
  subtitle?: string;
  show_status?: boolean;
  fields?: string[];
}

export interface IWidgetSettingsMixinView {
  sidebar?: IWidgetSettingsMixinViewSidebar;
}

export interface IWidgetSettingsMixin {
  title?: string;
  text?: IWidgetSettingsMixinText;
}

export interface IWidgetPropsMixin {
  data: IFormData[];
  fieldSettings?: IDataServiceData;
}

// widgets schedule
export interface IWidgetScheduleTaskCoordsParams {
  task: IFormData;
  axisYField: IWidgetScheduleSettingsAxisY["field"];
  i: number;
}

export interface IWidgetScheduleTaskCoords {
  w: number;
  h: number;
  l: number;
  t: number;
}

export interface IWidgetScheduleCardFields {
  header: string;
  title: string;
  fields: string[];
  color: string;
}

export interface IWidgetScheduleXDataItem {
  key: string;
  title: string;
  subtitle: string;
  data: IFormData[];
  cards: IWidgetScheduleCardFields[];
  coords: Array<IWidgetScheduleTaskCoords | null>;
}

export interface IWidgetScheduleLegendProps {
  imgSrc?: string;
  title?: string;
  subtitle?: string;
}

export interface IWidgetScheduleCardProps {
  header?: string;
  title?: string;
  fields?: string[];
}

export interface IWidgetScheduleSettingsViewCard {
  fields?: string[];
  color?: string;
}

export interface IWidgetScheduleSettingsView extends IWidgetSettingsMixinView {
  card?: IWidgetScheduleSettingsViewCard;
}

export type IWidgetScheduleSettingsAxisXType = "simple" | "week";

export interface IWidgetScheduleSettingsAxisXLegendHeaders {
  fields?: string[];
  delimiter?: string;
  subtitle?: string;
}

export interface IWidgetScheduleSettingsAxisXLegend {
  headers?: IWidgetScheduleSettingsAxisXLegendHeaders;
}

export interface IWidgetScheduleSettingsAxisX {
  type?: IWidgetScheduleSettingsAxisXType;
  fields?: string[];
  legend?: IWidgetScheduleSettingsAxisXLegend;
}

export type IWidgetScheduleSettingsAxisYType = "timeline" | "board" | "swimline";

export interface IWidgetScheduleSettingsAxisY {
  type: IWidgetScheduleSettingsAxisYType;
  field: string;
}

export type IWidgetScheduleSettingsAxisNavigationType = "datepicker" | "select";

export interface IWidgetScheduleSettingsAxisNavigation {
  type: IWidgetScheduleSettingsAxisNavigationType;
  field: string;
}

export interface IWidgetScheduleSettingsAxis {
  axisX: IWidgetScheduleSettingsAxisX;
  axisY: IWidgetScheduleSettingsAxisY;
  navigation: IWidgetScheduleSettingsAxisNavigation;
}

export type IWidgetScheduleSettingsType = "schedule";

export interface IWidgetScheduleSettings extends IWidgetSettingsMixin {
  axis?: IWidgetScheduleSettingsAxis;
  view?: IWidgetScheduleSettingsView;
  type?: IWidgetScheduleSettingsType;
}

// widgets calendar
export interface IWidgetCalendarSettingsNavigation {
  field?: string;
}

export interface IWidgetCalendarSettingsViewCardTitle {
  fields?: string[];
  delimiter?: string;
}

export interface IWidgetCalendarSettingsView {
  card_title: IWidgetCalendarSettingsViewCardTitle;
}

export interface IWidgetCalendarSettings extends IWidgetSettingsMixin {
  navigation?: IWidgetCalendarSettingsNavigation;
  view?: IWidgetCalendarSettingsView;
}

// widgets chart
export type IWidgetChartSettingsType = "bar" | "pie";

export interface IWidgetChartSettings extends IWidgetSettingsMixin {
  chart_type?: IWidgetChartSettingsType;
}

// widgets map
export interface IWidgetMapSettingsView extends IWidgetSettingsMixinView {
  center: number[];
  zoom: number;
}

export interface IWidgetMapSettingsNavigation {
  field?: string;
}

export interface IWidgetMapSettings extends IWidgetSettingsMixin {
  view?: IWidgetMapSettingsView;
  filters?: IWidgetSettingsFilters;
  navigation?: IWidgetMapSettingsNavigation;
}

// widgets table
export interface ITableCellProps {
  row: IFormData;
  header: string;
}

export interface IWidgetTableSettingsView extends IWidgetSettingsMixinView {
  headers?: string[];
}

export interface IWidgetTableSettingsPagination {
  start_at?: number;
  max_count?: number;
  per_page?: number;
}

export interface IWidgetTableSettings extends IWidgetSettingsMixin {
  view?: IWidgetTableSettingsView;
  sortable_fields?: string[];
  pagination?: IWidgetTableSettingsPagination;
}

// widgets all
export interface IWidgetScheduleProps extends IWidgetPropsMixin {
  settings?: IWidgetScheduleSettings;
}
export interface IWidgetCalendarProps extends IWidgetPropsMixin {
  settings?: IWidgetCalendarSettings;
}
export interface IWidgetChartProps extends IWidgetPropsMixin {
  settings?: IWidgetChartSettings;
}
export interface IWidgetMapProps extends IWidgetPropsMixin {
  settings?: IWidgetMapSettings;
}
export interface IWidgetTableProps extends IWidgetPropsMixin {
  settings?: IWidgetTableSettings;
}
export interface IWidgetPluginProps {
  src?: string;
}

export type IWidgetEmits = {
  update: [e: IRqlServiceItem[]];
};

export interface IWidgetScheduleDailyProps extends IWidgetScheduleProps {}

export type IWidgetScheduleDailyEmits = {
  cardClick: [data: IFormData];
};

// widget card modal
export interface IWidgetCardModalProps {
  title?: string;
  subtitle?: string;
  status?: string;
  fields?: string[];
  fieldSettings?: IDataServiceData;
  data?: IFormData;
  wrapperSelector?: string;
  btnText?: string;
}

// system
export interface IAppSettingsRouteNames {
  login: string;
  logout: string;
}

export interface IAppSettings {
  apiUrl: string;
  gameUrl: string;
  origin: string;
  tokenPrefix: string;
  captchaToken: string;
  referalUrl: string;
  captchaTokenNew: string;
}

export interface IUser {}
