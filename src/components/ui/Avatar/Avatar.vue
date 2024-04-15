<script setup lang="ts">
import { AVATAR as CL } from "@/classes";
import type { IAvatarProps } from "@/types";

defineProps<IAvatarProps>();
</script>

<template>
  <div :class="CL.WRAPPER">
    <img v-if="src" :src="src" :alt="alt" :class="CL.WRAPPER_IMG" />
    <span v-else :class="CL.WRAPPER_TEXT"> {{ text }} </span>
  </div>
</template>
