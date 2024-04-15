<script setup lang="ts">
import { BUTTON as CL } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import type { IButtonEmits, IButtonProps } from "@/types";
import { useSlots } from "vue";

const props = withDefaults(defineProps<IButtonProps>(), {
  disabled: false,
  loading: false
});
const emits = defineEmits<IButtonEmits>();
const slots = useSlots();

function onClick(): void {
  if (props.disabled || props.loading) return;
  emits("click");
}
</script>

<template>
  <button
    :class="[CL.WRAPPER, { disabled, loading }]"
    :disabled="disabled"
    @click.prevent="onClick"
  >
    <Icon v-if="prependIcon" :name="prependIcon" :class="CL.WRAPPER_PREPEND_ICON" />
    <span v-if="slots.default" :class="CL.WRAPPER_TEXT">
      <slot></slot>
    </span>
    <Icon v-if="appendIcon" :name="appendIcon" :class="CL.WRAPPER_APPPEND_ICON" />
  </button>
</template>
