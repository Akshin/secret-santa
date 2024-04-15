// dataService
export interface IDataServiceSettings {
  [key: string]: any;
}

export interface IDataServiceChildFields {
  [key: string]: IDataServiceItem;
}

export interface IDataServiceData {
  [key: string]: IDataServiceItem;
}

export interface IDataServiceItem {
  type: string;
  label?: string;
  placeholder?: string;
  appendIcon?: string;
  grid: number;
  settings?: IDataServiceSettings;
  default?: any;
  readonly: boolean;
  visible: boolean;
  childFields?: IDataServiceChildFields;
}

// rql service
export interface IRqlServiceItem {
  key?: string;
  value?: string;
  comparisonOperator?: string;
  logicalOperator?: string;
}

export interface IRqlServiceConstructorParams {
  query: string;
  regex?: string;
}

export interface IRqlService {
  update: (args: IRqlServiceItem) => void;
  query: string;
}

// data service
export type IFieldStructureFieldObjType =
  | "qrcode"
  | "switch"
  | "progress"
  | "radio"
  | "text_copy"
  | "text"
  | "email"
  | "number"
  | "phone"
  | "checkbox"
  | "textarea"
  | "editor"
  | "select"
  | "file"
  | "json"
  | "address"
  | "datepicker"
  | "datepicker_range"
  | "timepicker"
  | "timepicker_range"
  | "datetimepicker"
  | "datetimepicker_range"
  | "monthpicker"
  | "yearpicker"
  | "weekpicker"
  | "quarterpicker"
  | "multidatepicker"
  | "date"
  | "date_range"
  | "time"
  | "time_range";

export interface IFieldStructureFieldObj {
  type: IFieldStructureFieldObjType;
}

export interface IFieldStructureField {
  [key: string]: IFieldStructureFieldObj;
}

export interface IFieldStructure {
  [key: string]: IFieldStructureField;
}

// user
export interface IUserFio {
  name?: string;
  middlename?: string;
  surname?: string;
}

export interface IUserContact {
  email?: string;
  phone?: number;
}

export interface IUser {
  id?: string;
  logo?: string;
  full_name?: string;
  user_name?: string;
  fio?: IUserFio;
  contacts?: IUserContact;
}
