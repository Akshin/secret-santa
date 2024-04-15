<script setup lang="ts"></script>

<template>
  <div class="footer-wrapper">
    <div class="footer-container container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: $FOOTER_HIGHT;
  background: var(--white);
  box-shadow: 0px 10px 20px rgba(230, 230, 230, 0.25);
  transition: var(--transition);
  z-index: 2;
  .footer-container {
    height: 100%;
    width: 100%;
    position: relative;
    padding-top: $LAYOUT_PADDING_Y;
    padding-bottom: $LAYOUT_PADDING_Y;
  }
}
</style>
