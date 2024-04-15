<script setup lang="ts">
import { useFieldsEmits } from "@/composables/useFields";

import FieldWrapper from "@/components/ui/fields/components/FieldWrapper.vue";
import type { IFieldEmits, IFieldProps } from "@/types";

import { FIELD_PHONE as CL } from "@/classes";

const props = withDefaults(defineProps<IFieldProps>(), {
  readonly: false,
  disabled: false,
  clearable: false,
  loading: false,
  errors: () => [],
  name: "",
  placeholder: "",
  label: "",
  type: "phone",
  // @ts-ignore
  settings: { mask: "+7 (###) ###-##-##" }
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
    <input
      :id="id"
      :class="CL.WRAPPER_INPUT"
      :disabled="isDisabled"
      :value="modelValue"
      type="tel"
      :name="name"
      :placeholder="placeholder"
      @input="fieldEmits.onInput"
      @blur="fieldEmits.onBlur"
      @keyup.esc="fieldEmits.onEsc"
    />
  </FieldWrapper>
</template>
