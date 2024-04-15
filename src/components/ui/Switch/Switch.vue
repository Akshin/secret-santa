<script setup lang="ts">
import { SWITCH as CL } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import type { ISwitchEmits, ISwitchProps } from "@/types";
import { useSlots } from "vue";

const props = withDefaults(defineProps<ISwitchProps>(), {
  modelValue: false,
  disabled: false,
  readonly: false,
  loading: false
});
const emits = defineEmits<ISwitchEmits>();
const slots = useSlots();

function onClick(): void {
  if (props.disabled || props.readonly || props.loading) return;
  emits("update:modelValue", !props.modelValue);
}
</script>

<template>
  <div :class="[CL.WRAPPER, { disabled, readonly, loading, checked: modelValue }]" @click="onClick">
    <div :class="CL.WRAPPER_CONTAINER">
      <div :class="CL.WRAPPER_CONTAINER_CIRCLE">
        <Icon v-if="loading" name="spinner" />
      </div>
    </div>
    <div v-if="slots.default" :class="CL.WRAPPER_CONTENT"><slot></slot></div>
  </div>
</template>
