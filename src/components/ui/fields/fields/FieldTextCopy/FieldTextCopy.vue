<script setup lang="ts">
import type { IFieldCopyProps } from "@/types";
import { copy } from "@/utils/copy";
import FieldWrapper from "../../components/FieldWrapper.vue";

import { FIELD_TEXT_COPY as CL } from "@/classes";
import { computed, ref } from "vue";

const props = withDefaults(defineProps<IFieldCopyProps>(), {
  placeholder: "",
  label: "",
  name: ""
});

const focused = ref<boolean>(false);
const iconName = computed(() => (focused.value ? "check" : "copy"));

function onFocus(e: any) {
  e.target.select();
  copy(props.modelValue);
  focused.value = true;
  setTimeout(() => (focused.value = false), 2000);
}
</script>

<template>
  <FieldWrapper v-slot="{ id }" v-bind="props" :class="CL.WRAPPER" :appendIcon="iconName">
    <input
      :id="id"
      :class="CL.WRAPPER_INPUT"
      readonly
      :value="modelValue"
      type="text"
      :name="name"
      :placeholder="placeholder"
      @focus="onFocus"
    />
  </FieldWrapper>
</template>
