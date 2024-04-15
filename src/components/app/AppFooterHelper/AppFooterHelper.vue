<script setup lang="ts">
import Button from "@/components/ui/Button/Button.vue";
import type { IAppFooterHelperEmits, IAppFooterHelperProps } from "@/types/system";

defineProps<IAppFooterHelperProps>();
const emits = defineEmits<IAppFooterHelperEmits>();
</script>

<template>
  <div class="footer-hepler-wrapper container p">
    <div class="footer-hepler-btn" v-if="btnText">
      <Button @click="emits('btnClicked')">{{ btnText }}</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-hepler-wrapper {
  position: fixed !important;
  width: 100%;
  bottom: 0;
  .footer-hepler-btn {
    padding: 38px 0 16px 0;
    display: flex;
    justify-content: center;
  }
}
</style>
