<script setup lang="ts">
import { MODAL_PROMPT as CL } from "@/classes";
import Button from "@/components/ui/Button/Button.vue";
import Icon from "@/components/ui/Icon/Icon.vue";
import { useModal } from "@/composables/useModal";
import { TEXT } from "@/text";
import type { IModalPromptEmits, IModalPromptProps } from "@/types";

const props = withDefaults(defineProps<IModalPromptProps>(), {
  cancelText: TEXT.MODAL_PROMPT_BTN_CANCEL,
  applyText: TEXT.MODAL_PROMPT_BTN_APPLY
});
const emits = defineEmits<IModalPromptEmits>();

const { show, open, close } = useModal({ wrapperSelector: props.wrapperSelector });

function apply(): void {
  emits("clicked", "apply");
  close();
}

function cancel(): void {
  emits("clicked", "cancel");
  close();
}

function _close(): void {
  emits("clicked", "cancel");
  close();
}

defineExpose({ open, close: _close });
</script>

<template>
  <teleport to="#app">
    <div v-if="show" :class="CL.WRAPPER" @click.self="close">
      <div :class="CL.WRAPPER_CONTAINER">
        <div :class="CL.WRAPPER_CONTAINER_INNER">
          <Icon name="x" :class="CL.WRAPPER_CONTAINER_ICON" @click="close" />
          <div :class="CL.WRAPPER_CONTAINER_TEXT"><slot></slot></div>
          <div :class="CL.WRAPPER_CONTAINER_BTNS">
            <Button :class="CL.WRAPPER_CONTAINER_BTNS_CANCEL" @click="cancel">{{
              cancelText
            }}</Button>
            <Button :class="CL.WRAPPER_CONTAINER_BTNS_APPLY" @click="apply">{{ applyText }}</Button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
