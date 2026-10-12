import { useEffect } from 'react'
import { useCursor } from '../hooks/useMousePosition'

const HOVER_TARGETS = 'a, button, .work-card-link, .service-hang-body'

export default function Cursor() {
  const cursorRef = useCursor()

  useEffect(() => {
    // One delegated listener also covers elements added after mount
    const onOver = (e) => {
      cursorRef.current?.classList.toggle('hover', !!e.target.closest?.(HOVER_TARGETS))
    }
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => document.removeEventListener('mouseover', onOver)
  }, [cursorRef])

  return <div className="cursor" ref={cursorRef} />
}
