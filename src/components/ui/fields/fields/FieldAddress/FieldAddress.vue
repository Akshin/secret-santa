<script setup lang="ts">
import type { IFieldJsonEmits, IFieldJsonProps } from "@/types";

const props = withDefaults(defineProps<IFieldJsonProps>(), { errors: () => ({}) });
const emits = defineEmits<IFieldJsonEmits>();

const HIDDEN_FIELDS: string[] = ["lat", "lon"];

function show(fieldKey: string): boolean {
  if (HIDDEN_FIELDS.includes(fieldKey) || !props.childFields || !props.childFields[fieldKey])
    return false;
  return props.childFields[fieldKey].visible;
}
</script>

<template>
  <div v-if="childFields" class="row">
    <div
      v-for="(fieldValue, fieldKey, i) in childFields"
      v-show="show(fieldKey as string)"
      :key="i"
      :class="'col-' + childFields[fieldKey].grid"
      class="column"
    >
      <FieldCreator
        v-model="modelValue[fieldKey]"
        v-bind="childFields[fieldKey]"
        :errors="errors[fieldKey] || []"
        @blur="emits('blur', $event)"
      />
    </div>
  </div>
</template>
