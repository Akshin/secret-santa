<script setup lang="ts">
import { download } from "@/utils/download";
import { uuid4 } from "@/utils/uuid";
import { windowOpen } from "@/utils/windowOpen";
import { computed, ref, watch } from "vue";
import type { IFieldAttachmentProps, IFieldAttachmentEmits, IFieldAttachmentFile } from "@/types";
import FieldAttachmentFile from "./components/FieldAttachmentFile.vue";
import { TEXT } from "@/text";
import { FIELD_ATTACHMENTS as CL } from "@/classes";
import Icon from "@/components/ui/Icon/Icon.vue";

const props = withDefaults(defineProps<IFieldAttachmentProps>(), {
  readonly: false,
  disabled: false,
  clearable: false,
  loading: false,
  errors: () => [],
  placeholder: "",
  label: "",
  loaderText: TEXT.FIELDS_ATTACHMENTS_LOADER,
  showMoreText: TEXT.FIELDS_ATTACHMENTS_SHOW_MORE,
  showLessText: TEXT.FIELDS_ATTACHMENTS_SHOW_LESS
});
const emits = defineEmits<IFieldAttachmentEmits>();

const id = "attach_" + uuid4();
const showMore = ref<boolean>(false);
const temporaryUploadedFiles = ref<IFieldAttachmentFile[]>([]);
const attachments = computed<IFieldAttachmentFile[]>(() => {
  if (!props.modelValue) return [];

  const files = props.modelValue.slice().reverse();
  return showMore.value ? files : files.slice(0, 3);
});

function onChange(e: any): void {
  const files = e.target.files;
  Array.prototype.forEach.call(files, (file) => temporaryUploadedFiles.value.push(file));
  emits("attachmentAppend", files);
}

watch(attachments, () => (temporaryUploadedFiles.value = []), { deep: true });
</script>

<template>
  <div :class="[CL.WRAPPER, { disabled, readonly }]">
    <label v-if="label" :class="CL.WRAPPER_LABEL" :for="id"> {{ label }} </label>
    <div :class="CL.WRAPPER_CONTAINER">
      <!-- uploader  -->
      <input
        v-show="false"
        :id="id"
        type="file"
        multiple
        :disabled="disabled || readonly"
        @change="onChange"
      />
      <label v-if="!disabled && !readonly" :class="CL.WRAPPER_CONTAINER_LABEL" :for="id">
        <div :class="CL.WRAPPER_CONTAINER_LABEL_INNER">
          <Icon name="plus" />
          <div :class="CL.WRAPPER_CONTAINER_LABEL_INNER_TEXT">{{ loaderText }}</div>
        </div>
      </label>
      <!-- uploaded files  -->
      <div v-if="modelValue.length" :class="CL.WRAPPER_CONTAINER_VIEWER">
        <FieldAttachmentFile
          v-for="(file, i) in temporaryUploadedFiles"
          :key="i"
          :name="file.name"
          loading
        />
        <FieldAttachmentFile
          v-for="(file, i) in attachments"
          :key="i"
          :url="file.url"
          :name="file.name"
          :user="file.user"
          :loading="false"
          :disabled="disabled || readonly"
          @titleClick="windowOpen(file.url, true)"
          @filebarClick="windowOpen(file.url, true)"
          @download="download(file.url, file.name)"
          @remove="emits('attachmentDelete', file)"
        />
        <span :class="CL.WRAPPER_CONTAINER_VIEWER_SHOW_MORE" @click="showMore = !showMore">
          {{ showMore ? showLessText : showMoreText }}
        </span>
      </div>
    </div>
  </div>
</template>
