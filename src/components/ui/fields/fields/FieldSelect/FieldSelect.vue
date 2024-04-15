<script setup lang="ts">
import { FIELD_SELECT as CL } from "@/classes";
import Select from "@/components/ui/Select/Select.vue";
import { TEXT } from "@/text";
import type { IFieldItem, IFieldSelectEmits, IFieldSelectProps } from "@/types";
import { computed, ref } from "vue";
import FieldWrapper from "../../components/FieldWrapper.vue";

const props = withDefaults(defineProps<IFieldSelectProps>(), {
  readonly: false,
  disabled: false,
  clearable: false,
  loading: false,
  errors: () => [],
  name: "",
  placeholder: "",
  label: "",
  noOptionsText: TEXT.FIELDS_SELECT_NO_OPTION,
  noResultText: TEXT.FIELDS_SELECT_NO_RESULT
});
const emits = defineEmits<IFieldSelectEmits>();

const $Select = ref<InstanceType<typeof Select>>();

function onChange(e: any): void {
  emits("update:modelValue", e);
}

const value = computed({
  get() {
    // должен вернуть объект или массив объектов при существовании settings;
    const settings = props?.settings;
    if (!settings) return props.modelValue;

    const isMultiple = Array.isArray(props.modelValue);
    if (!isMultiple) {
      return settings.options.find(
        (opt: IFieldItem) => opt[settings.optionValue] === props.modelValue
      );
    }

    return settings.options.filter((opt: IFieldItem) =>
      props.modelValue.includes(opt[settings.optionValue])
    );
  },
  set(value) {
    // должен отдать значение или массив значение, а не объект/объектов
    const settings = props?.settings;
    if (!settings || !value) return emits("update:modelValue", value);

    const isMultiple = Array.isArray(value);
    const result = isMultiple
      ? value.map((v) => v[props.settings?.optionValue])
      : value[props.settings?.optionValue];

    emits("update:modelValue", result);
  }
});
</script>

<template>
  <FieldWrapper
    v-slot="{ id, isDisabled }"
    v-bind="props"
    :class="CL.WRAPPER"
    :clearable="false"
    @clear="onChange"
    @iconClick="() => $Select?.el?.activate()"
  >
    <Select
      v-bind="props.settings"
      :id="id"
      ref="$Select"
      v-model="value"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :noOptionsText="noOptionsText"
      :noResultText="noResultText"
    />
  </FieldWrapper>
</template>
