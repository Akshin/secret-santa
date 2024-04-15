<script setup lang="ts">
import { FIELD_DATEPICKER as CL } from "@/classes";
import DatePicker from "@/components/ui/DatePicker/DatePicker.vue";
import { useDatePicker } from "@/composables/useDatePicker";
import type { IFieldEmits, IFieldProps } from "@/types";
import { computed, ref } from "vue";
import FieldWrapper from "../../components/FieldWrapper.vue";

const props = withDefaults(defineProps<IFieldProps>(), {
  readonly: false,
  disabled: false,
  clearable: false,
  loading: false,
  errors: () => [],
  placeholder: "",
  label: "",
  settings: () => ({})
});
const emits = defineEmits<IFieldEmits>();
const typeProps = useDatePicker(props.type || "datepicker");

const $DatePicker = ref<InstanceType<typeof DatePicker>>();
const pickerProps = computed(() => {
  return Object.assign(props.settings, typeProps);
});

function onChange(e: any): void {
  emits("update:modelValue", e);
}
</script>

<template>
  <FieldWrapper
    v-slot="{ id, isDisabled }"
    v-bind="props"
    :class="CL.WRAPPER"
    @clear="onChange"
    @iconClick="() => $DatePicker?.el?.openMenu()"
  >
    <DatePicker
      ref="$DatePicker"
      v-bind="pickerProps"
      :uid="id"
      :disabled="isDisabled"
      :input-class-name="CL.WRAPPER_INPUT"
      :model-value="modelValue"
      :readonly="readonly"
      :placeholder="placeholder"
      @update:model-value="onChange"
    ></DatePicker>
  </FieldWrapper>
</template>
