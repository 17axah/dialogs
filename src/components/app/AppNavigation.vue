<template>
  <div class="navigation">
    <slot />
  </div>
</template>

<style lang="sass" scoped>
.navigation
  height: 100%
  display: flex
  scrollbar-width: thin
  overflow: auto

  &::-webkit-scrollbar
    height: 8px

  &::-webkit-scrollbar-track
    background-color: transparent

  &::-webkit-scrollbar-thumb
    background-clip: padding-box
    background-color: var(--color-grey)

    &:hover
      background-color: var(--color-grey-dark)
</style>
