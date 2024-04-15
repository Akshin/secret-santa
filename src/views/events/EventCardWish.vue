<script setup lang="ts">
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import Button from "@/components/ui/Button/Button.vue";
import FieldTextarea from "@/components/ui/fields/fields/FieldTextarea/FieldTextarea.vue";
import { useCommonStore } from "@/stores/common.store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const storeCommon = useCommonStore();

const wish = ref<string>(storeCommon.myCurrentEventCard?.gift_info || "");

if (storeCommon.currentEvent?.is_randomized) {
  router.push({ name: "EventCardMain", params: { eventId: storeCommon.currentEventId } });
}

function save() {
  storeCommon.updateEventCard({ gift_info: wish.value }).then(() => {
    router.push({ name: "EventCardMain", params: { eventId: storeCommon.currentEventId } });
  });
}
</script>

<template>
  <div class="event-card-wish-wrapper container">
    <AppHeader
      class="mb"
      right-text="Продолжить"
      @right-clicked="save"
      :disabled-action="!wish.length"
    />
    <div class="p">
      <h3 class="text-2">Какой подарок вы хотите?</h3>
      <p v-if="storeCommon.currentEvent?.is_cost_limit" class="cost-limit-text text-6">
        Организатор установил ограничение на стоимость подарка –
        {{ storeCommon.currentEvent?.cost_limit }} ₽
      </p>
      <FieldTextarea placeholder="Хочу умную колонку SberBoom" v-model.trim="wish" class="mb" />
      <Button class="center mb" :disabled="!wish.length" @click="save">Продолжить</Button>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.cost-limit-text {
  color: var(--text-lighter);
  margin-top: 8px;
}
.field-textarea-wrapper {
  margin-top: 24px;
}
</style>
