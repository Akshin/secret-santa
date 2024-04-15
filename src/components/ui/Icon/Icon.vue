<script setup lang="ts">
import { ICON as CL } from "@/classes";
import type { IIconProps } from "@/types";
import { computed } from "vue";

const props = defineProps<IIconProps>();

const svgSpriteSrc = computed<string>(() => {
  return "/sprite.svg" + "#" + props.name;
});
</script>

<template>
  <svg v-if="name" :style="{ width, height, color }" :class="CL.WRAPPER">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="svgSpriteSrc" />
  </svg>
</template>
