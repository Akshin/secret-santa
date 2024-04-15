<script setup lang="ts">
import AppDialog from "@/components/app/AppDialog/AppDialog.vue";
import AppFooterHelper from "@/components/app/AppFooterHelper/AppFooterHelper.vue";
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import AppUser from "@/components/app/AppUser/AppUser.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import Icon from "@/components/ui/Icon/Icon.vue";
import Modal from "@/components/ui/Modal/Modal.vue";
import QrCode from "@/components/ui/QrCode/QrCode.vue";
import { useShareLink } from "@/composables/useShareLink";
import { useDI } from "@/composables/useUI";
import { useEventIcons, useUserIcons } from "@/composables/useUserIcons";
import { appSettings } from "@/settings";
import { useCommonStore } from "@/stores/common.store";
import type { IEventCard } from "@/types/system";
import { copy } from "@/utils/copy";
import { format } from "@/utils/date";
import { sklonenie } from "@/utils/formatters";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useCommonStore();
const { getIconData } = useEventIcons();
const { getImageSrc } = useUserIcons();
const { share, canShare } = useShareLink();
const DI = useDI();
const TEXT =
  "Хо-хо-хо! Совсем скоро Новый год, а это значит, что пора принять участие в волшебном обмене подарков. Ты с нами?";

const isOwner: boolean = store.myCurrentEventCard?.role === "owner";

const rightBtnText = computed<string>(() => {
  if (store.currentEvent?.is_randomized) return "";
  return isOwner ? "Редактировать" : "Изменить пожелания";
});
const canRandomize = computed<boolean>(
  () => !store.currentEvent?.is_randomized && store.currentEventCards.length >= 3
);
const footerText = computed<string>(() => {
  if (store.currentEvent?.is_randomized) return "";
  return canRandomize.value ? "Начать жеребьевку" : "Добавить участников";
});
const ownerCard = computed<IEventCard>(
  () => store.currentEventCards.find((c) => c.role === "owner") || {}
);
const usersTitle = `${store.currentEventCards.length - 1} ${sklonenie(
  store.currentEventCards.length - 1,
  ["участник", "участника", "участников"]
)}`;
const $modal = ref<InstanceType<typeof Modal> | null>(null);
const $modalPrompt = ref<InstanceType<typeof Modal> | null>(null);
const linkToCopy: string = `${appSettings.origin}/login?${appSettings.tokenPrefix}=${store.currentEvent?.token}`;
const userToRemove = ref<IEventCard>({});
const users = computed<IEventCard[]>(() => {
  return store.currentEventCards
    .sort((a, b) => {
      if (a.user_id === store.user.id) return -1;
      return 1;
    })
    .filter((c) => c.role !== "owner");
});

function rightClicked() {
  if (!rightBtnText.value) return;
  isOwner
    ? router.push({ name: "EventCardAdmin", params: { eventId: store.currentEventId } })
    : router.push({ name: "EventCardWish", params: { eventId: store.currentEventId } });
}

function randomize() {
  store
    .randomize(store.currentEventId as number)
    .then(() => {
      store.getEvents();
      DI?.alert({
        type: "success",
        text: "Жеребьевка прошла успешно"
      });
    })
    .catch((error) => {
      const only3 = error.response?.data?.detail === "needed at least 3 users in holiday";
      const message = only3 ? "Необходимо 3 участника для жеребьевки" : "Что-то пошло не так :(";
      DI?.alert({
        type: "danger",
        text: message
      });
    });
}

function modalBtnClick() {
  if (canRandomize.value) return randomize();

  $modal.value?.open();
}

function _copy() {
  copy(linkToCopy);
  $modal.value?.close();
  DI?.alert({
    type: "success",
    text: "Ссылка скопирована"
  });
}

function onOption(card: IEventCard) {
  userToRemove.value = card;
  $modalPrompt.value?.open();
}

function removeUser() {
  store
    .removeUserFromEvent(userToRemove.value.user_id as number, store.currentEventId as number)
    .then(() => {
      DI?.alert({
        type: "success",
        text: "Пользователь удален успешно"
      });
      store.getEvents();
    })
    .catch(
      () =>
        DI?.alert({
          type: "success",
          text: "Пользователь не удален"
        })
    )
    .finally(() => $modalPrompt.value?.close());
}
</script>

