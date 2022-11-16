import { computed, ref } from "vue"
import { when } from '@/utils'

type Coords = {
  x: number
  y: number
}

type Dialog = {
  id: number,
  focused: boolean,
  expanded: boolean,
  coords: Coords,
}

function updateDialog(fields: Partial<Dialog>) {
  return (dialog: Dialog) => ({ ...dialog, ...fields })
}

function equalDialog(id: number) {
  return (dialog: Dialog) => dialog.id === id
}

function notEqualDialog(id: number) {
  return (dialog: Dialog) => dialog.id !== id
}

function focusComposition(id: number) {
  return when(
    equalDialog(id),
    updateDialog({ focused: true }),
    updateDialog({ focused: false }),
  )
}

function expandComposition(id: number) {
  return when(
    equalDialog(id),
    updateDialog({ expanded: true, focused: true }),
    updateDialog({ focused: false }),
  )
}

function collapseComposition(id: number) {
  return when(
    equalDialog(id),
    updateDialog({ expanded: false, focused: false }),
  )
}

export const useDialogs = () => {
  let counter = 0

  const dialogs = ref<Dialog[]>([])

  const activeDialogs = computed(() => dialogs.value.filter((dialog) => dialog.expanded))

  function open() {
    const dialog = {
      id: ++counter,
      focused: true,
      expanded: true,
      coords: { x: 0, y: 0 },
    }

    dialogs.value = [
      ...dialogs.value.map(updateDialog({ focused: false })),
      dialog,
    ]
  }

  function close(id: number) {
    dialogs.value = dialogs.value.filter(notEqualDialog(id))
  }

  function collapse(id: number) {
    dialogs.value = dialogs.value.map(collapseComposition(id))
  }

  function expand(id: number) {
    dialogs.value = dialogs.value.map(expandComposition(id))
  }

  function focus(id: number) {
    dialogs.value = dialogs.value.map(focusComposition(id))
  }

  function toggle(id: number) {
    const dialog = dialogs.value.find(equalDialog(id))

    if (!dialog?.expanded) {
      expand(id)
    } else if (dialog?.expanded && dialog?.focused) {
      collapse(id)
    } else {
      focus(id)
    }
  }

  function move(id: number, coords: Coords) {
    const mapFn = when(equalDialog(id), updateDialog({ coords }))

    dialogs.value = dialogs.value.map(mapFn)
  }

  return {
    dialogs,
    activeDialogs,
    open,
    collapse,
    close,
    expand,
    focus,
    toggle,
    move,
  }
}
