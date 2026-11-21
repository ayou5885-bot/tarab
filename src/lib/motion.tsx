import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'
import { cx } from './cx'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}

export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cx('reveal', seen && 'is-in', className)}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
