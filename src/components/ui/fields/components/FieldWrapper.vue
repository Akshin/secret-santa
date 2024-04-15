<script setup lang="ts">
import { FIELDS_WRAPPER as CL } from "@/classes";
import Button from "@/components/ui/Button/Button.vue";
import Icon from "@/components/ui/Icon/Icon.vue";
import { useFieldProps } from "@/composables/useFields";
import { useMask } from "@/composables/useMask";
import type { IFieldWrapperEmits, IFieldWrapperProps } from "@/types";
import ErrorMessages from "./ErrorMessages.vue";

const props = defineProps<IFieldWrapperProps>();
const emits = defineEmits<IFieldWrapperEmits>();

const fieldProps = useFieldProps(props);

function onInputIconClicked() {
  const el = document.getElementById(fieldProps.id) as HTMLInputElement;
  el.focus();
  emits("iconClick");
}

// хак для бага с телефоном с мобильных устройств
function maskPreProcess(value: string) {
  if (value !== "+0") return value;

  return "+";
}

if (props.settings?.mask && props.settings?.mask.length) {
  const preProcess = props.type === "phone" ? maskPreProcess : undefined;
  useMask(fieldProps.id, props.settings.mask, preProcess);
}
</script>

<template>
  <div :class="[CL.WRAPPER, fieldProps.classes]">
    <label v-if="label" :class="CL.WRAPPER_LABEL" :for="fieldProps.id"> {{ label }} </label>
    <div :class="CL.WRAPPER_BLOCK">
      <Icon
        v-if="prependIcon"
        :name="prependIcon"
        :class="CL.WRAPPER_BLOCK_PREPEND_ICON"
        @click="onInputIconClicked"
      />
      <slot v-bind="fieldProps"> </slot>
      <Button
        v-if="fieldProps.showClearableButton"
        prependIcon="x"
        :class="CL.WRAPPER_BLOCK_CLEAR_ICON"
        @click="emits('clear')"
      />
      <Icon
        v-if="appendIcon"
        :name="appendIcon"
        :class="CL.WRAPPER_BLOCK_APPEND_ICON"
        @click="onInputIconClicked"
      />
    </div>
    <ErrorMessages v-if="fieldProps.showErrors" :errors="errors" />
  </div>
</template>
