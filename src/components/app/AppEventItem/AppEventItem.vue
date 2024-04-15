<script setup lang="ts">
import { useEventIcons } from "@/composables/useUserIcons";
import type { IAppEventItemProps } from "@/types/system";
import { computed } from "vue";

const props = defineProps<IAppEventItemProps>();
const { getIconData } = useEventIcons();

const iconData = getIconData(props.icon);

const style = computed(() => ({ background: iconData.bg }));
</script>

<template>
  <div class="event-item-wrapper" :style="style">
    <p class="event-item-title">{{ title }}</p>
    <p class="event-item-subtitle">{{ subtitle }}</p>
    <p class="event-item-description">{{ description }}</p>
    <img :src="iconData.src" />
  </div>
</template>

<style lang="scss" scoped>
.event-item-wrapper {
  border-radius: 18px;
  box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.06);
  padding: 12px 28px;
  height: 85px;
  position: relative;
  margin-bottom: 18px;
  .event-item-title {
    font-size: 18px;
    font-weight: 400;
    color: var(--primary-1);
    margin-bottom: 4px;
  }
  .event-item-subtitle {
    color: var(--primary-1);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.24px;
  }
  .event-item-description {
    color: var(--primary-1);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.24px;
  }
  img {
    position: absolute;
    right: 23px;
    top: 50%;
    transform: translateY(-50%);
    width: 75px;
    height: 75px;
  }
}

// @include deviceIs(desktop) {
//   .event-item-wrapper {
//     border-radius: 44px;
//     height: 200px;
//     padding: 34px 65px !important;
//     margin-bottom: 32px;
//     .event-item-title {
//       font-size: 40px !important;
//       margin-bottom: 14px !important;
//     }
//     .event-item-subtitle {
//       font-size: 30px !important;
//     }
//     .event-item-description {
//       font-size: 30px !important;
//     }
//     img {
//       width: 140px;
//       height: 140px;
//       right: 50px;
//     }
//   }
// }
</style>
