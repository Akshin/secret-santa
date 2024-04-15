<script setup lang="ts">
import { useFieldsEmits } from "@/composables/useFields";

import FieldWrapper from "../../components/FieldWrapper.vue";
import type { IFieldProps, IFieldEmits } from "@/types";

import { FIELD_TEXTAREA as CL } from "@/classes";

const props = withDefaults(defineProps<IFieldProps>(), {
  readonly: false,
  disabled: false,
  clearable: false,
  loading: false,
  errors: () => [],
  name: "",
  placeholder: "",
  label: ""
});
const emits = defineEmits<IFieldEmits>();
const fieldEmits = useFieldsEmits(emits);
</script>

<template>
  <FieldWrapper
    v-slot="{ id, isDisabled }"
    v-bind="props"
    :class="CL.WRAPPER"
    @clear="fieldEmits.onClear"
  >
    <textarea
      :id="id"
      :class="CL.WRAPPER_INPUT"
      :disabled="isDisabled"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      @input="fieldEmits.onInput"
      @blur="fieldEmits.onBlur"
      @keyup.esc="fieldEmits.onEsc"
    >
    </textarea>
  </FieldWrapper>
</template>
