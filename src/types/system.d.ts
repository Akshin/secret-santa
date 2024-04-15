declare global {
  interface Window {
    smartCaptcha: any;
  }
}

export interface IEventCardProps {
  event: IEvent;
  isOwner: boolean;
}

export type IEventCardEmits = {
  onBtnClick: [event: IEvent];
  onCardClick: [eventId: number];
};

export type IFronEvent = "referal_link_clicked" | "set_link_clicked";

export type ISubscribeEvent =
  | "challenge-visible"
  | "challenge-hidden"
  | "network-error"
  | "success"
  | "token-expired";

export type IGameMessage = "close_game" | "game_finished" | "referal";
export interface IGameData {
  message: IGameMessage;
  score?: number;
}

// components
export interface ICaptchaProps {
  phone: string;
  modelValue: string;
}

export type ICaptchaEmits = {
  "update:modelValue": [modelValue: string];
  accpeted: [];
  disabled: [];
};

export interface IAppGiftItem {
  color?: string;
  title: string;
  link?: string;
  imageSrc?: string;
}

export interface IPromoProps {
  title?: string;
  subtitle?: string;
  img?: string;
}

export interface IDialogProps {
  text?: string;
}

export interface IAppUserProps {
  icon: number;
  username: string;
  showOptions?: boolean;
}

export type IAppUserEmits = {
  optionClicked: [];
};

export interface IAppEventItemProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon: number;
}

export type IUserRole = "user" | "owner";

export interface ILoginPayload {
  phone: string;
  code: string;
  accept_privacy: boolean;
  accept_mm_communication?: boolean;
}

export interface ILogin {
  expires: string;
  token: string;
}

export interface IUser {
  id?: number;
  email?: string;
  promo_code?: string;
  user_icon?: number;
  user_name?: string;
}

export interface IEvent {
  id?: number;
  name?: string;
  icon?: number;
  recruitment_end_date?: string;
  cost_limit?: number;
  token?: string;
  is_cost_limit?: boolean;
  is_randomized?: boolean;
  description?: string;
}

export interface IEventCard {
  holiday_id?: number;
  user_id?: number;
  target_user_id?: number;
  user_name?: string;
  user_icon?: number;
  game_score?: number;
  gift_info?: string;
  role?: IUserRole;
  is_gift_bought?: boolean;
}

export interface IMessage {
  id?: number;
  user_id?: number;
  text?: string;
  created?: string;
  viewed?: boolean;
  link?: string;
}

export interface IAppHeadeProps {
  rightText?: string;
  disableBack?: boolean;
  disabledAction?: boolean;
}

export type IAppHeaderEmits = {
  leftClicked: [];
  rightClicked: [];
};

export interface IAppUserAvatarProps {
  size?: number;
  icon: number;
  selected?: boolean;
}

export interface IAppFooterHelperProps {
  btnText?: string;
}

export type IAppFooterHelperEmits = {
  btnClicked: [];
};
