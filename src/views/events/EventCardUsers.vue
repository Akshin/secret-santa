<script setup lang="ts">
import Footer from "@/components/layouts/Footer/Footer.vue";
import Button from "@/components/ui/Button/Button.vue";
import Icon from "@/components/ui/Icon/Icon.vue";
import ModalPrompt from "@/components/ui/ModalPrompt/ModalPrompt.vue";
import { useDI } from "@/composables/useUI";
import { useUserIcons } from "@/composables/useUserIcons";
import { useCommonStore } from "@/stores/common.store";
import type { IModalPromptClicked } from "@/types";
import type { IEventCard } from "@/types/system";
import { windowOpen } from "@/utils/windowOpen";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const storeCommon = useCommonStore();
const { getImageSrc } = useUserIcons();
const DI = useDI();

const roleIsOwner = computed(() => storeCommon.myCurrentEventCard?.role === "owner");
const userIdToRemove = ref<number | undefined>();
const $modal = ref<InstanceType<typeof ModalPrompt> | null>(null);

const currentEventCardsSorted = computed<IEventCard[]>(() =>
  storeCommon.currentEventCards.sort((a, b) => {
    const aScore = a.game_score as number;
    const bScore = b.game_score as number;
    if (aScore === bScore) return 0;
    return aScore > bScore ? -1 : 1;
  })
);

function randomize() {
  storeCommon
    .randomize(storeCommon.currentEventId as number)
    .then(() => {
      storeCommon.getEvents();
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

function openReferral() {
  const url = "https://megamarket.ru/landing/drug-drugu/";
  sendEvent();
  windowOpen(url, true);
}

function sendEvent() {
  storeCommon.postEvent("referal_link_clicked", {
    from: "holiday",
    holiday_id: storeCommon.currentEventId
  });
}

function removeUser(userId: number): void {
  storeCommon
    .removeUserFromEvent(userId, storeCommon.currentEventId as number)
    .then(() => {
      DI?.alert({
        type: "success",
        text: "Пользователь удален успешно"
      });
      storeCommon.getEvents();
    })
    .catch(
      () =>
        DI?.alert({
          type: "success",
          text: "Пользователь не удален"
        })
    );
}

function promptToRemoveUser(userId: number) {
  userIdToRemove.value = userId;
  $modal.value?.open();
}

function modalClicked(e: IModalPromptClicked) {
  if (e === "cancel") return (userIdToRemove.value = undefined);
  removeUser(userIdToRemove.value as number);
}
</script>

<template>
  <div class="event-card-users-wrapper container">
    <div class="p" v-if="!storeCommon.currentEvent?.is_randomized">
      <div class="event-card-users-invite-card card">
        <div class="event-icon-wrapper" @click="router.push({ name: 'EventCardMain' })">
          <Icon name="add_contact" />
        </div>
        <Button @click="router.push({ name: 'EventCardMain' })"> Пригласить на праздник </Button>
      </div>
    </div>

    <div class="event-card-users-gift-wrapper p">
      <div class="event-card-users-gift-titles">
        <span>Игроки</span>
        <span>Собранные игрушки</span>
      </div>
      <div
        v-for="(card, i) in currentEventCardsSorted"
        class="event-card-users-gift-card card p"
        :key="i"
      >
        <div class="event-card-name-block">
          <div class="event-card-image">
            <img :src="getImageSrc(card.user_icon as number)" class="avatar-image" />
            <img
              v-if="roleIsOwner && card.role !== 'owner'"
              src="@/assets/delete.png"
              class="delete-image"
              @click="promptToRemoveUser(card.user_id as number)"
            />
          </div>
          <p>{{ card.user_name }} <span v-if="card.role === 'owner'">(Админ)</span></p>
        </div>
        <div class="event-card-gift-block">
          <p>{{ card.game_score }}</p>
          <img src="@/assets/toy2.png" />
        </div>
      </div>
    </div>

    <div class="p">
      <Button
        v-if="!storeCommon.currentEvent?.is_randomized && roleIsOwner"
        @click="randomize"
        class="randomize-btn"
        >Начать жеребьёвку
      </Button>
    </div>

    <div class="p">
      <div class="referral" @click="openReferral">
        <p class="referral-title">
          Выгода за покупки <br />
          вам и другу
        </p>
        <img src="@/assets/textpromo.png" class="img-text" />
        <img src="@/assets/handleft.png" class="img-left-hand" />
        <img src="@/assets/handright.png" class="img-right-hand" />
        <Button>Подробнее</Button>
      </div>
    </div>
    <ModalPrompt @clicked="modalClicked" ref="$modal" apply-text="Удалить" cancel-text="Отменить">
      <p>Удалить участника?</p>
    </ModalPrompt>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.event-card-users-wrapper {
  .event-card-users-invite-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 90px;
    margin-bottom: 18px;
    margin-top: 18px;
    .event-icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: #f1f1f1;
      cursor: pointer;
      .icon-wrapper {
        width: 28px;
        height: 28px;
        color: var(--primary-1);
        stroke: transparent;
      }
    }
  }

  .event-card-users-gift-wrapper {
    border-radius: 18px;
    background: var(--white);
    padding-top: 18px;
    padding-bottom: 18px;
    margin-bottom: 20px;
    .event-card-users-gift-titles {
      display: flex;
      justify-content: space-between;
      color: var(--primary-1);
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 10px;
      padding: 0 8px;
    }
    .event-card-users-gift-card {
      padding: 0 20px;
      height: 90px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      .event-card-name-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .event-card-image {
          position: relative;
          .avatar-image {
            width: 66px;
            margin-right: 5px;
          }
          .delete-image {
            position: absolute;
            bottom: 6px;
            left: 0;
          }
        }
        p {
          color: var(--primary-1);
          font-size: 17px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          margin-left: 5px;
          span {
            text-transform: capitalize;
          }
        }
      }
      .event-card-gift-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          color: var(--primary-1);
          font-size: 17px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
        img {
          margin: -13px 0 0 -12px;
          width: 70px;
        }
      }
    }
  }
}

.referral {
  background: #ffe3c7;
  height: 135px;
  width: 100%;
  // max-width: 400px;
  margin: 0 auto;
  position: relative;
  border-radius: 18px;
  .referral-title {
    color: var(--primary-1);
    font-size: 10.52px;
    font-style: normal;
    font-weight: 400;
    line-height: 10.116px; /* 96.154% */
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 70px;
    text-align: center;
  }
  img {
    position: absolute;
  }
  .img-text {
    position: absolute;
    width: 184px;
    height: 50px;
    left: 0;
    right: 0;
    top: 15px;
    margin: 0 auto;
  }
  .img-left-hand {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .img-right-hand {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .button-wrapper {
    position: absolute;
    bottom: 10px;
    width: 110px;
    height: 20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: 10px !important;
  }
}

.randomize-btn {
  width: 100%;
  margin-bottom: 20px;
}
</style>
