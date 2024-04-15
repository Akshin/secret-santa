<script setup lang="ts">
import { useCommonStore } from "@/stores/common.store";
import { useRoute, useRouter } from "vue-router";

const commonStore = useCommonStore();
const route = useRoute();
const router = useRouter();

const eventId: string | string[] = route.params?.eventId;

if (!eventId || typeof eventId !== "string") {
  router.push({ name: "eventCreate" });
} else {
  commonStore.setCurrentEventId(eventId);
  if (!commonStore.myCurrentEventCard) {
    router.push({ name: "eventCreate" });
  }
}
</script>

<template>
  <RouterView />
</template>
