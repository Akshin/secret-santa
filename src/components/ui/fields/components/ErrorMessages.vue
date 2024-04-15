<script setup lang="ts">
import { FIELDS_ERROR_MESSAGES as CL } from "@/classes";
import type { IFieldErrorMessagesProps } from "@/types";

withDefaults(defineProps<IFieldErrorMessagesProps>(), { errors: () => [] });
</script>

<template>
  <div :class="CL.WRAPPER">
    <span v-for="error in errors" :key="error"> {{ error }} </span>
  </div>
</template>
