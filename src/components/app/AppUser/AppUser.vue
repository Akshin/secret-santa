<script setup lang="ts">
import Icon from "@/components/ui/Icon/Icon.vue";
import { useUserIcons } from "@/composables/useUserIcons";
import type { IAppUserEmits, IAppUserProps } from "@/types/system";

defineProps<IAppUserProps>();
const emits = defineEmits<IAppUserEmits>();
const { getImageSrc } = useUserIcons();

function onOpt() {
  emits("optionClicked");
}
</script>

<template>
  <div class="app-user-wrapper">
    <img :src="getImageSrc(icon as number)" />
    <p class="text-6">{{ username }}</p>
    <div @click="onOpt" v-if="showOptions">
      <Icon name="options" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-user-wrapper {
  display: flex;
  align-items: center;
  img {
    width: 34px;
    margin-right: 16px;
  }
  p {
    flex-grow: 1;
  }
  .icon-wrapper {
    color: var(--text-lighter);
  }
}
</style>
