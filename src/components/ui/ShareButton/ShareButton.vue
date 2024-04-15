<script setup lang="ts">
import Icon from "@/components/ui/Icon/Icon.vue";
import type { ITimelineProps } from "@/types";

import { SHARE_BUTTON as CL } from "@/classes";

const props = withDefaults(defineProps<ITimelineProps>(), {
  title: "Поделиться",
  shareTitle: "",
  shareText: ""
});

const navigatorExists: boolean = Boolean(window.navigator && navigator.canShare);

function click() {
  if (!navigatorExists) return console.log("Your system doesn't support sharing files");
  navigator
    .share({
      title: props.shareTitle,
      text: props.shareText
    })
    .then(() => console.log("Share was successful."))
    .catch((error) => console.log("Sharing failed", error));
}
</script>

<template>
  <div :class="CL.WRAPPER" @click="click" v-if="navigatorExists">
    <Icon name="share" />
    <p>{{ title }}</p>
  </div>
</template>
