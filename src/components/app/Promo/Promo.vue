<script setup lang="ts">
import Button from "@/components/ui/Button/Button.vue";
import { useDI } from "@/composables/useUI";
import type { IPromoProps } from "@/types/system";
import { copy } from "@/utils/copy";
import { windowOpen } from "@/utils/windowOpen";

const props = withDefaults(defineProps<IPromoProps>(), {
  title: "Промокод на скидку:"
});
const DI = useDI();

const subtitleDefault: string = "Ждём третьего";

function copyPromo() {
  if (!props.title) return;
  copy(props.title);
  DI?.alert({ type: "success", text: "Промокод скопирован" });
}

function openInfo() {
  windowOpen("https://megamarket.ru/promo/pravila-akcii-promokod-sekretnyj-ded-moroz/", true);
}
</script>

<template>
  <div class="promo-wrapper">
    <p class="block-title text-4">Промокод на скидку в Мегамаркете</p>
    <p class="block-subtitle text-6">Дарите подарки с выгодой!</p>
    <img src="@/assets/promo-image.png" class="promo-image" />
    <Button @click="copyPromo" class="center" append-icon="copy">
      {{ title || subtitleDefault }}
    </Button>
    <div class="promo-info text-8">
      Организатор акции ООО «‎МАРКЕТПЛЕЙС»‎. Срок проведения акции с 01.12.2023 по 31.01.2024.
      Действие промокода может быть ограничено. Подробнее об организаторе, ограничениях акции и
      правилах ее проведения:
      <a
        href="https://megamarket.ru/promo/pravila-akcii-promokod-sekretnyj-ded-moroz/"
        target="_blank"
        >ссылка</a
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo-wrapper {
  padding: 18px;
  border-radius: 24px;
  background: var(--grey);
  position: relative;
  .block-title {
    max-width: 55%;
    margin-bottom: 8px;
    line-height: 24px;
  }
  .block-subtitle {
    color: var(--text-lighter);
    margin-bottom: 18px;
  }
  .promo-image {
    width: 112px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .button-wrapper {
    margin-bottom: 18px;
  }
  .button-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .icon-wrapper {
      position: absolute;
      right: 0;
    }
  }
  .promo-info {
    color: var(--text-lighter);
    a {
      color: var(--primary-1);
    }
  }
}
</style>
