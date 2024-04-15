<script setup lang="ts">
import type { IDialogProps } from "@/types/system";

withDefaults(defineProps<IDialogProps>(), {
  text: ""
});
</script>

<template>
  <div class="dialog-wrapper">
    <span class="text-6">{{ text }}</span>
    <img src="@/assets/pip2.png" />
  </div>
</template>

<style lang="scss" scoped>
.dialog-wrapper {
  padding: 18px;
  position: relative;
  width: 100%;
  background: var(--grey);
  border-radius: 24px;
  img {
    position: absolute;
    width: 30px;
    left: 24px;
    top: -13px;
  }
}
</style>
