<script setup lang="ts">
import { bus } from "@/bus";
import { ALERT as CL, TR_ALERT } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import type { IAlertMessage, IAlertMessageType } from "@/types/";
import { computed, ref } from "vue";

const MESSAGE_EXPIRES_SECONDS: number = 5000;
const messages = ref<IAlertMessage[]>([]);
const messagesReversed = computed<IAlertMessage[]>(() => messages.value.slice().reverse());

bus.on("alert", sendMessage);

function getIcon(type: IAlertMessageType): string {
  switch (type) {
    case "danger":
      return "x-circle";
    case "warning":
      return "alert-circle";
    case "info":
      return "info";
    case "success":
      return "check-circle";
    default:
      return "info";
  }
}

function sendMessage(message: IAlertMessage): void {
  message.icon = getIcon(message.type);
  messages.value.push(message);

  setTimeout(() => {
    if (messages.value.length) {
      removeMessage(0);
    }
  }, MESSAGE_EXPIRES_SECONDS);
}

function removeMessage(i: number): void {
  messages.value.splice(i, 1);
}
</script>

<template>
  <div :class="CL.WRAPPER">
    <transition-group :name="TR_ALERT">
      <div
        v-for="(message, i) in messagesReversed"
        :key="i"
        :class="[CL.WRAPPER_ITEM, message.type]"
      >
        <div :class="CL.WRAPPER_ICON">
          <Icon v-if="message.icon" :name="message.icon" />
        </div>
        <span :class="CL.WRAPPER_ITEM_TEXT">{{ message.text }}</span>
      </div>
    </transition-group>
  </div>
</template>
