<script setup lang="ts">
import { CHECKBOX as CL, TR_CHECKBOX } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import type { ICheckboxEmits, ICheckboxProps } from "@/types";
import { useSlots } from "vue";

const props = withDefaults(defineProps<ICheckboxProps>(), {
  modelValue: false,
  disabled: false,
  readonly: false,
  loading: false,
  label: ""
});
const emits = defineEmits<ICheckboxEmits>();
const slots = useSlots();

function onClick(): void {
  if (props.disabled || props.readonly || props.loading) return;
  emits("update:modelValue", !props.modelValue);
}
</script>

<template>
  <div :class="[CL.WRAPPER, { disabled, readonly, loading, checked: modelValue }]" @click="onClick">
    <div :class="CL.WRAPPER_ICON_CONTAINER">
      <transition :name="TR_CHECKBOX">
        <Icon v-if="modelValue" name="check" />
      </transition>
    </div>
    <!-- <div v-if="slots.default" :class="CL.WRAPPER_CONTEENT"><slot></slot></div> -->
    <div :class="CL.WRAPPER_CONTEENT">
      <template v-if="slots.default"><slot></slot></template>
      <template v-else> {{ label }} </template>
    </div>
  </div>
</template>
