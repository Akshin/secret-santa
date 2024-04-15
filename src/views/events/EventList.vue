<script setup lang="ts">
import AppEventCard from "@/components/app/AppEventCard/AppEventCard.vue";
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import Icon from "@/components/ui/Icon/Icon.vue";
import Modal from "@/components/ui/Modal/Modal.vue";
import QrCode from "@/components/ui/QrCode/QrCode.vue";
import { useShareLink } from "@/composables/useShareLink";
import { useDI } from "@/composables/useUI";
import { useUserIcons } from "@/composables/useUserIcons";
import { appSettings } from "@/settings";
import { useCommonStore } from "@/stores/common.store";
import type { IEvent, IEventCard } from "@/types/system";
import { copy } from "@/utils/copy";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Carousel, Slide } from "vue3-carousel";

const router = useRouter();
const store = useCommonStore();
const { getImageSrc } = useUserIcons();
const { share, canShare } = useShareLink();
const DI = useDI();
const TEXT =
  "Хо-хо-хо! Совсем скоро Новый год, а это значит, что пора принять участие в волшебном обмене подарков. Ты с нами?";
const $modal = ref<InstanceType<typeof Modal> | null>(null);
const linkToCopy = ref<string>("");
const modalEvent = ref<IEvent>({});

const sliderModel = ref<number>(store.events[0].id as number);

function addUserToEvent(event: IEvent) {
  modalEvent.value = event;
  linkToCopy.value = `${appSettings.origin}/login?${appSettings.tokenPrefix}=${event.token}`;
  $modal.value?.open();
}

function toEventCardPage(eventId: number) {
  router.push({ name: "EventCardMain", params: { eventId } });
}

function isEventOwner(eventId: number) {
  const eventCard: IEventCard =
    store.eventCardsAll.find((c) => c.user_id === store.user.id && c.holiday_id === eventId) || {};
  return eventCard && eventCard.role === "owner";
}

function _copy() {
  copy(linkToCopy.value);
  $modal.value?.close();
  DI?.alert({
    type: "success",
    text: "Ссылка скопирована"
  });
}
</script>

<template>
  <div class="event-list-wrapper container">
    <AppHeader
      disableBack
      right-text="Новый праздник"
      @rightClicked="router.push({ name: 'eventCreate' })"
    >
      <template #left>
        <img
          :src="getImageSrc(store.user.user_icon || 0)"
          @click="router.push({ name: 'profile' })"
          class="profile-avatar"
        />
      </template>
    </AppHeader>

    <div class="p gift-block" v-if="store.myTargetEventCards.length">
      <h3 class="gift-title text-3">Кому вы дарите</h3>
      <div
        class="gift-container"
        v-for="card in store.myTargetEventCards"
        @click="
          router.push({
            name: 'EventCardGift',
            params: { eventId: card.holiday_id, userId: card.user_id }
          })
        "
      >
        <img :src="getImageSrc(card.user_icon as number)" />
        <!-- <img :src="getTargetUserIcon(card)" /> -->
        <div class="gift-container-content">
          <p class="gift-title text-4">{{ card.user_name }}</p>
          <p class="gift-subtitle text-6">Ждет своего подарка!</p>
        </div>
        <Icon name="bell" />
      </div>
    </div>

    <h3 class="my-events-title text-3 p">Мои праздники</h3>
    <Carousel :itemsToShow="1.2" :transition="500" v-model="sliderModel">
      <Slide v-for="event in store.events" :key="event.id">
        <AppEventCard
          :event="event"
          :is-owner="isEventOwner(event.id as number)"
          @on-btn-click="addUserToEvent"
          @on-card-click="toEventCardPage"
        />
      </Slide>
    </Carousel>
    <div class="p">
      <h3 class="tree-title text-3">Для новогоднего настроения</h3>
      <div
        class="tree-banner"
        @click="router.push({ name: 'game', params: { eventId: sliderModel } })"
      >
        <p class="text-4 title">Игра</p>
        <p class="text-6 subtitle">
          Собирайте шары <br />
          и наряжайте ёлку
        </p>
        <img src="@/assets/tree-banner.png" />
      </div>
    </div>

    <Modal ref="$modal" class="container">
      <div class="modal-container">
        <h3 class="text-3 mb">Добавить участников</h3>
        <QrCode :text="linkToCopy" />
        <div class="modal-controlls">
          <div
            class="btn-container"
            v-if="canShare()"
            @click="share(modalEvent.description || TEXT, linkToCopy)"
          >
            <div><Icon name="share" /></div>
            <span class="text-7">Поделиться ссылкой</span>
          </div>
          <div class="btn-container" @click="_copy">
            <div><Icon name="link" /></div>
            <span class="text-7">Скопировать ссылку</span>
          </div>
        </div>
      </div>
    </Modal>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.event-list-wrapper {
  .profile-avatar {
    width: 34px;
    cursor: pointer;
  }
  .gift-title {
    margin-bottom: 16px;
  }
  .gift-block {
    margin-bottom: 42px;
  }
  .gift-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    border-radius: 24px;
    background: var(--grey);
    margin-bottom: 8px;
    img {
      width: 48px;
      max-width: 48px;
      margin-right: 12px;
    }
    .gift-container-content {
      flex-grow: 1;
      .gift-title {
        margin-bottom: 2px;
      }
      .gift-subtitle {
        color: var(--text-lighter);
      }
    }

    .icon-wrapper {
      width: 32px;
      height: 32px;
    }
  }
  .my-events-title {
    margin-bottom: 16px;
  }
  .app-header-wrapper {
    background: var(--grey);
    margin-bottom: 42px;
  }
  .carousel {
    margin-bottom: 45px;
  }
  .tree-title {
    margin-bottom: 16px;
  }
  .tree-banner {
    height: 106px;
    border-radius: 24px;
    background: var(--grey);
    padding: 18px;
    position: relative;
    .title {
      margin-bottom: 4px;
    }
    .subtitle {
      line-height: 20px;
      color: var(--text-lighter);
      max-width: 50%;
    }
    img {
      position: absolute;
      height: 100%;
      right: 0;
      bottom: 0;
    }
  }
}

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .qrcode-wrapper {
    margin-bottom: 40px;
  }
  .modal-controlls {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 40px;
    .btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:nth-of-type(2) > div {
        background: #fff2f2;
        .icon-wrapper {
          color: var(--red);
          stroke: var(--red);
        }
      }
      & > div {
        margin-bottom: 8px;
        width: 64px;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--grey);
        border-radius: 100%;
        .icon-wrapper {
          width: 32px;
          height: 32px;
          color: var(--text);
          stroke: var(--text);
        }
      }
    }
  }
}
</style>
