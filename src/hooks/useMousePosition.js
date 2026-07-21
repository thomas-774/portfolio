import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const posRef = useRef({ mouseX: 0, mouseY: 0, cursorX: 0, cursorY: 0 })

  useEffect(() => {
    let rafId

    const animate = () => {
      const p = posRef.current
      p.cursorX += (p.mouseX - p.cursorX) * 0.15
      p.cursorY += (p.mouseY - p.cursorY) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.left = `${p.cursorX - 10}px`
        cursorRef.current.style.top = `${p.cursorY - 10}px`
      }
      rafId = requestAnimationFrame(animate)
    }

    const onMouse = (e) => {
      posRef.current.mouseX = e.clientX
      posRef.current.mouseY = e.clientY
    }

    document.addEventListener('mousemove', onMouse)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return cursorRef
}
