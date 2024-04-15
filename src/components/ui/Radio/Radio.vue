<script setup lang="ts">
import { RADIO as CL } from "@/classes";
import Checkbox from "@/components/ui/Checkbox/Checkbox.vue";
import type { IRadioEmits, IRadioProps } from "@/types";
import { computed, ref, useSlots } from "vue";

const props = withDefaults(defineProps<IRadioProps>(), {
  items: () => [],
  disabled: false,
  readonly: false,
  loading: false
});
const emits = defineEmits<IRadioEmits>();
const slots = useSlots();

const itemChecked = ref<string | number>(props.modelValue);
const models = computed<boolean[]>(() => props.items.map((item) => itemChecked.value === item));

function onChange(i: number, isChecked: boolean) {
  if (!isChecked || props.disabled || props.readonly || props.loading) return;

  const value = props.items[i];
  itemChecked.value = value;
  emits("update:modelValue", value);
}
</script>

<template>
  <div :class="[CL.WRAPPER, { disabled, readonly, loading, checked: modelValue }]">
    <Checkbox
      v-for="(item, i) in items"
      :key="i"
      :modelValue="models[i]"
      @update:modelValue="onChange(i, $event)"
    >
      <template v-if="slots[`item.${item}`]">
        <slot :name="`item.${item}`"></slot>
      </template>
      <template v-else>
        {{ item }}
      </template>
    </Checkbox>
  </div>
</template>
