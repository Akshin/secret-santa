<script setup lang="ts">
import type { IFieldJsonProps, IFieldJsonEmits } from "@/types";

withDefaults(defineProps<IFieldJsonProps>(), { errors: () => ({}) });
const emits = defineEmits<IFieldJsonEmits>();
</script>

<template>
  <div v-if="childFields" class="row">
    <div
      v-for="(fieldValue, fieldKey, i) in childFields"
      v-show="childFields[fieldKey].visible"
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
