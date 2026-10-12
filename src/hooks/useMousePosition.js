import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const posRef = useRef({ mouseX: 0, mouseY: 0, cursorX: 0, cursorY: 0 })

  useEffect(() => {
    // No custom cursor on touch screens
    if (!window.matchMedia('(pointer: fine)').matches) return

    let rafId = null

    const animate = () => {
      const p = posRef.current
      p.cursorX += (p.mouseX - p.cursorX) * 0.15
      p.cursorY += (p.mouseY - p.cursorY) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${p.cursorX - 10}px, ${p.cursorY - 10}px, 0)`
      }
      // Stop the loop once the cursor has caught up with the mouse
      if (Math.abs(p.mouseX - p.cursorX) < 0.1 && Math.abs(p.mouseY - p.cursorY) < 0.1) {
        rafId = null
        return
      }
      rafId = requestAnimationFrame(animate)
    }

    const onMouse = (e) => {
      posRef.current.mouseX = e.clientX
      posRef.current.mouseY = e.clientY
      if (rafId === null) rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMouse)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return cursorRef
}
