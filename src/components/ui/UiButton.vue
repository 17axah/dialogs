<script setup lang="ts">
import UiIcon from '@/components/ui/UiIcon.vue'
import { computed, toRefs } from 'vue'
import { useSlots } from 'vue'

type Props = {
  icon?: string,
  color?: 'primary' | 'danger' | '',
  outlined?: boolean,
  square?: boolean,
  size?: string,
}

const slots = useSlots()

const props = withDefaults(defineProps<Props>(), {
  color: '',
  outlined: false,
  square: false,
})

const { icon } = toRefs(props)

const classes = computed(() => ({
  'ui-button--colorized': !!props.color,
  'ui-button--labeled': !!slots.default,
  'ui-button--primary': props.color === 'primary',
  'ui-button--danger': props.color === 'danger',
  'ui-button--square': props.square,
  'ui-button--outlined': props.outlined,
}))

const styles = computed(() => ({
  width: props.size,
  height: props.size,
}))
</script>

<template>
  <button v-bind="$attrs" class="ui-button" :class="classes" :style="styles">
    <ui-icon v-if="icon" :name="icon" class="ui-button__icon" />
    <span class="ui-button__label">
      <slot />
    </span>
  </button>
</template>

<style lang="sass" scoped>
.ui-button
  &--colorized
    --button-color: var(--color-white)

  &--primary
    --button-background-color: var(--color-green)
    --button-border-color: var(--color-green)

  &--danger
    --button-background-color: var(--color-red)
    --button-border-color: var(--color-red)

  min-height: 34px
  padding: 4px 8px
  display: inline-flex
  align-items: center
  justify-content: center
  background-color: transparent
  outline: none
  border: none
  color: inherit
  cursor: pointer
  transition: color 0.2s, background 0.2s

  &:not(&--square)
    border-radius: 3px

  &--colorized
    background-color: var(--button-background-color)
    color: var(--button-color)

  &--outlined
    background-color: transparent
    border: 1px solid var(--button-border-color)
    color: var(--button-border-color)

    &:hover
      background-color: var(--button-background-color)
      color: var(--button-color)

  &__icon,
  &__label
    display: block

  &--labeled &__icon
    margin-right: 6px
</style>
