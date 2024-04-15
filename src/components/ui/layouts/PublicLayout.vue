<script setup lang="ts">
import Alert from "@/components/ui/Alert/Alert.vue";
import { RouterView } from "vue-router";
import AppContent from "./components/AppContent/AppContent.vue";
</script>

<template>
  <AppContent>
    <RouterView />
    <Alert />
  </AppContent>
</template>
