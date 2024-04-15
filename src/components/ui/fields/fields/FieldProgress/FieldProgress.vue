<script setup lang="ts">
import Progress from "@/components/ui/Progress/Progress.vue";
import type { IFieldProgressProps } from "@/types";
import FieldWrapper from "../../components/FieldWrapper.vue";

import { FIELD_PROGRESS as CL } from "@/classes";

const props = withDefaults(defineProps<IFieldProgressProps>(), {
  placeholder: "",
  label: ""
});
</script>

<template>
  <FieldWrapper v-bind="props" :class="CL.WRAPPER">
    <Progress :modelValue="modelValue" :class="CL.WRAPPER_INPUT" />
  </FieldWrapper>
</template>
