<script setup lang="ts">
import { TIMELINE as CL } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import type { ITimelineEmits, ITimelineProps } from "@/types";
import { computed } from "vue";

const props = withDefaults(defineProps<ITimelineProps>(), {
  modelValue: "",
  items: () => [],
  readonly: true
});

const emits = defineEmits<ITimelineEmits>();

const checkedFields = computed(() => {
  const catchedIndex = props.items.findIndex((item) => props.modelValue === item);
  return props.items.map((item, i) => catchedIndex >= i);
});

function itemClick(value: string | number) {
  if (props.readonly) return;
  emits("update:modelValue", value);
}
</script>

<template>
  <div :class="CL.WRAPPER">
    <template v-for="(item, i) in items" :key="i">
      <div :class="[CL.WRAPPER_ITEM, { checked: checkedFields[i] }]" @click="itemClick(item)">
        <div :class="CL.WRAPPER_ICON_WRAPPER">
          <Icon name="check" v-if="checkedFields[i]" />
        </div>
        <div :class="CL.WRAPPER_TEXT">{{ item }}</div>
      </div>
      <div
        v-if="i < items.length - 1"
        :class="[CL.WRAPPER_LINE, { checked: checkedFields[i + 1] }]"
      ></div>
    </template>
  </div>
</template>
