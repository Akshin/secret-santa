<script setup lang="ts">
import QrCode from "@/components/ui/QrCode/QrCode.vue";
import type { IFieldQrCodeProps } from "@/types";
import FieldWrapper from "../../components/FieldWrapper.vue";

import { FIELD_QR_CODE as CL } from "@/classes";

const props = withDefaults(defineProps<IFieldQrCodeProps>(), {
  settings: { color: "#000" } as any
});
</script>

<template>
  <FieldWrapper v-bind="props" :class="CL.WRAPPER">
    <QrCode :text="modelValue" :class="CL.WRAPPER_INPUT" :color="settings?.color" />
  </FieldWrapper>
</template>
