<script setup lang="ts">
import AppGiftItem from "@/components/app/AppGiftItem/AppGiftItem.vue";
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import Promo from "@/components/app/Promo/Promo.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import Button from "@/components/ui/Button/Button.vue";
import Modal from "@/components/ui/Modal/Modal.vue";
import { useDI } from "@/composables/useUI";
import { useUserIcons } from "@/composables/useUserIcons";
import { giftItems } from "@/data/giftitems.data";
import { useCommonStore } from "@/stores/common.store";
import type { IEventCard } from "@/types/system";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useCommonStore();
const route = useRoute();
const router = useRouter();
const { getImageSrc } = useUserIcons();
const $modal = ref<InstanceType<typeof Modal> | null>(null);
const DI = useDI();

const userCard = computed<IEventCard>(() => {
  return store.currentEventCards.find((e) => e.user_id === Number(route.params.userId)) || {};
});

const giftIsBought = computed<boolean>(() => store.myCurrentEventCard?.is_gift_bought as boolean);
const rightBtnText = computed<string>(() => (giftIsBought.value ? "" : "Я уже подарил"));

function sendEvent() {
  store.postEvent("set_link_clicked", {
    holiday_id: store.currentEventId
  });
}

function openModal() {
  if (giftIsBought.value) return;
  $modal.value?.open();
}

function giftBought() {
  store
    .updateEventCard({ is_gift_bought: true })
    .then(() => {
      DI?.alert({ type: "success", text: "Данные успешно обновлены" });
      store.getEvents();
    })
    .catch(() => DI?.alert({ type: "danger", text: "Данные не обновлены" }))
    .finally(() => $modal.value?.close());
}

onBeforeMount(() => {
  const targetUserId: number | undefined = store.myTargetEventCard?.user_id;
  if (!route.params.userId) {
    router.push({ name: "EventCardGift", params: { userId: targetUserId } });
    return;
  }

  const isTargetUser: boolean = targetUserId === userCard.value.user_id;
  if (!isTargetUser) {
    router.push({ name: "eventList" });
  }
});
</script>

<template>
  <div class="event-card-gift-wrapper container">
    <AppHeader
      @leftClicked="
        router.push({ name: 'EventCardMain', params: { eventId: store.currentEventId } })
      "
      disable-back
      :right-text="rightBtnText"
      @rightClicked="openModal"
    />
    <div class="p">
      <div class="main-image">
        <img :src="getImageSrc(userCard.user_icon as number)" />
        <h3 class="text-2 mb">{{ userCard.user_name }}</h3>
      </div>
      <div class="content-block">
        <p class="title text-4">Пожелание</p>
        <p class="subtitle text-6">{{ userCard.gift_info }}</p>
      </div>
      <Promo :title="store.user.promo_code" />
      <h3 class="ideas-title text-2">Идеи для подарка</h3>

      <div class="event-card-gifts-block" v-for="(item, i) in giftItems" :key="i">
        <h3 class="text-4">{{ item.title }}</h3>
        <div class="event-card-gifts-container">
          <AppGiftItem
            v-for="(gift, i) in item.items"
            :key="i"
            :color="gift.color"
            :link="gift.link"
            :image-src="gift.image"
            :title="gift.title"
            class="event-card-gift-item"
            @click="sendEvent"
          />
        </div>
      </div>
    </div>

    <Modal ref="$modal" class="container">
      <div class="modal-container">
        <h3 class="text-3">
          Класс! Вы поделились <br />
          новогодним <br />
          настроением
        </h3>
        <p class="modal-subtitle text-5">
          Как самый настоящий <br />
          Дед Мороз
        </p>
        <img src="@/assets/sani.png" class="modal-image" />
        <Button class="center" @click="giftBought">Я молодец</Button>
      </div>
    </Modal>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.event-card-gift-wrapper {
  .main-image {
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      width: 104px;
      margin-bottom: 16px;
    }
  }
  .content-block {
    margin-bottom: 42px;
    .title {
      color: var(--text-lighter);
      margin-bottom: 4px;
    }
    .subtitle {
    }
  }
  .promo-wrapper {
    margin-bottom: 42px;
  }
  .ideas-title {
    margin-bottom: 16px;
  }
  .event-card-gifts-block {
    h3 {
      margin-bottom: 16px;
      color: var(--text-lighter);
    }
    .event-card-gifts-container {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
      margin-bottom: 64px;
      .event-card-gift-item {
        max-width: 100px;
      }
    }
  }
  .modal-container {
    display: flex;
    flex-direction: column;
    h3 {
      margin-bottom: 16px;
    }
    .modal-subtitle {
      color: var(--text-lighter);
      line-height: 24px;
      max-width: 55%;
      margin-bottom: 16px;
    }
    .modal-image {
      width: 100%;
      margin-bottom: 16px;
    }
    .button-wrapper {
      margin-bottom: 16px;
    }
  }
}
</style>
