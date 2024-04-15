<script setup lang="ts">
import { appSettings } from "@/settings";
import { useCommonStore } from "@/stores/common.store";
import type { IGameData } from "@/types/system";
// import { getUrl } from "@/utils/getUrl";
import { windowOpen } from "@/utils/windowOpen";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const storeCommon = useCommonStore();
const src = appSettings.gameUrl;
// const gameOrigin = getUrl(src, "origin");

async function receiveMessage(e: MessageEvent) {
  const data: IGameData = e.data;

  if (data?.message === "close_game") {
    router.push({ name: "EventCardMain", params: { eventId: storeCommon.currentEventId } });
    return;
  }

  if (data?.message === "game_finished") {
    await storeCommon.updateGameScore({ game_score: data.score || 0 });
    await storeCommon.getAllEventCards();
    return;
  }

  if (data?.message === "referal") {
    windowOpen(appSettings.referalUrl, true);
    sendEvent();
    return;
  }
}

function sendEvent() {
  storeCommon.postEvent("referal_link_clicked", {
    from: "game",
    holiday_id: storeCommon.currentEventId
  });
}

onMounted(() => {
  window.addEventListener("message", receiveMessage, false);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", receiveMessage, false);
});
</script>

<template>
  <div class="game-wrapper">
    <iframe :src="src" frameborder="0" class="game-frame"></iframe>
  </div>
</template>

<style lang="scss" scoped>
.game-wrapper {
  .game-frame {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: var(--grey);
  }
}
</style>
