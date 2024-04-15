<script setup lang="ts">
import type { IDatePickerProps, IDatePickerEmits } from "@/types";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useAttrs, computed, ref } from "vue";
import { getSettings } from "./stateDefault";

defineProps<IDatePickerProps>();
const emits = defineEmits<IDatePickerEmits>();

const attrs = useAttrs();
const propsFromSettings = computed(() => getSettings(attrs));

const $VueDatePicker = ref<InstanceType<typeof VueDatePicker>>();

defineExpose({ el: $VueDatePicker.value });
</script>

<template>
  <VueDatePicker
    ref="$VueDatePicker"
    v-bind="propsFromSettings"
    :model-value="modelValue"
    @update:modelValue="emits('update:modelValue', $event)"
  ></VueDatePicker>
</template>
