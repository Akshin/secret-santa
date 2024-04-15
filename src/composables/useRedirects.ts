import { useCommonStore } from "@/stores/common.store";
import type { IEventCard } from "@/types/system";
import { useRoute, useRouter } from "vue-router";

export const useRedirects = () => {
  const store = useCommonStore();
  const router = useRouter();
  const route = useRoute();

  const routeQuery = route.query;
  const eventId: string | null = (routeQuery.eventId as string) || null;
  const isMultipleEvents: boolean = store.events.length > 1;
  const isNewUser: boolean = !store.user.user_name;

  function redirectFromLK() {
    if (isNewUser) return router.push({ name: "profile", query: routeQuery });
    if (eventId) return router.push({ name: "EventCardWish", params: { eventId } });
    if (isMultipleEvents) return router.push({ name: "eventList" });
    redirectMain(store.events[0].id as number);
  }

  function redirectMain(eventId?: number) {
    if (!eventId) return redirectFromLK();
    const event = store.eventById(eventId);
    const myEventCard = store.eventCardsAll.find(
      (card) => card.user_id === store.user.id && card.holiday_id === event?.id
    );

    if (event?.is_randomized) {
      const targetCard: IEventCard =
        store.eventCardsAll.find(
          (c) => c.user_id === store.user.id && c.holiday_id === event?.id
        ) || {};
      if (targetCard.target_user_id) {
        return router.push({
          name: "EventCardGift",
          params: { eventId: event?.id, userId: targetCard.target_user_id }
        });
      } else {
        return router.push({ name: "EventCardMain", params: { eventId: event?.id } });
      }
    }
    if (!myEventCard?.gift_info)
      return router.push({ name: "EventCardWish", params: { eventId: event?.id } });

    return router.push({ name: "EventCardMain", params: { eventId: event?.id } });

    // const currentEventCards = store.eventCardsAll.filter((card) => card.holiday_id === event?.id);
    // if (currentEventCards.length <= 1) {
    //   return router.push({ name: "EventCardMain", params: { eventId: event?.id } });
    // } else {
    //   return router.push({ name: "EventCardTree", params: { eventId: event?.id } });
    // }
  }

  function redirectFromCreate(eventId: number) {
    redirectMain(eventId);
  }

  return {
    redirectFromLK,
    redirectMain,
    redirectFromCreate,
    routeQuery,
    isNewUser,
    isMultipleEvents
  };
};
