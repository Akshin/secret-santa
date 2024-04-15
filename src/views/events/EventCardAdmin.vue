<script setup lang="ts">
import AppEventAvatar from "@/components/app/AppEventAvatar/AppEventAvatar.vue";
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import FieldDatePicker from "@/components/ui/fields/fields/FieldDatePicker/FieldDatePicker.vue";
import FieldNumber from "@/components/ui/fields/fields/FieldNumber/FieldNumber.vue";
import FieldText from "@/components/ui/fields/fields/FieldText/FieldText.vue";
import FieldTextarea from "@/components/ui/fields/fields/FieldTextarea/FieldTextarea.vue";
// import { useRedirects } from "@/composables/useRedirects";
import { useDI } from "@/composables/useUI";
import { useEventIcons } from "@/composables/useUserIcons";
import { MetrikaSerice } from "@/services";
import { useCommonStore } from "@/stores/common.store";
import type { IEvent } from "@/types/system";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { Carousel, Slide } from "vue3-carousel";

const storeCommon = useCommonStore();
const DI = useDI();
// const { redirectFromCreate } = useRedirects();
const router = useRouter();
const { EVENT_KEYS_NUMBER } = useEventIcons();
const eventname = "Мега новый год";

const formIsValid = computed<boolean>(() => {
  return Boolean(formData.eventname && formData.randomizeDate && formData.wish);
});

if (storeCommon.roleIs("user")) {
  router.push({ name: "eventList" });
}

const currentEvent: IEvent = storeCommon.currentEvent || {};

const formData = reactive({
  eventname: currentEvent?.name,
  eventicon: currentEvent?.icon,
  costLimit: currentEvent?.cost_limit || 0,
  randomizeDate: currentEvent?.recruitment_end_date,
  description: currentEvent.description,
  wish: storeCommon.myCurrentEventCard?.gift_info || ""
});

async function save() {
  if (!formIsValid.value) return;

  const payload: IEvent = {
    icon: formData.eventicon,
    name: formData.eventname || eventname,
    cost_limit: formData.costLimit,
    is_cost_limit: formData.costLimit > 0,
    description: formData.description,
    recruitment_end_date: formData.randomizeDate
  };

  try {
    await storeCommon.updateEvent(payload);
    await storeCommon.updateEventCard({ gift_info: formData.wish });
    MetrikaSerice.sendGoal("party_created");
    router.push({ name: "EventCardMain", params: { eventId: currentEvent.id } });
    DI?.alert({
      type: "success",
      text: "Данные обновлены успешно"
    });
  } catch {
    DI?.alert({
      type: "danger",
      text: "Ошибка при обновлении данных"
    });
  }
}
</script>

<template>
  <div class="event-create-wrapper container">
    <AppHeader
      right-text="Сохранить"
      @rightClicked="save"
      class="mb"
      :disabled-action="!formIsValid"
    />
    <Carousel
      :itemsToShow="1.5"
      :wrapAround="true"
      :transition="500"
      v-model="formData.eventicon"
      class="mb"
    >
      <Slide v-for="icon in EVENT_KEYS_NUMBER" :key="icon">
        <AppEventAvatar
          :icon="icon"
          :selected="formData.eventicon === icon"
          @click="formData.eventicon = icon"
        />
      </Slide>
    </Carousel>
    <div class="p">
      <FieldText
        label="Название праздника"
        :placeholder="eventname"
        v-model.trim="formData.eventname"
        class="mb"
      />
      <FieldDatePicker
        label="Можно принять участие до"
        v-model="formData.randomizeDate"
        class="mb"
      />
      <FieldNumber
        v-model.trim="formData.costLimit"
        label="Уместная сумма подарка"
        placeholder="2 000 ₽"
        class="mb"
      />
      <FieldTextarea
        label="Мои пожелания"
        placeholder="Хочу умную колонку SberBoom"
        v-model.trim="formData.wish"
        class="mb"
      />
      <FieldTextarea
        label="Сообщение участникам"
        placeholder="В понедельник с утра приносим и кладем все подарки под елку. Не забудьте подписать, чей это подарок"
        v-model.trim="formData.description"
        class="mb"
      />
    </div>
    <Footer />
  </div>
</template>
