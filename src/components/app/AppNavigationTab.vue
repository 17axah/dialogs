<script setup lang="ts">
import { computed, toRefs } from 'vue';

type Props = {
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})

const { active } = toRefs(props)

const classes = computed(() => ({
  'window-tab--active': active.value
}))
</script>

<template>
  <button v-bind="$attrs" class="window-tab" :class="classes">
    <slot />
  </button>
</template>

<style lang="sass" scoped>
.window-tab
  height: 100%
  border: 0
  padding: 0 12px
  margin: 0 4px
  background: var(--color-green)
  color: var(--color-white)
  cursor: pointer
  border-bottom: 2px solid var(--color-white)
  transition: background 0.3s

  &--active
    background: var(--color-green-dark)
</style>
