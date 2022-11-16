<script setup lang="ts">
import UiContainer from '@/components/ui/UiContainer.vue'
</script>

<template>
  <footer class="footer">
    <ui-container class="footer__container">
      <slot />
    </ui-container>
  </footer>
</template>

<style lang="sass" scoped>
.footer
  height: 40px
  box-shadow: 0 0px 8px rgb(0 0 0 / 19%)
  background-color: var(--color-green)
  color: var(--color-white)

  &__container
    height: 40px
</style>
