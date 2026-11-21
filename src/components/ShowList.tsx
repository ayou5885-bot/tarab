import { ArrowUpRight } from 'lucide-react'
import { artistBySlug } from '../data/artists'
import type { Show } from '../data/shows'
import { longDate, shortDate } from '../lib/format'
import { useI18n } from '../lib/i18n'

const statusKey = { onsale: 'onsale', few: 'few', soldout: 'soldout' } as const

export function ShowList({ shows, compact = false }: { shows: Show[]; compact?: boolean }) {
  const { c, lang } = useI18n()

  return (
    <ul className="border-t border-white/10">
      {shows.map((show) => {
        const artist = artistBySlug(show.artistSlug)
        const soldOut = show.status === 'soldout'
        return (
          <li
            key={show.id}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 px-1 py-4 transition-colors hover:bg-white/[0.03] sm:gap-8 sm:px-3"
          >
            <div className="min-w-[62px]">
              <p className="mono text-[0.62rem] text-acid">
                {shortDate(show.date, lang).replace('.', '')}
              </p>
              <p className="mono mt-0.5 text-[0.55rem] text-ash">{show.date.slice(0, 4)}</p>
            </div>

            <div className="min-w-0">
              <p className="truncate text-[0.98rem] font-semibold text-bone">
                {artist?.name[lang]}
                {!compact && (
                  <span className="ms-2 hidden text-[0.78rem] font-light text-bone-2 sm:inline">
                    · {artist?.role[lang]}
                  </span>
                )}
              </p>
              <p className="mono mt-1 truncate text-[0.6rem] text-ash">
                {show.venue} — {show.city[lang]}
                <span className="hidden sm:inline"> · {longDate(show.date, lang)}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!compact && (
                <span className="mono hidden text-[0.6rem] text-bone-2 sm:block">
                  {c.ui.from} {show.price.toLocaleString(lang === 'ar' ? 'ar-DZ' : 'fr-DZ')} {c.ui.currency}
                </span>
              )}
              <span className="status" data-state={show.status}>
                {c.ui[statusKey[show.status]]}
              </span>
              {!soldOut && (
                <ArrowUpRight
                  size={15}
                  className="text-ash transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-acid"
                  aria-hidden="true"
                />
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
