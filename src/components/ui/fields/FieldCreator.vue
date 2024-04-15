<script setup lang="ts">
import type { IFieldCreatorEmits } from "@/types";
import type { IFieldStructureFieldObjType } from "@/types/services";
import { computed, useAttrs } from "vue";
import { fieldTypes } from "./fieldTypes";

import FIeldJson from "@/components/ui/fields/fields/FIeldJson/FIeldJson.vue";
import FieldAddress from "@/components/ui/fields/fields/FieldAddress/FieldAddress.vue";
import FieldAttachments from "@/components/ui/fields/fields/FieldAttachments/FieldAttachments.vue";
import FieldCheckbox from "@/components/ui/fields/fields/FieldCheckbox/FieldCheckbox.vue";
import FieldCode from "@/components/ui/fields/fields/FieldCode/FieldCode.vue";
import FieldDatePicker from "@/components/ui/fields/fields/FieldDatePicker/FieldDatePicker.vue";
import FieldNumber from "@/components/ui/fields/fields/FieldNumber/FieldNumber.vue";
import FieldPhone from "@/components/ui/fields/fields/FieldPhone/FieldPhone.vue";
import FieldProgress from "@/components/ui/fields/fields/FieldProgress/FieldProgress.vue";
import FieldQrCode from "@/components/ui/fields/fields/FieldQrCode/FieldQrCode.vue";
import FieldRadio from "@/components/ui/fields/fields/FieldRadio/FieldRadio.vue";
import FieldSelect from "@/components/ui/fields/fields/FieldSelect/FieldSelect.vue";
import FieldSwitch from "@/components/ui/fields/fields/FieldSwitch/FieldSwitch.vue";
import FieldText from "@/components/ui/fields/fields/FieldText/FieldText.vue";
import FieldTextCopy from "@/components/ui/fields/fields/FieldTextCopy/FieldTextCopy.vue";
import FieldTextarea from "@/components/ui/fields/fields/FieldTextarea/FieldTextarea.vue";

const components: any = {
  FieldAddress,
  FieldAttachments,
  FieldCheckbox,
  FieldCode,
  FieldDatePicker,
  FIeldJson,
  FieldNumber,
  FieldPhone,
  FieldProgress,
  FieldRadio,
  FieldSelect,
  FieldSwitch,
  FieldText,
  FieldTextarea,
  FieldTextCopy,
  FieldQrCode
};

const emits = defineEmits<IFieldCreatorEmits>();
const attrs = useAttrs();

const componentIs = computed(() => {
  let componentIs = "";
  Object.entries(fieldTypes).forEach(([key, value]) => {
    if (value.includes(attrs.type as IFieldStructureFieldObjType)) componentIs = components[key];
  });
  return componentIs;
});
</script>

<template>
  <component
    :is="componentIs"
    v-bind="attrs"
    @update:modelValue="emits('update:modelValue', $event)"
    @blur="emits('blur', $event)"
    @attachmentDelete="emits('attachmentDelete', $event)"
    @attachmentAppend="emits('attachmentAppend', $event)"
  />
</template>
