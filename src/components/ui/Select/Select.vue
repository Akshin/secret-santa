<script setup lang="ts">
import type { IFieldSettings, ISelectEmits, ISelectProps } from "@/types";

import { SELECT as CL } from "@/classes";
import { computed, ref, useAttrs } from "vue";
import VueMultiselect from "vue-multiselect";
import { getSettings } from "./stateDefault";

defineProps<ISelectProps>();
const emits = defineEmits<ISelectEmits>();

const attrs = useAttrs();
const propsFromSettings = computed<IFieldSettings>(() => getSettings(attrs));

const $VueMultiselect = ref<InstanceType<typeof VueMultiselect>>();

defineExpose({ el: $VueMultiselect.value });
</script>

<template>
  <VueMultiselect
    ref="$VueMultiselect"
    v-bind="propsFromSettings"
    :model-value="modelValue"
    @update:modelValue="emits('update:modelValue', $event)"
  >
    <template #noOptions>
      <p :class="CL.NO_OPTIONS">{{ propsFromSettings.noOptionsText }}</p>
    </template>
    <template #noResult>
      <p :class="CL.NO_RESULT">{{ propsFromSettings.noResultText }}</p>
    </template>
  </VueMultiselect>
</template>
