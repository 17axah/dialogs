<script setup lang="ts">
import TheLayout from '@/components/app/TheLayout.vue'
import TheHeader from '@/components/app/TheHeader.vue'
import TheFooter from '@/components/app/TheFooter.vue'
import UiButton from '@/components/ui/UiButton.vue'
import AppNavigation from '@/components/app/AppNavigation.vue'
import AppNavigationTab from '@/components/app/AppNavigationTab.vue'
import AppDialog from '@/components/app/AppDialog.vue'
import { useDialogs } from '@/composables/useDialogs'

const {
  dialogs,
  activeDialogs,
  open,
  close,
  collapse,
  focus,
  toggle,
  move,
} = useDialogs()
</script>

<template>
  <the-layout>
    <template #header>
      <the-header>
        <template #button>
          <ui-button
            outlined
            color="primary"
            icon="add"
            @click="open"
          >
            Добавить
          </ui-button>
        </template>
      </the-header>
    </template>
    <template #main>
      <transition-group name="fade" mode="in-out">
        <app-dialog
          v-for="dialog in activeDialogs"
          :key="dialog.id"
          :coords="dialog.coords"
          :title="dialog.id"
          :focused="dialog.focused"
          @collapse="collapse(dialog.id)"
          @close="close(dialog.id)"
          @click="focus(dialog.id)"
          @move="move(dialog.id, $event)"
        />
      </transition-group>
    </template>
    <template #footer>
      <the-footer>
        <app-navigation>
          <app-navigation-tab
            v-for="dialog in dialogs"
            :key="dialog.id"
            :active="dialog.focused"
            @click="toggle(dialog.id)"
          >
            {{ dialog.id }}
          </app-navigation-tab>
        </app-navigation>
      </the-footer>
    </template>
  </the-layout>
</template>
