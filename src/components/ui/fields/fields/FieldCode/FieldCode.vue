<script setup lang="ts">
import { FIELD_CODE as CL } from "@/classes";
import FieldWrapper from "@/components/ui/fields/components/FieldWrapper.vue";
import type { IFieldCodeEmits, IFieldCodeProps } from "@/types";
import { ref, watch } from "vue";

const props = withDefaults(defineProps<IFieldCodeProps>(), {
  readonly: false,
  disabled: false,
  loading: false,
  errors: () => [],
  bars: 4
});
const emits = defineEmits<IFieldCodeEmits>();

const $inputs = ref();
const values = ref<number[]>(Array(props.bars));

function onInput(e: any, index: number) {
  const v: string = e.target.value;

  if ($inputs.value[index]) {
    $inputs.value[index].focus();
    $inputs.value[index].select();
  }

  if (index === values.value.length) {
    $inputs.value[index - 1].blur();
    emits("complete", values.value.join(""));
  }
}

function onDelete(e: any, index: number) {
  if ($inputs.value[index - 2]) {
    $inputs.value[index - 2].focus();
    $inputs.value[index - 2].select();
  }
}

watch(
  () => values,
  (newValue) => {
    emits("update:modelValue", newValue.value.join(""));
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (newValue) => {
    for (let i = 0; i < newValue.length; i++) {
      if (values.value[i]) values.value[i] = newValue[i];
    }
  }
);

function focus() {
  $inputs.value[0].focus();
}

function reset() {
  values.value = Array(props.bars);
  focus();
}

defineExpose({ focus, reset });
</script>

<template>
  <FieldWrapper v-bind="props" :class="CL.WRAPPER">
    <input
      v-for="index in bars"
      :class="CL.WRAPPER_INPUT"
      ref="$inputs"
      :key="index"
      v-model="values[index - 1]"
      maxlength="1"
      type="tel"
      @input="onInput($event, index)"
      @keyup.delete="onDelete($event, index)"
    />
  </FieldWrapper>
</template>
