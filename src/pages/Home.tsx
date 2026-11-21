import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react'
import { Marquee } from '../components/Marquee'
import { ReleaseCard } from '../components/ReleaseCard'
import { ShowList } from '../components/ShowList'
import { artistBySlug, artists } from '../data/artists'
import { releases } from '../data/releases'
import { services } from '../data/studio'
import { shows } from '../data/shows'
import { format } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { Reveal } from '../lib/motion'
import { usePlayer } from '../lib/player'

export function Home() {
  const { c, lang } = useI18n()
  const { releaseId, playing, toggle } = usePlayer()
  const latest = releases[0]
  const latestArtist = artistBySlug(latest.artistSlug)
  const latestActive = releaseId === latest.slug && playing

  return (
    <>
      <section className="relative isolate min-h-[92svh] overflow-hidden pt-[72px]">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
        <div className="absolute inset-0 grain" aria-hidden="true" />

        <div className="shell relative flex min-h-[calc(92svh-72px)] flex-col justify-end pb-10 pt-20">
          <div className="flex items-center gap-3">
            <span className="dot" />
            <p className="label label--acid">{c.home.onAir}</p>
            <span className="mono text-[0.58rem] text-ash">{c.home.kicker}</span>
          </div>

          <h1 className="kufi mt-6 text-[clamp(3.2rem,11.5vw,9.5rem)] leading-[0.9]">
            {c.home.titleA}
            <br />
            <span className="text-acid">{c.home.titleB}</span>
          </h1>

          <div className="mt-10 flex flex-col gap-7 border-t border-white/15 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <p className="lede max-w-[44ch]">{c.home.sub}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => toggle(latest.slug)} className="btn btn--acid">
                {latestActive ? <Pause size={15} /> : <Play size={15} />}
                {c.home.listen}
              </button>
              <a href="#/studio" className="btn btn--ghost">
                {c.home.book}
              </a>
            </div>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-px border border-white/12 bg-white/10 sm:grid-cols-4">
            {c.home.stats.map((stat) => (
              <div key={stat.v} className="bg-ink/80 px-4 py-3.5 backdrop-blur-sm">
                <dt className="mono text-[0.55rem] tracking-[0.14em] text-ash">{stat.v}</dt>
                <dd className="kufi mt-1 text-[1.5rem] leading-none text-bone">{stat.k}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex items-center justify-between">
            <span className="mono flex items-center gap-2 text-[0.55rem] text-ash">
              <ArrowDown size={12} className="scroll-hint" />
              {c.home.scroll}
            </span>
            <span className="mono text-[0.55rem] text-ash">36°45′N 3°03′E</span>
          </div>
        </div>
      </section>

      <Marquee items={[...artists.map((artist) => artist.name[lang]), 'TARAB RECORDS']} />

      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <Reveal className="relative">
            <img
              src={latest.cover}
              alt={latest.coverAlt[lang]}
              className="w-full border border-white/10 object-cover"
            />
            <div className="absolute -bottom-5 start-5 bg-acid px-4 py-3 text-ink">
              <p className="mono text-[0.55rem] tracking-[0.16em]">{c.home.latest}</p>
              <p className="kufi mt-1 text-[1.2rem] leading-none">{latest.format[lang]} · {latest.year}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="label">
              {c.home.releasesKicker} <span className="text-acid">/</span> {latest.catalog}
            </p>
            <h2 className="kufi mt-3 text-[clamp(2.1rem,5vw,3.8rem)]">{latest.title[lang]}</h2>
            <p className="mono mt-2 text-[0.68rem] text-ash">
              {latestArtist?.name[lang]} · {latest.tracks.length} {c.ui.tracks} · {latest.runtime}
            </p>
            <p className="lede mt-5 max-w-[52ch]">{latest.note[lang]}</p>

            <ol className="mt-7 border-t border-white/10">
              {latest.tracks.slice(0, 5).map((track) => (
                <li
                  key={track.n}
                  className="flex items-center justify-between gap-4 border-b border-white/10 py-2.5"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="mono text-[0.6rem] text-ash">
                      {String(track.n).padStart(2, '0')}
                    </span>
                    <span className="text-[0.9rem] text-bone-2">{track.title[lang]}</span>
                  </span>
                  <span className="mono text-[0.62rem] text-ash">{track.length}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => toggle(latest.slug)} className="btn btn--acid btn--tight">
                {latestActive ? <Pause size={14} /> : <Play size={14} />}
                {latestActive ? c.ui.pause : c.release.play}
              </button>
              <a href={`#/music/${latest.slug}`} className="arrow-link">
                {c.release.tracklist}
                <ArrowUpRight size={13} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section hairline">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label">{c.home.releasesKicker}</p>
              <h2 className="kufi mt-3 max-w-[22ch] text-[clamp(1.8rem,4vw,3rem)]">
                {c.home.releasesTitle}
              </h2>
            </div>
            <a href="#/music" className="arrow-link">
              {c.home.allReleases}
              <ArrowUpRight size={13} />
            </a>
          </div>

          <p className="lede mt-5 max-w-[62ch]">{c.home.releasesText}</p>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {releases.map((release, index) => (
              <Reveal key={release.slug} delay={index * 70}>
                <ReleaseCard release={release} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section hairline">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label">{c.home.rosterKicker}</p>
              <h2 className="kufi mt-3 text-[clamp(1.8rem,4vw,3rem)]">{c.home.rosterTitle}</h2>
            </div>
            <a href="#/artists" className="arrow-link">
              {c.home.allArtists}
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {artists.map((artist, index) => (
              <Reveal key={artist.slug} delay={index * 60}>
                <a href={`#/artists/${artist.slug}`} className="group block">
                  <div className="relative overflow-hidden border border-white/10">
                    <img
                      src={artist.image}
                      alt={artist.imageAlt[lang]}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover grayscale-[0.5] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <span className="mono absolute top-2 end-2 text-[0.55rem] text-bone/70">
                      0{index + 1}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="kufi text-[1rem] leading-tight text-bone">{artist.name[lang]}</p>
                      <p className="mono mt-1 text-[0.55rem] text-acid opacity-0 transition-opacity group-hover:opacity-100">
                        {artist.city[lang]}
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section hairline">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <img
              src="/images/studio.jpg"
              alt={c.studioPage.roomsTitle}
              loading="lazy"
              className="w-full border border-white/10 object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="label">{c.home.studioKicker}</p>
            <h2 className="kufi mt-3 text-[clamp(1.9rem,4vw,3.1rem)]">{c.home.studioTitle}</h2>
            <p className="lede mt-5 max-w-[48ch]">{c.home.studioText}</p>

            <ul className="mt-7 border-t border-white/10">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5"
                >
                  <span className="text-[0.92rem] text-bone-2">{service.name[lang]}</span>
                  <span className="mono text-[0.62rem] text-ash">
                    {format(service.rate, lang)} {c.ui.currency} · {service.unit[lang]}
                  </span>
                </li>
              ))}
            </ul>

            <a href="#/studio" className="btn btn--ghost mt-7">
              {c.home.studioCta}
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section hairline">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label">{c.home.showsKicker}</p>
              <h2 className="kufi mt-3 text-[clamp(1.8rem,4vw,3rem)]">{c.home.showsTitle}</h2>
            </div>
            <a href="#/shows" className="arrow-link">
              {c.home.showsAll}
              <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="mt-8">
            <ShowList shows={shows.slice(0, 4)} compact />
          </div>
        </div>
      </section>

      <section className="mt-8 bg-acid text-ink">
        <div className="shell grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="mono text-[0.6rem] tracking-[0.18em] text-ink/70">{c.home.kicker}</p>
            <h2 className="kufi mt-4 text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95]">
              {c.home.ctaTitle}
            </h2>
          </div>
          <div>
            <p className="max-w-[40ch] text-[0.95rem] leading-8 text-ink/80">{c.home.ctaText}</p>
            <a href="#/studio" className="btn btn--ink mt-6">
              {c.home.ctaButton}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
