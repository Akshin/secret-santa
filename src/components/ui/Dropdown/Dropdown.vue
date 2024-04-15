<script setup lang="ts">
import { DROPDOWN as CL } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";
import type { IDropdownEmits, IDropdownProps } from "@/types";
import { ref, shallowReactive } from "vue";

defineProps<IDropdownProps>();
const emits = defineEmits<IDropdownEmits>();

const opened = ref<boolean>(false);

const style = shallowReactive<any>({
  left: 0,
  top: 0
});

function open(e: MouseEvent): void {
  const { clientX, clientY } = e;
  style.left = clientX + "px";
  style.top = clientY + "px";

  opened.value = true;
}

function close(): void {
  opened.value = false;
}
</script>

<template>
  <div :class="CL.WRAPPER" @click="open">
    <slot></slot>
    <div v-show="opened" :class="CL.WRAPPER_CONTAINER" @click.stop="close">
      <div :class="CL.WRAPPER_CONTAINER_CONTENT" :style="style">
        <div
          v-for="(option, i) in options"
          :key="i"
          :class="CL.WRAPPER_CONTAINER_CONTENT_OPTION"
          @click="emits('optionClick', option)"
        >
          <div v-if="option.icon" :class="CL.WRAPPER_CONTAINER_CONTENT_OPTION_ICON">
            <Icon :name="option.icon" />
          </div>
          <div v-if="option.text" :class="CL.WRAPPER_CONTAINER_CONTENT_OPTION_TEXT">
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
