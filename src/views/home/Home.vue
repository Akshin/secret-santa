<script setup lang="ts">
import AppHeader from "@/components/app/AppHeader/AppHeader.vue";
// import Button from "@/components/ui/Button/Button.vue";
import AppFooterHelper from "@/components/app/AppFooterHelper/AppFooterHelper.vue";
import Footer from "@/components/layouts/Footer/Footer.vue";
import { TokenService } from "@/services";
import { useRouter } from "vue-router";

const router = useRouter();

const tokenExists: boolean = !!TokenService.getToken();

function login() {
  if (tokenExists) {
    router.push({ name: "lkBase" });
  } else {
    router.push({ name: "login" });
  }
}

function createEvent() {
  if (tokenExists) {
    router.push({ name: "eventCreate" });
  } else {
    router.push({ name: "login" });
  }
}
</script>

<template>
  <div class="home-wrapper container">
    <AppHeader disable-back right-text="Войти" @rightClicked="login">
      <template #left>
        <img src="@/assets/megamarket.png" class="megamarket-title text-2" />
      </template>
    </AppHeader>
    <div class="p">
      <h2 class="home-title">
        Обменивайтесь новогодними подарками со скидкой до <span>1 000 ₽</span>
      </h2>
      <div class="dialog-wrapper">
        <p class="dialog-title text-6">
          Играйте с коллегами,<br />
          друзьями и семьей! <br />
          Только тссс...
        </p>
        <p class="dialog-subtitle text-6">Секретный Дед Мороз</p>
        <img src="@/assets/santa-circle.png" class="santa-img" />
        <img src="@/assets/pip.png" class="pip-img" />
      </div>
    </div>
    <img src="@/assets/home-bg.png" class="home-bg" />
    <div class="p">
      <h3 class="card-title text-3">Как это работает</h3>
      <div class="home-card">
        <h4 class="home-card-title text-4">Создайте праздник</h4>
        <p class="home-card-subtitle text-6">Всего за пару кликов</p>
        <img src="@/assets/home-card-1.png" />
      </div>
      <div class="home-card">
        <h4 class="home-card-title text-4">Пригласите друзей</h4>
        <p class="home-card-subtitle text-6">
          Поделитесь ссылкой <br />
          на праздник с друзьями
        </p>
        <img src="@/assets/home-card-2.png" />
      </div>
      <div class="home-card">
        <h4 class="home-card-title text-4">Проведите жеребъевку</h4>
        <p class="home-card-subtitle text-6">
          У каждого будет <br />
          секретный Дед Мороз
        </p>
        <img src="@/assets/home-card-3.png" />
      </div>
      <div class="home-card">
        <h4 class="home-card-title text-4">
          Купите подарок <br />с выгодой до 20% <br />
          на Мегамаркете
        </h4>
        <p class="home-card-subtitle text-6">
          Каждый получит <br />
          промокод на скидку
        </p>
        <img src="@/assets/home-card-4.png" />
      </div>
      <div class="home-card">
        <h4 class="home-card-title text-4">Соберитесь вместе</h4>
        <p class="home-card-subtitle text-6">
          И обменяйтесь <br />
          подарками
        </p>
        <img src="@/assets/home-card-5.png" />
      </div>
    </div>

    <Footer />
    <AppFooterHelper btn-text="Создать праздник" @btn-clicked="createEvent" />
  </div>
</template>

<style lang="scss" scoped>
.temp {
  position: sticky;
  bottom: 0;
}
.home-wrapper {
  .megamarket-title {
    position: relative;
    top: 2px;
    display: block;
    width: 136px;
  }
  .app-header-wrapper {
    background: var(--grey);
    margin-bottom: 24px;
  }
  .home-title {
    margin-bottom: 24px;
    span {
      text-wrap: nowrap;
    }
  }
  .dialog-wrapper {
    padding: 20px 24px;
    background: var(--grey);
    border-radius: 32px 32px 0px 32px;
    position: relative;
    width: 65%;
    margin-bottom: 42px;
    .dialog-title {
      margin-bottom: 4px;
    }
    .dialog-subtitle {
      color: var(--text-lighter);
    }
    .santa-img {
      position: absolute;
      width: 80px;
      bottom: 0;
      right: -90px;
    }
    .pip-img {
      position: absolute;
      bottom: 0;
      right: -15px;
    }
  }
  .home-bg {
    width: 100%;
    margin-bottom: 42px;
  }
  .card-title {
    margin-bottom: 16px;
  }
  .home-card {
    border-radius: 24px;
    background: var(--grey);
    padding: 18px;
    position: relative;
    margin-bottom: 16px;
    height: 166px;
    .home-card-title {
      margin-bottom: 8px;
    }
    .home-card-subtitle {
      color: var(--text-lighter);
      line-height: 20px;
    }
    img {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
    }
  }
  .footer-wrapper {
    margin-bottom: $FOOTER_MARGIN_BTN;
  }
}
</style>
