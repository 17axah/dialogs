<script setup lang="ts">
import UiContainer from '@/components/ui/UiContainer.vue'
</script>

<template>
  <div class="layout">
    <div class="layout__header">
      <slot name="header" />
    </div>

    <main class="layout__main">
      <ui-container>
        <slot name="main" />
      </ui-container>
    </main>

    <div class="layout__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.layout
  height: 100%
  display: flex
  flex-direction: column

  &__header,
  &__footer
    flex-shrink: 0

  &__main
    padding: 20px 0
    flex-grow: 1
</style>
