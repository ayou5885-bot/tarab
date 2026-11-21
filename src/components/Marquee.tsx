import { cx } from '../lib/cx'

type Props = {
  items: string[]
  reverse?: boolean
  className?: string
}

export function Marquee({ items, reverse = false, className }: Props) {
  const row = [...items, ...items]
  return (
    <div className={cx('marquee', className)} aria-hidden="true">
      <div className="marquee__track" data-reverse={reverse}>
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="kufi text-[clamp(1.1rem,2.4vw,2rem)] font-semibold text-bone/80">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-acid" />
          </span>
        ))}
      </div>
    </div>
  )
}
