<script setup lang="ts">
import { defineAsyncComponent } from "vue"

type Props = {
  name: string
}

const props = defineProps<Props>()

function toCapitalize(name: string) {
  const [first, ...rest] = name.split('')

  return `${first.toLocaleUpperCase()}${rest.join('').toLowerCase()}`
}

const icon = defineAsyncComponent(() => import(`@/components/icons/Icon${toCapitalize(props.name)}.vue`))
</script>

<template>
  <span class="ui-icon">
    <component :is="icon" />
  </span>
</template>

<style lang="sass" scoped>
.ui-icon
  svg
    display: block
</style>
