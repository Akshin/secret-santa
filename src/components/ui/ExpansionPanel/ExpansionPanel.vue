<script setup lang="ts">
import { EXP_PANEL as CL } from "@/classes";
import type { IExpansionPanelEmits, IExpansionPanelProps } from "@/types";
import { computed, provide } from "vue";

const props = withDefaults(defineProps<IExpansionPanelProps>(), {
  modelValue: () => [],
  multiple: true
});
const emits = defineEmits<IExpansionPanelEmits>();

const value = computed<number[]>(() => props.modelValue);

function setCurrent(current: number): void {
  let val = props.modelValue.slice();
  const indexInArray = val.indexOf(current);

  if (!props.multiple) {
    val = indexInArray < 0 ? [current] : [];
  } else {
    if (indexInArray < 0) {
      val.push(current);
    } else {
      val.splice(indexInArray, 1);
    }
  }

  emits("update:modelValue", val);
}

provide("dependency", {
  current: value,
  setCurrent
});
</script>

<template>
  <div :class="CL.WRAPPER">
    <slot></slot>
  </div>
</template>
