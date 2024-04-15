<script setup lang="ts">
import Icon from "@/components/ui/Icon/Icon.vue";
import { useUserIcons } from "@/composables/useUserIcons";
import type { IAppUserAvatarProps } from "@/types/system";
import { computed } from "vue";

const props = withDefaults(defineProps<IAppUserAvatarProps>(), {
  size: 24,
  icon: 0,
  selected: false
});

const { getImageSrc } = useUserIcons();

const style = computed<any>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  minWidth: `${props.size}px`,
  minHeight: `${props.size}px`
}));
</script>

<template>
  <div class="app-user-avatar-wrapper" :style="style">
    <img :src="getImageSrc(icon)" />
    <transition name="fade">
      <div class="app-user-avatar-selected" v-if="selected">
        <div><Icon name="check" /></div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.app-user-avatar-wrapper {
  border-radius: 50%;
  display: flex;
  align-items: center;
  position: relative;
  background: #eee;
  img {
    height: 100%;
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
