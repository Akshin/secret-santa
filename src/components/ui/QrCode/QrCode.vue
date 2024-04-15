<script setup lang="ts">
import { QR_CODE as CL } from "@/classes";
import type { IQrCodeProps } from "@/types";
import { uuid4 } from "@/utils/uuid";
import QRCode from "qrcode";

import { onMounted } from "vue";

const props = withDefaults(defineProps<IQrCodeProps>(), { text: "", color: "#000" });
const id: string = "qr_" + uuid4();

onMounted(() => {
  QRCode.toCanvas(document.getElementById(id), props.text, { color: { dark: props.color } });
});
</script>

<template>
  <div :class="CL.WRAPPER">
    <canvas :id="id"></canvas>
  </div>
</template>
