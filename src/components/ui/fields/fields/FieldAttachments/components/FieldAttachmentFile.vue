<script setup lang="ts">
import Avatar from "@/components/ui/Avatar/Avatar.vue";
import Icon from "@/components/ui/Icon/Icon.vue";

import { computed, onMounted, shallowRef } from "vue";
import type { IFieldAttachmentViwerProps, IFieldAttachmentViwerEmits } from "@/types";
import { FIELD_ATTACHMENTS_VIEWER as CL } from "@/classes";

const props = withDefaults(defineProps<IFieldAttachmentViwerProps>(), {
  url: "",
  name: "",
  user: () => ({}),
  loading: false,
  disabled: false
});
const emits = defineEmits<IFieldAttachmentViwerEmits>();

const loadingClass = shallowRef<boolean>(false);
onMounted(() => {
  if (props.loading) {
    setTimeout(() => (loadingClass.value = true), 100);
  }
});

const fileExtention = computed<string>(() => {
  const suffix = props.name.split(".");
  if (!suffix.length) return "";
  return suffix[suffix.length - 1];
});

const reImage = /image|jpeg|jpg|svg|png/i;
const isImage = computed<boolean>(() => {
  const catched = fileExtention.value.match(reImage);
  return !!(catched && catched.length);
});

const imageSrc = computed<string>(() => {
  if (!isImage.value) return "";

  return props.url;
});
</script>

<template>
  <div :class="CL.WRAPPER">
    <div :class="CL.WRAPPER_FILEBAR">
      <Icon v-if="loading" name="loader" />
      <div
        v-else
        :class="CL.WRAPPER_FILEBAR_IMAGE"
        :style="{ backgroundImage: `url('${imageSrc}')` }"
        @click="emits('filebarClick')"
      >
        <span v-if="!isImage" :class="CL.WRAPPER_FILEBAR_IMAGE_EXT"> {{ fileExtention }} </span>
      </div>
    </div>
    <div :class="CL.WRAPPER_CONTENT">
      <div :class="CL.WRAPPER_CONTENT_TITLE" @click="emits('titleClick')">{{ name }}</div>
      <div :class="CL.WRAPPER_CONTENT_SUBTITLE">
        <div
          v-if="loading"
          :class="[CL.WRAPPER_CONTENT_SUBTITLE_LINELOADER, { loading: loadingClass }]"
        ></div>
        <template v-else>
          <Avatar v-if="user.logo" :src="user.logo" />
          <div :class="CL.WRAPPER_CONTENT_SUBTITLE_TEXT">{{ user.full_name }}</div>
        </template>
      </div>
    </div>
    <div v-if="!loading" :class="CL.WRAPPER_ICONS">
      <Icon name="download" :class="CL.WRAPPER_ICONS_DOWNLOAD" @click="emits('download')" />
      <Icon
        v-if="!disabled"
        name="trash"
        :class="CL.WRAPPER_ICONS_REMOVE"
        @click="emits('remove')"
      />
    </div>
  </div>
</template>
