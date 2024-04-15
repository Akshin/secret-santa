import { ApiService } from "@/services";
import type { IEvent, IEventCard, IFronEvent, IUser, IUserRole } from "@/types/system";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  // messages
  // const messages = ref<IMessage[]>([]);
  // const newMessages = computed(() => messages.value.filter((m) => !m.viewed));
  // progress
  const propgressData = ref<number[]>([]);
  // events
  const events = ref<IEvent[]>([]);
  const eventCardsAll = ref<Partial<IEventCard>[]>([]);
  const currentEventId = ref<number>(); // назначается в компоненте EventCard
  const currentEvent = computed(() => events.value.find((e) => e.id === currentEventId.value));
  const currentEventCards = computed(() =>
    eventCardsAll.value.filter((e) => e.holiday_id === currentEventId.value)
  );
  const myCurrentEventCard = computed(() =>
    currentEventCards.value.find((e) => e.user_id === user.value.id)
  );
  const myTargetEventCards = computed(() => {
    const myCards = eventCardsAll.value.filter(
      (c) => c.user_id === user.value.id && c.target_user_id && !c.is_gift_bought
    );
    const result: IEventCard[] = [];
    myCards.forEach((c) => {
      const catched = eventCardsAll.value.find(
        (e) => e.user_id === c.target_user_id && c.holiday_id === e.holiday_id
      );
      if (!catched) return;
      result.push(catched);
    });
    return result;
  });
  const myTargetEventCard = computed(() =>
    currentEventCards.value.find(
      (card) => card.user_id === myCurrentEventCard.value?.target_user_id
    )
  );
  const eventById = computed(() => (id: number) => events.value.find((e) => e.id === Number(id)));
  const eventCardsById = computed(
    () => (id: number) => eventCardsAll.value.filter((e) => e.holiday_id === Number(id))
  );
  const eventByToken = computed(
    () => (token: string) => events.value.find((e) => e.token === token)
  );
  const totalScore = computed(() => {
    let sum = 0;
    currentEventCards.value.forEach((e) => (sum += Number(e.game_score)));
    return sum;
  });
  // user
  const user = ref<IUser>({});
  const roleIs = computed(() => (role: IUserRole) => myCurrentEventCard.value?.role === role);

  async function init() {
    const f1 = getMe();
    const f2 = getEvents();
    const f3 = getGameTarget();

    return Promise.all([f1, f2, f3]);
  }

  async function getMe(): Promise<IUser> {
    try {
      const { data } = await ApiService.request({ name: "me" });
      user.value = data;
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function updateUser(payload: IUser): Promise<IUser> {
    try {
      const { data } = await ApiService.request({ name: "updateUser", payload });
      user.value = data as IUser;
      await getEvents();
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function getEvents(withCards: boolean = true): Promise<IEvent[]> {
    try {
      const { data } = await ApiService.request({ name: "events" });
      events.value = data;
      if (withCards) await getAllEventCards();
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function createEvent(payload: IEvent): Promise<IEvent> {
    try {
      const { data } = await ApiService.request({ name: "createEvent", payload });
      await getEvents();
      return data;
    } catch (e) {
      throw e;
    }
  }

  function setCurrentEventId(eventId: string): void {
    currentEventId.value = Number(eventId);
  }

  // async function getEventCards(eventId?: string | number): Promise<IEventCard> {
  //   eventCards.value = [];
  //   if (!eventId) throw new Error("400");
  //   try {
  //     const { data } = await ApiService.request({ name: "getEventCards", pathParams: { eventId } });
  //     eventCards.value = data;
  //     return data;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async function getAllEventCards(): Promise<any> {
    const requests: Promise<any>[] = [];
    const result: IEventCard[] = [];

    events.value.forEach((e) =>
      requests.push(ApiService.request({ name: "getEventCards", pathParams: { eventId: e.id } }))
    );

    try {
      const data = await Promise.all(requests);
      data.forEach((d) => d.data.forEach((e: IEventCard) => result.push(e)));
      eventCardsAll.value = result;
      return result;
    } catch (e) {
      throw e;
    }
  }

  async function updateEvent(payload: IEvent): Promise<IEvent> {
    try {
      const { data } = await ApiService.request({
        name: "updateEvent",
        payload,
        pathParams: { eventId: currentEventId.value }
      });
      await getEvents();
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function updateEventCard(payload: IEventCard, eventId?: number): Promise<IEventCard> {
    try {
      const { data } = await ApiService.request({
        name: "updateEventCard",
        payload,
        pathParams: { eventId: eventId || currentEventId.value }
      });
      await getAllEventCards();
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function getEventByToken(token: string): Promise<IEvent> {
    try {
      const { data } = await ApiService.request({ name: "getEventByToken", pathParams: { token } });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function eventJoin(token: string): Promise<IEventCard> {
    try {
      const { data } = await ApiService.request({ name: "eventJoin", pathParams: { token } });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function randomize(eventId: number): Promise<IEventCard> {
    try {
      const { data } = await ApiService.request({ name: "randomize", pathParams: { eventId } });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function updateGameScore(payload: IEventCard): Promise<IEventCard> {
    try {
      const { data } = await ApiService.request({
        name: "updateGameScore",
        payload,
        pathParams: { eventId: currentEventId.value }
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function getGameTarget(): Promise<string> {
    try {
      const { data } = await ApiService.request({ name: "getGameTarget" });
      propgressData.value = data;
      return data;
    } catch (e) {
      throw e;
    }
  }

  // async function getMessages(): Promise<IMessage[]> {
  //   try {
  //     const { data } = await ApiService.request({ name: "getMessages" });
  //     messages.value = data;

  //     return data;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // async function setMessagesViewed(messageId: number): Promise<IMessage> {
  //   try {
  //     const { data } = await ApiService.request({
  //       name: "setMessagesViewed",
  //       pathParams: { messageId }
  //     });
  //     await getMessages();
  //     return data;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async function postEvent(eventName: IFronEvent, payload: any) {
    try {
      const { data } = await ApiService.request({
        name: "postEvent",
        pathParams: { eventName },
        payload
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function getCaptcha(phone: string) {
    try {
      const { data } = await ApiService.request({
        name: "getCaptcha",
        payload: { phone }
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async function removeUserFromEvent(userId: number, eventId: number) {
    try {
      const { data } = await ApiService.request({
        name: "removeUserFromEvent",
        pathParams: { userId, eventId }
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  function clear() {
    propgressData.value = [];
    events.value = [];
    eventCardsAll.value = [];
    currentEventId.value = undefined;
    user.value = {};
  }

  return {
    propgressData,
    user,
    events,
    eventById,
    eventByToken,
    eventCardsAll,
    currentEventId,
    currentEvent,
    currentEventCards,
    myCurrentEventCard,
    myTargetEventCard,
    roleIs,
    totalScore,
    eventCardsById,
    myTargetEventCards,
    postEvent,
    init,
    getEvents,
    getMe,
    createEvent,
    updateUser,
    updateEvent,
    updateEventCard,
    getEventByToken,
    eventJoin,
    randomize,
    getAllEventCards,
    updateGameScore,
    getGameTarget,
    setCurrentEventId,
    getCaptcha,
    removeUserFromEvent,
    clear
  };
});
