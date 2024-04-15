<script setup lang="ts">
import { useFieldsEmits } from "@/composables/useFields";

import type { IFieldEmits, IFieldProps } from "@/types";
import FieldWrapper from "../../components/FieldWrapper.vue";

import { FIELD_TEXT as CL } from "@/classes";
import { ref } from "vue";

const props = withDefaults(defineProps<IFieldProps>(), {
  readonly: false,
  disabled: false,
  clearable: false,
  loading: false,
  errors: () => [],
  name: "",
  type: "text",
  placeholder: "",
  label: ""
});
const emits = defineEmits<IFieldEmits>();
const fieldEmits = useFieldsEmits(emits);
const $input = ref();

function focus() {
  $input.value?.focus();
}

defineExpose({ focus });
</script>

<template>
  <FieldWrapper
    v-slot="{ id, isDisabled }"
    v-bind="props"
    :class="CL.WRAPPER"
    @clear="fieldEmits.onClear"
  >
    <input
      ref="$input"
      :id="id"
      :class="CL.WRAPPER_INPUT"
      :disabled="isDisabled"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="fieldEmits.onInput"
      @blur="fieldEmits.onBlur"
      @keyup.esc="fieldEmits.onEsc"
    />
  </FieldWrapper>
</template>
