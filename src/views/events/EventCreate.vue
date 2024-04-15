<script setup lang="ts">
import AppEventAvatar from "@/components/app/AppEventAvatar/AppEventAvatar.vue";
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import Button from "@/components/ui/Button/Button.vue";
import FieldDatePicker from "@/components/ui/fields/fields/FieldDatePicker/FieldDatePicker.vue";
import FieldNumber from "@/components/ui/fields/fields/FieldNumber/FieldNumber.vue";
import FieldText from "@/components/ui/fields/fields/FieldText/FieldText.vue";
import FieldTextarea from "@/components/ui/fields/fields/FieldTextarea/FieldTextarea.vue";
import { useRedirects } from "@/composables/useRedirects";
import { useDI } from "@/composables/useUI";
import { useEventIcons } from "@/composables/useUserIcons";
import { MetrikaSerice } from "@/services";
import { useCommonStore } from "@/stores/common.store";
import type { IEvent } from "@/types/system";
import { computed, reactive } from "vue";
import { Carousel, Slide } from "vue3-carousel";

const storeCommon = useCommonStore();
const DI = useDI();
const { redirectFromCreate } = useRedirects();
const { EVENT_KEYS_NUMBER } = useEventIcons();

const formIsValid = computed<boolean>(() => {
  return Boolean(formData.eventname && formData.randomizeDate && formData.wish);
});

const datePickerSettings = {
  "min-date": new Date(),
  "max-date": "2024-01-20T23:35:00.000Z"
};

const formData = reactive({
  eventname: "",
  eventicon: 0,
  costLimit: 2000,
  randomizeDate: "2023-12-31T23:35:00.000Z",
  wish: "",
  description: ""
});

async function save() {
  if (!formIsValid.value) return;

  const payload: IEvent = {
    icon: formData.eventicon,
    name: formData.eventname,
    cost_limit: formData.costLimit,
    is_cost_limit: formData.costLimit > 0,
    description: formData.description,
    recruitment_end_date: formData.randomizeDate
  };

  try {
    const data = await storeCommon.createEvent(payload);
    await storeCommon.updateEventCard({ gift_info: formData.wish }, data.id);
    MetrikaSerice.sendGoal("party_created");
    redirectFromCreate(data.id as number);
  } catch {
    DI?.alert({
      type: "danger",
      text: "Не удалось создать праздник"
    });
  }
}
</script>

<template>
  <div class="event-create-wrapper container">
    <AppHeader
      right-text="Создать праздник"
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
        placeholder="Новый год"
        v-model.trim="formData.eventname"
        class="mb"
      />
      <FieldDatePicker
        label="Можно принять участие до"
        v-model="formData.randomizeDate"
        class="mb"
        :settings="datePickerSettings"
      />
      <FieldNumber
        v-model.trim="formData.costLimit"
        label="Стоимость подарка"
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
        placeholder="Все подарки кладём под ёлку. Не забудьте подписать подарок"
        v-model.trim="formData.description"
        class="mb"
      />

      <Button @click="save" class="save-btn center" :disabled="!formIsValid">
        Создать праздник
      </Button>
    </div>
    <Footer />
  </div>
</template>
