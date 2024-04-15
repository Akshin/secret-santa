<script setup lang="ts">
import type { IFieldEmits, IFieldProps } from "@/types";
import { useSlots } from "vue";
import Radio from "../../../Radio/Radio.vue";
import FieldWrapper from "../../components/FieldWrapper.vue";

import { FIELD_RADIO as CL } from "@/classes";
import { computed } from "vue";

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

const slots = useSlots();

const items = computed<string[] | number[]>(() => props.settings.items || []);
</script>

<template>
  <!-- @vue-ignore -->
  <FieldWrapper v-slot="{ id, isDisabled }" :clearable="false" v-bind="props" :class="CL.WRAPPER">
    <Radio
      :id="id"
      :disabled="isDisabled"
      :modelValue="modelValue"
      :items="items"
      @update:modelValue="emits('update:modelValue', $event)"
    >
      <template v-for="(item, i) in items" v-slot:[`item.${item}`] :key="i">
        <template v-if="slots[`item.${item}`]">
          <slot :name="`item.${item}`"></slot>
        </template>
        <template v-else>
          {{ item }}
        </template>
      </template>
    </Radio>
  </FieldWrapper>
</template>
