<script setup lang="ts">
import type { IFormAgreementProps } from "@/types";
defineProps<IFormAgreementProps>();
</script>

<template>
  <p class="form-agreement-wrapper">
    {{ agreement?.before }}
    <a :href="agreementLink" target="_blank" class="form-agreement-link">
      {{ agreement?.link }}
    </a>
    {{ agreement?.after }}
  </p>
</template>
