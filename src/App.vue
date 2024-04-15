<script setup lang="ts">
import { RouterView } from "vue-router";
import { registerUI } from "./composables/useUI";

registerUI({
  localization: { current: "ru" },
  localize: (text) => text
});
</script>

<template>
  <RouterView />
</template>
