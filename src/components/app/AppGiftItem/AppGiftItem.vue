<script setup lang="ts">
import { useImage } from "@/composables/useImage";
import type { IAppGiftItem } from "@/types/system";
import { windowOpen } from "@/utils/windowOpen";

withDefaults(defineProps<IAppGiftItem>(), {
  link: "",
  title: "",
  color: "var(--primary-2)"
});

const { getImage } = useImage();
</script>

<template>
  <div class="gift-item-wrapper" :style="{ background: color }" @click="windowOpen(link, true)">
    <img v-if="imageSrc" :src="getImage(imageSrc)" />
    <p>{{ title }}</p>
  </div>
</template>

<style lang="scss" scoped>
.gift-item-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    font-size: 0.6rem;
  }
  img {
    max-height: 80%;
    max-width: 80%;
  }
}
</style>
