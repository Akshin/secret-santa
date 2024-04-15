<script setup lang="ts">
import { EXP_PANEL_ITEM as CL, TR_EXP_PANEL } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import type { IExpansionPanelItemProps } from "@/types";
import { computed, inject } from "vue";

const props = withDefaults(defineProps<IExpansionPanelItemProps>(), {
  disabled: false
});

const { current, setCurrent } = inject<any>("dependency");
const isActive = computed<boolean>(() => current.value.includes(props.index));
const chevron = computed<string>(() => (isActive.value ? "chevron-down" : "chevron-right"));

function onHeaderClick(): void {
  if (props.disabled) return;
  setCurrent(props.index);
}
</script>

<template>
  <div :class="CL.WRAPPER">
    <div :class="CL.WRAPPER_HEADER" @click="onHeaderClick">
      <Icon :name="chevron" />
      <div><slot name="header"></slot></div>
    </div>
    <transition :name="TR_EXP_PANEL">
      <div v-show="isActive" :class="CL.WRAPPER_CONTENT">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>
