<script setup lang="ts">
import { FORM_SIMPLE as CL } from "@/classes";
import Button from "@/components/ui/Button/Button.vue";
import FieldCreator from "@/components/ui/fields/FieldCreator.vue";
import { useForm } from "@/composables/useForm";
import type { IFormEmits, IFormSimpleProps } from "@/types";
import FormArgeement from "./components/FormArgeement.vue";

const props = withDefaults(defineProps<IFormSimpleProps>(), { fields: () => [] });
const emits = defineEmits<IFormEmits>();
const { formData, formIsInvalid, errors, agreement } = useForm(props);

defineExpose({ formData });
</script>

<template>
  <div :class="CL.WRAPPER">
    <h2 v-if="title" :class="CL.WRAPPER_TITLE">{{ title }}</h2>
    <div class="row">
      <div
        v-for="(fieldName, i) in fields"
        v-show="fieldSettings[fieldName].visible"
        :key="i"
        :class="'col-' + fieldSettings[fieldName].grid"
        class="column"
      >
        <FieldCreator
          v-model.trim="formData[fieldName]"
          v-bind="fieldSettings[fieldName]"
          :errors="errors[fieldName] || []"
          @blur="emits('blur', $event)"
          @attachmentDelete="emits('attachmentDelete', $event)"
          @attachmentAppend="emits('attachmentAppend', $event)"
        />
      </div>
    </div>

    <FormArgeement v-if="agreementLink" :agreementLink="agreementLink" :agreement="agreement" />

    <Button
      v-if="btnSubmitText"
      :disabled="formIsInvalid"
      :class="CL.WRAPPER_SUBMIT_BTN"
      @click="emits('save', formData)"
    >
      {{ btnSubmitText }}
    </Button>
  </div>
</template>
