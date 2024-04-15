<script setup lang="ts">
import Modal from "@/components/ui/Modal/Modal.vue";
import { ref } from "vue";

const $modal = ref<InstanceType<typeof Modal> | null>(null);
</script>

<template>
  <div class="footer-wrapper p">
    <a class="text-7" @click="$modal?.open()">Связаться с нами</a>
    <a
      class="text-7"
      href="https://megamarket.ru/docs/usloviya-ispolzovaniya-sajta-secretded/"
      target="_blank"
      >Условия использования сайта</a
    >
    <a
      class="text-7"
      href="https://megamarket.ru/docs/politika-obrabotki-personalnyh-dannyh-secretded/"
      target="_blank"
      >Политика обработки персональных данных</a
    >
    <hr />
    <p class="text-7">© 2023 «Маркетплейс»</p>

    <Modal ref="$modal" class="container">
      <div class="modal-container">
        <h3 class="text-3 mb">Связаться с нами</h3>
        <span class="text-4">Не работает промокод или не приходит код из SMS? </span>
        <p class="text-6 mb">
          Обратитесь в службу поддержки Мегамаркет по номеру:
          <a href="tel:+78006000888">+7 800 600-08-88</a>
        </p>
        <span class="text-4">Не работает сайт?</span>
        <p class="text-6">
          Напиши нам на почту: <a href="mailto: support@secretded.ru">support@secretded.ru</a>
        </p>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  position: relative;
  border-top: 1px solid var(--grey);
  margin-top: 42px;
  & > a {
    text-decoration: none;
  }
  & > a,
  & > p {
    display: flex;
    align-items: center;
    height: 34px;
    color: var(--text-lighter);
    cursor: pointer;
  }
  hr {
    border: 1px solid var(--grey);
  }
  .modal-container {
    h3 {
      text-align: center;
    }
    span {
      color: var(--text-lighter);
      line-height: 24px;
      margin-bottom: 4px;
    }
    p {
      a {
        color: var(--primary-1);
        text-wrap: nowrap;
      }
    }
  }
}
</style>
