<script setup lang="ts">
import { MODAL as CL } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import { useModal } from "@/composables/useModal";
import type { IModalProps } from "@/types";

const props = defineProps<IModalProps>();
const { show, open, close } = useModal({ wrapperSelector: props.wrapperSelector });

defineExpose({ open, close });
</script>

<template>
  <div v-if="show" :class="CL.WRAPPER" @click.self="close">
    <div :class="CL.WRAPPER_CONTENT">
      <slot></slot>
      <Icon name="x" :class="CL.WRAPPER_CONTENT_ICON" @click="close" />
    </div>
  </div>
  <!-- <div v-if="show" :class="CL.OVERLAY" @click.self="close"></div> -->
</template>