<template>
  <div class="event-card-main-wrapper container">
    <AppHeader
      disableBack
      :right-text="rightBtnText"
      @rightClicked="rightClicked"
      @left-clicked="$router.push({ name: 'eventList' })"
    >
    </AppHeader>
    <img :src="getIconData(store.currentEvent?.icon as number).src" class="main-icon mb" />
    <div class="p">
      <h3 class="main-title text-2 mb">{{ store.currentEvent?.name }}</h3>
      <div
        v-if="store.currentEvent?.is_randomized"
        class="gift-container mb"
        @click="
          router.push({
            name: 'EventCardGift',
            params: { eventId: store.currentEventId, userId: store.myTargetEventCard?.user_id }
          })
        "
      >
        <img :src="getImageSrc(store.myTargetEventCard?.user_icon as number)" />
        <div class="gift-container-content">
          <p class="gift-title text-4">{{ store.myTargetEventCard?.user_name }}</p>
          <p class="gift-subtitle text-6">
            {{
              store.myCurrentEventCard?.is_gift_bought
                ? "Подарок уже куплен!"
                : "Ждет своего подарка!"
            }}
          </p>
        </div>
        <Icon name="bell" v-if="!store.myCurrentEventCard?.is_gift_bought" />
        <Icon name="check2" v-else class="check-2" />
      </div>
      <div class="content-block mb">
        <p class="title text-4">
          {{
            !store.currentEvent?.is_randomized
              ? "Можно участвовать до"
              : "Можно было участвовать до"
          }}
        </p>
        <p class="subtitle text-6">{{ format(store.currentEvent?.recruitment_end_date) }}</p>
      </div>
      <div class="content-block mb" v-if="store.currentEvent?.is_cost_limit">
        <p class="title text-4">Стоимость подарка</p>
        <p class="subtitle text-6">{{ store.currentEvent?.cost_limit }}</p>
      </div>
      <div class="content-block mb" v-if="store.currentEvent?.description">
        <p class="title text-4">Сообщение участникам</p>
        <p class="subtitle text-6">{{ store.currentEvent?.description }}</p>
      </div>
      <div class="content-block mb">
        <p class="title text-4">Организатор</p>
        <AppUser :icon="ownerCard.user_icon as number" :username="ownerCard.user_name || ''" />
        <AppDialog :text="ownerCard.gift_info" v-if="ownerCard.user_id === store.user.id" />
      </div>
      <div class="content-block mb">
        <p class="title text-4">{{ usersTitle }}</p>
        <div class="add-users" v-if="canRandomize && isOwner" @click="$modal?.open()">
          <div><Icon name="plus" /></div>
          <p class="text-6">Добавить участников</p>
        </div>
        <template v-for="(card, i) in users" :key="i">
          <AppUser
            :showOptions="isOwner && !store.currentEvent?.is_randomized"
            @optionClicked="onOption(card)"
            :icon="card.user_icon || 0"
            :username="card.user_name || ''"
          />
          <AppDialog v-if="card.user_id === store.user.id" :text="card.gift_info" />
        </template>
      </div>
    </div>

    <Footer />
    <AppFooterHelper :btn-text="isOwner ? footerText : ''" @btn-clicked="modalBtnClick" />

    <Modal ref="$modal" class="container">
      <div class="modal-container">
        <h3 class="text-3 mb">Добавить участников</h3>
        <QrCode :text="linkToCopy" />
        <div class="modal-controlls">
          <div
            class="btn-container"
            v-if="canShare()"
            @click="share(store.currentEvent?.description || TEXT, linkToCopy)"
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

    <Modal ref="$modalPrompt" class="container">
      <div class="modal-container">
        <h3 class="text-3 mb">Удалить участника «{{ userToRemove.user_name }}» ?</h3>
        <div class="modal-controlls">
          <div class="btn-container" @click="$modalPrompt?.close()">
            <div><Icon name="close" /></div>
            <span class="text-7">Отмена</span>
          </div>
          <div class="btn-container" @click="removeUser">
            <div><Icon name="remove" /></div>
            <span class="text-7">Удалить</span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.event-card-main-wrapper {
  .main-icon {
    width: 100%;
  }
  .content-block {
    .dialog-wrapper {
      margin-bottom: 16px;
    }
    .title {
      color: var(--text-lighter);
      margin-bottom: 8px;
    }
    .subtitle {
    }
    .add-users {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 8px;
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--grey);
        margin-right: 16px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        color: var(--primary-1);
        stroke: var(--primary-1);
      }
      p {
        color: var(--primary-1);
      }
      .icon-wrapper {
        color: var(--primary-1);
        stroke: var(--primary-1);
      }
    }
    .app-user-wrapper {
      margin-bottom: 21px;
    }
  }
  .gift-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    border-radius: 24px;
    background: var(--grey);
    margin-bottom: 42px;
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
    .check-2 {
      color: var(--green);
      fill: var(--green);
      width: 24px;
      height: 24px;
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
        span {
        }
      }
    }
  }
  .footer-wrapper {
    margin-bottom: $FOOTER_MARGIN_BTN !important;
  }
}
</style>
