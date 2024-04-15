<script setup lang="ts">
import Switch from "@/components/ui/Switch/Switch.vue";
import type { IFieldEmits, IFieldProps } from "@/types";
import FieldWrapper from "../../components/FieldWrapper.vue";

import { FIELD_SWITCH as CL } from "@/classes";

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
    <Switch
      :id="id"
      :disabled="isDisabled"
      :modelValue="modelValue"
      @update:modelValue="emits('update:modelValue', $event)"
    >
      {{ settings?.label }}
    </Switch>
  </FieldWrapper>
</template>
