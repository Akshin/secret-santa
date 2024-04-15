<script setup lang="ts">
import { PROGRESS as CL } from "@/classes";
import type { IProgressProps } from "@/types";
import { computed } from "vue";

const props = withDefaults(defineProps<IProgressProps>(), { modelValue: 0 });

const lineWidth = computed<string>(() => {
  let val = props.modelValue;
  if (!val) return "0%";

  if (!val || val <= 0) {
    val = 0;
  } else if (val >= 100) {
    val = 100;
  }

  return val + "%";
});
</script>

<template>
  <div :class="CL.WRAPPER">
    <div :class="CL.WRAPPER_VALUE" v-if="title">{{ title }}</div>
    <div :class="CL.WRAPPER_LINE">
      <div :style="{ width: lineWidth }"></div>
    </div>
  </div>
</template>
