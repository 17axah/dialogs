import { reactive, type ShallowRef } from "vue"

export const useMove = (element: ShallowRef<HTMLElement>, x = 0, y = 0) => {
  const coords = reactive({ x, y })

  function mouseDown(event: MouseEvent) {
    const rect = element.value.getBoundingClientRect()
    const startClientX = event.clientX
    const startClientY = event.clientY
    const startX = coords.x
    const startY = coords.y

    function mouseUp() {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', mouseUp)
    }

    function moveY(event: MouseEvent) {
      const y = event.clientY - startClientY
      const max = window.innerHeight - (rect.top + rect.height)
      const min = -(window.innerHeight - (window.innerHeight - rect.top))
      const value = Math.max(Math.min(y, max), min)

      coords.y = startY + value
    }

    function moveX(event: MouseEvent) {
      const x = event.clientX - startClientX
      const max = window.innerWidth - (rect.left + rect.width)
      const min = -(window.innerWidth - (window.innerWidth - rect.left))
      const value = Math.max(Math.min(x, max), min)

      coords.x = startX + value
    }

    function mouseMove(event: MouseEvent) {
      moveY(event)
      moveX(event)
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)
  }

  return {
    mouseDown,
    coords,
  }
}
