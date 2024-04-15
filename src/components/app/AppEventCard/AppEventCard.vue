<script setup lang="ts">
import Button from "@/components/ui/Button/Button.vue";
import { useEventIcons, useUserIcons } from "@/composables/useUserIcons";
import { useCommonStore } from "@/stores/common.store";
import type { IEventCard, IEventCardEmits, IEventCardProps } from "@/types/system";
import { format } from "@/utils/date";
import { sklonenie } from "@/utils/formatters";
import { computed } from "vue";

const props = defineProps<IEventCardProps>();
const emits = defineEmits<IEventCardEmits>();
const store = useCommonStore();

const { getIconData } = useEventIcons();
const { getImageSrc } = useUserIcons();

const subtitle = computed<string>(() => {
  if (props.event.is_randomized) return "Пары подобраны ✓";
  return "Участие до " + format(props.event.recruitment_end_date);
});

const eventCards = computed<IEventCard[]>(
  () => store.eventCardsById(props.event.id as number) || []
);
const eventCardsSliced = computed<IEventCard[]>(() => eventCards.value.slice(0, 3));
</script>

<template>
  <div class="event-card-wrapper">
    <img
      :src="getIconData(event.icon as number).src"
      class="event-card-image"
      @click="emits('onCardClick', event.id as number)"
    />
    <div class="event-card-text">
      <p class="event-card-title text-4 nowrap">{{ event.name }}</p>
      <p class="event-card-subtitle text-6 nowrap">{{ subtitle }}</p>
      <Button
        v-if="isOwner && eventCards.length < 3"
        class="center"
        @click="emits('onBtnClick', event)"
        >Добавить участников</Button
      >
      <div v-else class="event-card-footer">
        <hr />
        <div class="event-card-footer-inner">
          <span
            >{{ eventCards.length }}
            {{ sklonenie(eventCards.length, ["участник", "участника", "участников"]) }}
          </span>
          <div>
            <img
              v-for="card in eventCardsSliced"
              :key="card.user_id"
              :src="getImageSrc(card.user_icon || 0)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.event-card-wrapper {
  border-radius: 24px;
  overflow: hidden;
  background: var(--grey);
  .event-card-image {
    width: 100%;
    height: 182px;
  }
  .event-card-text {
    padding: 18px;
    .event-card-title {
      margin-bottom: 4px;
      text-align: left;
    }
    .event-card-subtitle {
      margin-bottom: 18px;
      text-align: left;
      color: var(--text-lighter);
    }
    .button-wrapper {
      min-width: auto;
      width: 100%;
    }
  }
  .event-card-footer {
    hr {
      height: 1px;
      border: 1px solid #e8e8e8;
      width: 97%;
      margin: 0 auto 18px;
      display: block;
    }
    .event-card-footer-inner {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 24px;
        margin-left: 4px;
      }
    }
    span {
      color: var(--text-lighter);
    }
  }
}
</style>
