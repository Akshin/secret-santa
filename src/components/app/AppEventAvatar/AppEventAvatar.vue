<script setup lang="ts">
import Icon from "@/components/ui/Icon/Icon.vue";
import { useEventIcons } from "@/composables/useUserIcons";
import type { IAppUserAvatarProps } from "@/types/system";
// import { computed } from "vue";

const props = withDefaults(defineProps<IAppUserAvatarProps>(), {
  size: 24,
  icon: 0,
  selected: false
});

const { getIconData } = useEventIcons();

// const style = computed<any>(() => ({
//   width: `${props.size}px`
// }));
</script>

<template>
  <div class="app-user-avatar-wrapper">
    <img :src="getIconData(icon).src" />
    <div class="app-user-avatar-selected" v-show="selected">
      <div><Icon name="check" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-user-avatar-wrapper {
  position: relative;
  img {
    width: 100%;
    border-radius: 24px;
  }
  .app-user-avatar-selected {
    position: absolute;
    right: 0;
    top: 0;
    width: 28px;
    height: 28px;
    padding: 3px;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    & > div {
      background: var(--primary-1);
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-wrapper {
        color: #fff;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
