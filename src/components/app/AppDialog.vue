<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import { useMove } from '@/composables/useMove'
import { computed, shallowRef, toRefs, watch, type ShallowRef } from 'vue';

type Coords = {
  x: number
  y: number
}

type Props = {
  title: string | number,
  focused: boolean,
  coords: Coords,
}

const props = defineProps<Props>()
const { title } = toRefs(props)
const element = shallowRef<HTMLElement | null>(null)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'collapse'): void
  (e: 'move', coords: Coords): void
}>()

const { coords, mouseDown } = useMove(
  element as ShallowRef<HTMLElement>,
  props.coords.x,
  props.coords.y,
)

watch(coords, function(coords) {
  emit('move', coords)
})

const styles = computed(() => ({
  transform: `translate(${coords.x}px, ${coords.y}px)`
}))

const classes = computed(() => ({
  'app-dialog--focused': props.focused,
}))
</script>

<template>
  <div
    v-bind="$attrs"
    ref="element"
    class="app-dialog"
    :class="classes"
    :style="styles"
  >
    <div class="app-dialog__header">
      <div class="app-dialog__title" @mousedown.stop="mouseDown">
        {{ title }}
      </div>
      <div class="app-dialog__buttons">
        <ui-button
          aria-label="minimize window"
          icon="minimize"
          size="30px"
          square
          @click="emit('collapse')"
        />
        <ui-button
          aria-label="close window"
          icon="close"
          size="30px"
          color="danger"
          square
          @click="emit('close')"
        />
      </div>
    </div>
    <div class="app-dialog__body">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis veniam nihil tempora, vitae amet odio asperiores quis? Mollitia, at ad voluptatem ducimus assumenda, explicabo iusto vero iure, labore dolores accusamus.
    </div>
  </div>
</template>

<style lang="sass" scoped>
.app-dialog
  display: flex
  flex-direction: column
  margin: auto
  width: 400px
  height: 300px
  max-width: 100%
  max-height: 100%
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  box-shadow: 0 0 20px -5px var(--color-grey)
  will-change: width, height
  z-index: 10

  &--focused
    z-index: 20

  &__header
    display: flex
    align-items: center
    justify-content: space-between
    background-color: var(--color-green)
    color: var(--color-white)
    user-select: none

  &__title
    display: flex
    align-items: center
    height: 100%
    flex: 1
    padding: 0 10px
    font-size: 18px
    line-height: 20px
    cursor: move

  &__body
    background-color: var(--color-white)
    flex: 1
    padding: 12px
    border: 1px solid var(--color-green)
    border-top: none
    overflow: auto
</style>
