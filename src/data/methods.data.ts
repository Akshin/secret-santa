import type { IApiServiceMethodData } from "@/services/apiService/types";
import { appSettings } from "@/settings";

const API_URL: string = appSettings.apiUrl;

export const methods: IApiServiceMethodData = {
  login() {
    return {
      path: `${API_URL}/users/login`,
      method: "put",
      params: { headers: {} }
    };
  },
  phoneVerify() {
    return {
      path: `${API_URL}/users/phone_validation`,
      method: "post"
    };
  },
  me() {
    return {
      path: `${API_URL}/users/me`,
      method: "get"
    };
  },
  updateUser() {
    return {
      path: `${API_URL}/users/me`,
      method: "patch"
    };
  },
  removeUser() {
    return {
      path: `${API_URL}/users/me`,
      method: "delete"
    };
  },
  events() {
    return {
      path: `${API_URL}/holidays/`,
      method: "get"
    };
  },
  createEvent() {
    return {
      path: `${API_URL}/holidays/`,
      method: "post"
    };
  },
  getEventCards({ eventId }: any) {
    return {
      path: `${API_URL}/holidays/holiday_users/${eventId}`,
      method: "get"
    };
  },
  updateEvent({ eventId }: any) {
    return {
      path: `${API_URL}/holidays/update/${eventId}`,
      method: "patch"
    };
  },
  updateEventCard({ eventId }: any) {
    return {
      path: `${API_URL}/holidays/update_my_holiday_data/${eventId}`,
      method: "patch"
    };
  },
  getEventByToken({ token }: any) {
    return {
      path: `${API_URL}/holidays/${token}`,
      method: "get"
    };
  },
  eventJoin({ token }: any) {
    return {
      path: `${API_URL}/holidays/join/${token}`,
      method: "post"
    };
  },
  randomize({ eventId }: any) {
    return {
      path: `${API_URL}/holidays/randomize/${eventId}`,
      method: "patch"
    };
  },
  updateGameScore({ eventId }: any) {
    return {
      path: `${API_URL}/holidays/add_game_score/${eventId}`,
      method: "patch"
    };
  },
  getGameTarget() {
    return {
      path: `${API_URL}/holidays/game_target`,
      method: "get"
    };
  },
  getMessages() {
    return {
      path: `${API_URL}/messages/`,
      method: "get"
    };
  },
  setMessagesViewed({ messageId }: any) {
    return {
      path: `${API_URL}/messages/${messageId}`,
      method: "patch"
    };
  },
  postEvent({ eventName }: any) {
    return {
      path: `${API_URL}/users/front_event?event_name=${eventName}`,
      method: "post"
    };
  },
  getCaptcha() {
    return {
      path: `${API_URL}/users/captcha`,
      method: "post",
      params: { responseType: "blob" }
    };
  },
  removeUserFromEvent({ userId, eventId }: any) {
    return {
      path: `${API_URL}/holidays/${eventId}_${userId}`,
      method: "delete"
    };
  }
};
