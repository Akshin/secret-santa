<script setup lang="ts">
import Icon from "@/components/ui/Icon/Icon.vue";
import { useBackRoute } from "@/composables/useBackRoute";
import type { IAppHeadeProps, IAppHeaderEmits } from "@/types/system";
import { useSlots } from "vue";

const props = defineProps<IAppHeadeProps>();
const emits = defineEmits<IAppHeaderEmits>();
const slots = useSlots();

const { back } = useBackRoute();

function _back() {
  if (props.disableBack) return emits("leftClicked");

  back();
}

function rightClick() {
  if (props.disabledAction) return;
  emits("rightClicked");
}
</script>

<template>
  <div class="app-header-wrapper p">
    <div class="app-header-left-block" @click="_back">
      <slot name="left" v-if="slots.left"></slot>
      <Icon name="back" v-else class="back-icon-wrapper" />
    </div>
    <div class="app-header-right-block" @click="rightClick">
      <slot name="right" v-if="slots.right"></slot>
      <p v-else-if="rightText" :class="['right-text-wrapper text-5', { disabled: disabledAction }]">
        {{ rightText }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header-wrapper {
  position: sticky;
  top: 0;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  background: #fff;
  .app-header-left-block {
    .back-icon-wrapper {
    }
  }
  .app-header-right-block {
    .right-text-wrapper {
      color: var(--primary-1);
      cursor: pointer;
      &.disabled {
        color: var(--primary-2);
      }
    }
  }
}
</style>
