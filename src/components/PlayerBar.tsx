import { Pause, Play, Volume2, X } from 'lucide-react'
import { artistBySlug } from '../data/artists'
import { releaseBySlug } from '../data/releases'
import { clock } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { usePlayer } from '../lib/player'
import { Waveform } from './Waveform'

export function PlayerBar() {
  const { releaseId, playing, elapsed, volume, toggle, stop, setVolume } = usePlayer()
  const { c, lang } = useI18n()
  const release = releaseId ? releaseBySlug(releaseId) : null
  const artist = release ? artistBySlug(release.artistSlug) : null

  return (
    <div className="player" data-open={Boolean(release)} aria-hidden={!release}>
      <div className="shell flex items-center gap-3 py-2.5 sm:gap-5">
        {release && (
          <>
            <a
              href={`#/music/${release.slug}`}
              className="relative block h-12 w-12 shrink-0 overflow-hidden border border-white/15"
              tabIndex={release ? 0 : -1}
            >
              <img src={release.cover} alt="" className="h-full w-full object-cover" />
            </a>

            <div className="min-w-0 flex-1">
              <p className="mono truncate text-[0.6rem] text-acid">{c.ui.nowPlaying}</p>
              <p className="truncate text-[0.92rem] leading-tight">
                <span className="font-semibold">{release.title[lang]}</span>
                {artist && <span className="text-ash"> — {artist.name[lang]}</span>}
              </p>
            </div>

            <Waveform className="wave hidden max-w-[280px] flex-1 md:block" />

            <span className="mono hidden text-[0.62rem] text-ash sm:block">
              {clock(elapsed)}
            </span>

            <button
              type="button"
              onClick={() => toggle(release.slug)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-acid text-ink transition-colors hover:bg-bone"
              aria-label={playing ? c.ui.pause : c.ui.play}
            >
              {playing ? <Pause size={17} /> : <Play size={17} className="ms-0.5" />}
            </button>

            <div className="hidden items-center gap-1.5 lg:flex">
              <Volume2 size={14} className="text-ash" />
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(volume * 100)}
                onChange={(event) => setVolume(Number(event.target.value) / 100)}
                className="h-1 w-20 accent-acid"
                aria-label={c.ui.volume}
              />
            </div>

            <button
              type="button"
              onClick={stop}
              className="grid h-9 w-9 shrink-0 place-items-center text-ash transition-colors hover:text-bone"
              aria-label={c.ui.close}
            >
              <X size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
