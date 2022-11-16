<script setup lang="ts">
import UiContainer from '@/components/ui/UiContainer.vue'
</script>

<template>
  <header class="header">
    <ui-container class="header__container">
      <div class="header__button">
        <slot name="button" />
      </div>
    </ui-container>
  </header>
</template>

<style lang="sass" scoped>
.header
  border-bottom: 1px solid var(--color-green)
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07)

  &__container
    padding: 8px 0
    display: flex
    align-items: center
    justify-content: flex-end
</style>
