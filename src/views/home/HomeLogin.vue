<script setup lang="ts">
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import Captcha from "@/components/app/Captcha/CaptchaNew.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import Button from "@/components/ui/Button/Button.vue";
import Checkbox from "@/components/ui/Checkbox/Checkbox.vue";
import FieldPhone from "@/components/ui/fields/fields/FieldPhone/FieldPhone.vue";
import FieldText from "@/components/ui/fields/fields/FieldText/FieldText.vue";
import { useDI } from "@/composables/useUI";
import { MetrikaSerice, TokenService } from "@/services";
import { appSettings } from "@/settings";
import { useAuthStore } from "@/stores/auth.store";
import { useCommonStore } from "@/stores/common.store";
import type { IEventCard } from "@/types/system";
import { computed, nextTick, ref, watch } from "vue";
import type { LocationQueryValue } from "vue-router";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const storeAuth = useAuthStore();
const storeCommon = useCommonStore();
const DI = useDI();

const routeQuery = route.query;
const token: LocationQueryValue | LocationQueryValue[] = routeQuery[appSettings.tokenPrefix];
const isTokenExists: boolean = typeof token === "string" && Boolean(token.length);
const initLoaded = ref<boolean>(false);
const titleMain = ref<string>("Введите номер, чтобы войти");
const isAuthtorized: boolean = !!TokenService.getToken();

const step = ref<number>(1);
const isPrivacyChecked = ref<boolean>(true);
const accept_mm_communication = ref<boolean>(false);
const loading = ref<boolean>(false);
const captchaToken = ref<string>("");
const isAllowedSendSms = ref<boolean>(false);

const phone = ref<string>("");
const phoneNumber = computed<string>(() => phone.value.replace(/[^0-9+]/g, ""));
const code = ref<string>("");
const isPhoneValid = computed<boolean>(() => phoneNumber.value.length >= 12);
const $FieldCode = ref<InstanceType<typeof FieldText> | null>(null);
const $Captcha = ref<InstanceType<typeof Captcha> | null>(null);

if (isTokenExists && isAuthtorized) {
  join();
}

function join() {
  storeCommon
    .eventJoin(token as string)
    .then((data: IEventCard) => {
      router.push({ name: "lkBase", query: { eventId: data.holiday_id } });
      MetrikaSerice.sendGoal("user_joined_party");
    })
    .catch((e) => {
      if (e.response?.data?.detail === "user already joined") {
        DI?.alert({
          type: "danger",
          text: "Пользователь уже участвует в празднике"
        });
      } else {
        DI?.alert({
          type: "danger",
          text: "Не удалось присоедениться к празднику"
        });
      }
      setTimeout(() => router.push({ name: "lkBase" }), 2000);
    });
}

function login() {
  storeAuth.logout(false);

  loading.value = true;
  const payload = {
    phone: phoneNumber.value,
    code: code.value,
    accept_privacy: true,
    accept_mm_communication: accept_mm_communication.value
  };

  storeAuth
    .login(payload)
    .then(() => {
      if (!isTokenExists) return router.push({ name: "lkBase" });
      join();
    })
    .catch(() => {
      DI?.alert({
        type: "danger",
        text: "Не удалось авторизоваться. Неверный код"
      });
      code.value = "";
    })
    .finally(() => {
      code.value = "";
      loading.value = false;
    });
}

async function verifyPhone() {
  storeAuth
    .sendPhone({ phone: phoneNumber.value, token: captchaToken.value })
    .then(async () => {
      step.value = 3;
      await nextTick();
      $FieldCode.value?.focus();
    })
    .catch(() => {
      DI?.alert({
        type: "danger",
        text: "Неверный код"
      });
      captchaToken.value = "";
    });
}

function back() {
  if (step.value > 1) {
    step.value--;
  } else {
    router.go(-1);
  }
}

async function onBtn() {
  if (step.value === 1) {
    step.value = 2;
    await nextTick();
    $Captcha.value?.focus();
  } else if (step.value === 2) {
    verifyPhone();
  } else {
    login();
  }
}

watch(code, (v) => {
  if (v.length === 6) login();
});

if (token && typeof token === "string") {
  storeCommon
    .getEventByToken(token)
    .then((resp) => {
      titleMain.value = `Войдите, чтобы участвовать в празднике «${resp.name}»`;
    })
    .finally(() => (initLoaded.value = true));
} else {
  initLoaded.value = true;
}
</script>

<template>
  <div class="login-wrapper container">
    <AppHeader disableBack @left-clicked="back" />
    <div class="p">
      <!--  step 1  -->
      <div class="login-block-1" v-show="step === 1">
        <h2 class="login-header text-2" v-if="initLoaded">{{ titleMain }}</h2>
        <FieldPhone v-model.trim="phone" placeholder="+7 (999) 999-99-99" />
        <Checkbox v-model="isPrivacyChecked">
          <div class="ch-content">
            Я соглашаюсь с
            <a
              target="_blank"
              href="https://megamarket.ru/docs/politika-obrabotki-personalnyh-dannyh-secretded/"
              >Условиями использования сайта</a
            >
            и
            <a
              target="_blank"
              href="https://megamarket.ru/docs/usloviya-ispolzovaniya-sajta-secretded/"
              >Политикой обработки персональных данных</a
            >
          </div>
        </Checkbox>
        <Checkbox v-model="accept_mm_communication">
          <div class="ch-content">
            Получать
            <a target="_blank" href="https://megamarket.ru/info/policy_agreement/"
              >информацию о скидках, специальных предложениях и акциях</a
            >
          </div>
        </Checkbox>
        <Button
          @click="onBtn"
          :disabled="!isPhoneValid || loading || !isPrivacyChecked"
          class="submit-btn"
        >
          Получить код
        </Button>
      </div>
      <!--  step 2  -->
      <div class="login-block-2" v-if="step === 2">
        <h2 class="login-header text-2">Введите символы как на картинке</h2>

        <Captcha
          v-model.trim="captchaToken"
          :phone="phoneNumber"
          ref="$Captcha"
          @accpeted="isAllowedSendSms = true"
          @disabled="isAllowedSendSms = false"
        />
        <Button @click="onBtn" :disabled="!captchaToken || !isAllowedSendSms" class="submit-btn">
          Продолжить
        </Button>
      </div>
      <!--  step 3  -->
      <div class="login-block-3" v-if="step === 3">
        <h2 class="login-header text-2">Введите код из SMS</h2>
        <p class="login-subheader text-6">
          Мы отправили шестизначный код на телефон <span>{{ phone }}</span>
        </p>
        <FieldText
          v-model.trim="code"
          ref="$FieldCode"
          placeholder="000000"
          :settings="{ mask: '######' }"
          :readonly="loading"
        />
        <Button @click="onBtn" :disabled="!code" class="submit-btn"> Войти </Button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
  .app-header-wrapper {
    margin-bottom: 24px;
  }
  .login-block-1,
  .login-block-2,
  .login-block-3 {
    h2 {
      margin-bottom: 24px;
    }
    .submit-btn {
      margin: 0 auto;
    }
  }
  .login-block-1 {
    .field-phone-wrapper {
      margin-bottom: 24px;
    }
    .checkbox-wrapper {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 24px;
      }
    }
  }
  .login-block-3 {
    h2 {
      margin-bottom: 8px !important;
    }
    .login-subheader {
      margin-bottom: 24px;
      span {
        text-wrap: nowrap;
      }
    }
    .field-text-wrapper {
      margin-bottom: 24px;
    }
  }
}
</style>
