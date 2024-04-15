<script setup lang="ts">
// import Icon from "@/components/ui/Icon/Icon.vue";
import FieldText from "@/components/ui/fields/fields/FieldText/FieldText.vue";
import { useCommonStore } from "@/stores/common.store";
import type { ICaptchaEmits, ICaptchaProps } from "@/types/system";
import { onBeforeMount, ref } from "vue";

const props = withDefaults(defineProps<ICaptchaProps>(), { phone: "" });
const emits = defineEmits<ICaptchaEmits>();
const commonStore = useCommonStore();

const ERROR_MESSAGE = "Загружаем капчу 00:";
const src = ref<string>("");
const isAllowedSendSms = ref<boolean>(false);
const $FieldText = ref();
const errorMessage = ref<string>("");

let timer: any = null;
function countError(sec: number) {
  isAllowedSendSms.value = false;
  let count = sec;
  timer = setInterval(() => {
    if (count <= 0) {
      clearInterval(timer);
      timer = null;
      isAllowedSendSms.value = true;
      getCaptcha();
      errorMessage.value = "";
      return;
    }
    count--;
    let _count = count < 10 ? `0${count}` : count;
    const message = `${ERROR_MESSAGE}${_count}`;
    errorMessage.value = message;
  }, 1000);
}

function getCaptcha() {
  return commonStore
    .getCaptcha(props.phone)
    .then((resp) => {
      src.value = URL.createObjectURL(resp);
      isAllowedSendSms.value = true;
      emits("accpeted");
    })
    .catch((e) => {
      emits("disabled");
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const errorData = reader.result;
          const data = JSON.parse(errorData as string);
          const detail = data.detail;
          countError(Number(detail));
        } catch {}
      };

      reader.readAsText(e.response.data);
    });
}

function onInput(e: any) {
  emits("update:modelValue", e);
}

onBeforeMount(async () => {
  await getCaptcha();
});

function focus() {
  $FieldText.value?.focus();
}

defineExpose({ focus });
</script>

<template>
  <div class="captcha-wrapper">
    <div class="captcha-image-block">
      <img :src="src" v-if="src" />
      <span v-else-if="errorMessage"> {{ errorMessage }} </span>
    </div>
    <div class="captcha-container" v-if="isAllowedSendSms">
      <FieldText
        ref="$FieldText"
        @update:modelValue="onInput"
        :modelValue="modelValue"
        placeholder="Введите текст"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.captcha-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  .captcha-image-block {
    width: 100%;
    height: 135px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--grey);
    border-radius: 24px;
    margin-bottom: 24px;
    img {
      max-width: 95%;
    }
    span {
      color: var(--text-lighter);
    }
  }
  .captcha-container {
    width: 100%;
  }
}
</style>
