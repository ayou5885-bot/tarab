import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { ReleaseCard } from '../components/ReleaseCard'
import { artistBySlug } from '../data/artists'
import { releaseBySlug, releases } from '../data/releases'
import { useI18n } from '../lib/i18n'
import { Reveal } from '../lib/motion'
import { usePlayer } from '../lib/player'
import { NotFound } from './NotFound'

export function ReleasePage({ slug }: { slug: string }) {
  const { c, lang, dir } = useI18n()
  const { releaseId, playing, toggle } = usePlayer()
  const release = releaseBySlug(slug)
  if (!release) return <NotFound />

  const artist = artistBySlug(release.artistSlug)
  const active = releaseId === release.slug && playing
  const others = releases.filter((item) => item.slug !== release.slug).slice(0, 3)
  const index = releases.findIndex((item) => item.slug === release.slug)
  const next = releases[(index + 1) % releases.length]
  const Back = dir === 'rtl' ? ArrowRight : ArrowLeft

  return (
    <article className="pt-[104px]">
      <div className="shell">
        <a href="#/music" className="mono inline-flex items-center gap-2 text-[0.62rem] text-ash transition-colors hover:text-acid">
          <Back size={13} />
          {c.release.back}
        </a>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal className="relative">
              <img
                src={release.cover}
                alt={release.coverAlt[lang]}
                className="w-full border border-white/10 object-cover"
              />
              <button
                type="button"
                onClick={() => toggle(release.slug)}
                className="btn btn--acid btn--tight absolute bottom-4 end-4"
                aria-label={active ? c.ui.pause : c.release.play}
              >
                {active ? <Pause size={14} /> : <Play size={14} />}
                {active ? c.ui.pause : c.release.play}
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <p className="label">
              {release.catalog} <span className="text-acid">/</span> {release.format[lang]}
            </p>
            <h1 className="kufi mt-3 text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.98]">
              {release.title[lang]}
            </h1>
            <a
              href={`#/artists/${release.artistSlug}`}
              className="mono mt-3 inline-flex items-center gap-2 text-[0.7rem] text-acid transition-colors hover:text-bone"
            >
              {artist?.name[lang]}
              <ArrowUpRight size={12} />
            </a>

            <p className="lede mt-5">{release.note[lang]}</p>

            <dl className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.release.year}</dt>
                <dd className="mono mt-1 text-[0.8rem]">{release.year}</dd>
              </div>
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.release.runtime}</dt>
                <dd className="mono mt-1 text-[0.8rem]">{release.runtime}</dd>
              </div>
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.release.format}</dt>
                <dd className="mt-1 text-[0.85rem]">{release.format[lang]}</dd>
              </div>
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.release.catalog}</dt>
                <dd className="mono mt-1 text-[0.8rem]">{release.catalog}</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              {release.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mono mt-6 border-t border-white/10 pt-4 text-[0.58rem] leading-relaxed text-ash">
              {c.ui.generated}
            </p>
          </div>
        </div>

        <section className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="label">{c.release.tracklist}</h2>
            <ol className="mt-4 border-t border-white/10">
              {release.tracks.map((track) => (
                <li key={track.n}>
                  <button
                    type="button"
                    onClick={() => toggle(release.slug)}
                    className="group flex w-full items-center justify-between gap-4 border-b border-white/10 py-3 text-start transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="mono text-[0.6rem] text-ash">
                        {String(track.n).padStart(2, '0')}
                      </span>
                      <span className="text-[0.95rem] text-bone-2 transition-colors group-hover:text-acid">
                        {track.title[lang]}
                      </span>
                    </span>
                    <span className="mono flex items-center gap-3 text-[0.62rem] text-ash">
                      {track.length}
                      <Play size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <h2 className="label">{c.release.note}</h2>
            <p className="mt-3 text-[0.9rem] leading-7 text-bone-2">{release.note[lang]}</p>
            <h2 className="label mt-8">{c.release.credits}</h2>
            <p className="mt-3 text-[0.88rem] leading-7 text-bone-2">{release.credits[lang]}</p>
          </div>
        </section>
      </div>

      <section className="section hairline mt-16">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="kufi text-[clamp(1.5rem,3.4vw,2.4rem)]">{c.release.more}</h2>
            <a href={`#/music/${next.slug}`} className="arrow-link">
              {c.release.next}: {next.title[lang]}
              <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
            {others.map((item, i) => (
              <Reveal key={item.slug} delay={i * 60}>
                <ReleaseCard release={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
