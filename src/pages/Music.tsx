import { useState } from 'react'
import { ReleaseCard } from '../components/ReleaseCard'
import { releases } from '../data/releases'
import { cx } from '../lib/cx'
import { format } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { Reveal } from '../lib/motion'

export function Music() {
  const { c, lang } = useI18n()
  const [filter, setFilter] = useState('all')

  const formats = [...new Set(releases.map((release) => release.format[lang]))]
  const visible = filter === 'all' ? releases : releases.filter((r) => r.format[lang] === filter)

  return (
    <section className="section pt-[120px]">
      <div className="shell">
        <p className="label">{c.musicPage.kicker}</p>
        <h1 className="kufi mt-4 text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]">
          {c.musicPage.title}
        </h1>
        <p className="lede mt-5 max-w-[58ch]">{c.musicPage.text}</p>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label={c.musicPage.title}>
            {['all', ...formats].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={cx(
                  'mono border px-3 py-1.5 text-[0.62rem] transition-colors',
                  filter === value
                    ? 'border-acid bg-acid text-ink'
                    : 'border-white/15 text-bone-2 hover:border-acid hover:text-acid',
                )}
              >
                {value === 'all' ? c.musicPage.filterAll : value}
              </button>
            ))}
          </div>
          <p className="mono text-[0.6rem] text-ash">
            {format(visible.length, lang)} {c.musicPage.count}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {visible.map((release, index) => (
            <Reveal key={release.slug} delay={index * 60}>
              <ReleaseCard release={release} />
            </Reveal>
          ))}
        </div>

        <p className="mono mt-12 border-t border-white/10 pt-5 text-[0.6rem] text-ash">
          {c.ui.generated}
        </p>
      </div>
    </section>
  )
}
