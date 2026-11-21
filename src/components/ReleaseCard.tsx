import { Pause, Play } from 'lucide-react'
import { artistBySlug } from '../data/artists'
import type { Release } from '../data/releases'
import { useI18n } from '../lib/i18n'
import { usePlayer } from '../lib/player'

export function ReleaseCard({ release }: { release: Release }) {
  const { c, lang } = useI18n()
  const { releaseId, playing, toggle } = usePlayer()
  const artist = artistBySlug(release.artistSlug)
  const isCurrent = releaseId === release.slug
  const active = isCurrent && playing

  return (
    <article>
      <div className="cover" data-playing={active}>
        <a href={`#/music/${release.slug}`} className="block" aria-label={`${release.title[lang]} — ${c.release.trackLabel}`}>
          <img
            src={release.cover}
            alt={release.coverAlt[lang]}
            loading="lazy"
            className="cover__img"
          />
          <span className="cover__tag">
            {release.format[lang]} · {release.year}
          </span>
        </a>
        <button
          type="button"
          onClick={() => toggle(release.slug)}
          className="cover__play"
          data-playing={active}
          aria-label={`${active ? c.ui.pause : c.ui.play} — ${release.title[lang]}`}
        >
          {active ? <Pause size={16} /> : <Play size={16} className="ms-0.5" />}
        </button>
      </div>

      <div className="mt-3.5 flex items-baseline justify-between gap-3">
        <h3 className="kufi text-[1.15rem] leading-tight">
          <a href={`#/music/${release.slug}`} className="transition-colors hover:text-acid">
            {release.title[lang]}
          </a>
        </h3>
        <span className="mono text-[0.6rem] text-ash">{release.catalog}</span>
      </div>
      <p className="mono mt-1 text-[0.62rem] text-ash">
        {artist?.name[lang]} · {release.tracks.length} {c.ui.tracks}
      </p>
    </article>
  )
}
