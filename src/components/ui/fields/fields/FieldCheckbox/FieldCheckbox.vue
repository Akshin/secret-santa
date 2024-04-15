<script setup lang="ts">
import Checkbox from "../../../Checkbox/Checkbox.vue";
import FieldWrapper from "../../components/FieldWrapper.vue";
import type { IFieldProps, IFieldEmits } from "@/types";

import { FIELD_CHECKBOX as CL } from "@/classes";

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
</script>

<template>
  <!-- @vue-ignore -->
  <FieldWrapper v-slot="{ id, isDisabled }" :clearable="false" v-bind="props" :class="CL.WRAPPER">
    <Checkbox
      :id="id"
      :disabled="isDisabled"
      :modelValue="modelValue"
      @update:modelValue="emits('update:modelValue', $event)"
    >
      {{ settings?.label }}
    </Checkbox>
  </FieldWrapper>
</template>
