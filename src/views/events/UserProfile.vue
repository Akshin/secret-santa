<script setup lang="ts">
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
import AppUserAvatar from "@/components/app/AppUserAvatar/AppUserAvatar.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import Button from "@/components/ui/Button/Button.vue";
import FieldText from "@/components/ui/fields/fields/FieldText/FieldText.vue";
import { useDI } from "@/composables/useUI";
import { useUserIcons } from "@/composables/useUserIcons";
import { useValidation } from "@/composables/useValidation";
import router from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { useCommonStore } from "@/stores/common.store";
import type { IUser } from "@/types/system";
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { Carousel, Slide } from "vue3-carousel";

const store = useCommonStore();
const storeAuth = useAuthStore();
const { getUniqueUserIconAndName, ICON_KEYS_NUMBER } = useUserIcons();
const { validateEmail } = useValidation();
const DI = useDI();
const route = useRoute();

const routeQuery = route.query;
const eventId: string | null = (routeQuery.eventId as string) || null;
const isNewUser: boolean = !store.user.user_name;
const btnText: string = isNewUser ? "Продолжить" : "Сохранить";

const formData = reactive({
  name: "",
  email: "",
  icon: 0
});

if (isNewUser) {
  const { usericon } = getUniqueUserIconAndName(store.eventCardsAll);
  formData.icon = usericon;
} else {
  formData.name = store.user.user_name || "";
  formData.email = store.user.email || "";
  formData.icon = store.user.user_icon || 0;
}

const formIsValid = computed<boolean>(() => Boolean(formData.name));

function save() {
  const { access, message } = validateEmail(formData.email as string);
  if (!access) {
    return DI?.alert({
      type: "danger",
      text: message
    });
  }

  const payload: IUser = {
    email: formData.email,
    user_name: formData.name,
    user_icon: formData.icon
  };

  store
    .updateUser(payload)
    .then(() => {
      DI?.alert({
        type: "success",
        text: "Данные сохранены"
      });
      if (eventId) {
        router.push({ name: "EventCardWish", params: { eventId } });
      } else if (isNewUser) {
        router.push({ name: "eventCreate" });
      } else {
        router.push({ name: "eventList" });
      }
    })
    .catch(
      () =>
        DI?.alert({
          type: "danger",
          text: "Данные не сохранены"
        })
    );
}
</script>

<template>
  <div class="user-profile-wrapper container">
    <AppHeader :right-text="btnText" @right-clicked="save" :disabled-action="!formIsValid" />
    <Carousel
      :itemsToShow="3.95"
      :wrapAround="true"
      :transition="500"
      v-model="formData.icon"
      class="mb"
    >
      <Slide v-for="icon in ICON_KEYS_NUMBER" :key="icon">
        <AppUserAvatar
          :icon="icon"
          :size="104"
          :selected="formData.icon === icon"
          @click="formData.icon = icon"
        />
      </Slide>
    </Carousel>
    <div class="p">
      <FieldText
        label="Как вас зовут"
        placeholder="Иван Иванов"
        v-model.trim="formData.name"
        class="mb"
      />
      <FieldText
        label="Ваша почта"
        placeholder="ivan@domain.ru"
        v-model.trim="formData.email"
        class="mb"
      />
      <Button @click="save" class="center" :disabled="!formIsValid" v-if="isNewUser">
        {{ btnText }}
      </Button>
      <p v-else @click="storeAuth.logout" class="logout-btn text-5">Выйти из аккаунта</p>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.logout-btn {
  color: var(--red);
  margin: 42px auto;
  text-align: center;
}
</style>
