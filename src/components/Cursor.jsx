import { useEffect, useRef } from 'react'
import { useCursor } from '../hooks/useMousePosition'

export default function Cursor() {
  const cursorRef = useCursor()
  const hoverElsRef = useRef([])

  useEffect(() => {
    const els = document.querySelectorAll('a, button, .work-card-link, .service-hang-body')
    const onEnter = () => cursorRef.current?.classList.add('hover')
    const onLeave = () => cursorRef.current?.classList.remove('hover')

    els.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    hoverElsRef.current = [els, onEnter, onLeave]

    return () => {
      const [els, onEnter, onLeave] = hoverElsRef.current
      els?.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [cursorRef])

  return <div className="cursor" ref={cursorRef} />
}
