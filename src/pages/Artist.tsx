import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { ReleaseCard } from '../components/ReleaseCard'
import { ShowList } from '../components/ShowList'
import { artistBySlug } from '../data/artists'
import { releasesByArtist } from '../data/releases'
import { showsByArtist } from '../data/shows'
import { useI18n } from '../lib/i18n'
import { Reveal } from '../lib/motion'
import { NotFound } from './NotFound'

export function Artist({ slug }: { slug: string }) {
  const { c, lang, dir } = useI18n()
  const artist = artistBySlug(slug)
  if (!artist) return <NotFound />
  const artistReleases = releasesByArtist(artist.slug)
  const artistShows = showsByArtist(artist.slug)
  const Back = dir === 'rtl' ? ArrowRight : ArrowLeft

  return (
    <article className="pt-[104px]">
      <div className="shell">
        <a href="#/artists" className="mono inline-flex items-center gap-2 text-[0.62rem] text-ash transition-colors hover:text-acid">
          <Back size={13} />
          {c.artist.back}
        </a>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <img
              src={artist.image}
              alt={artist.imageAlt[lang]}
              className="w-full border border-white/10 object-cover"
            />
          </Reveal>

          <div className="lg:col-span-7">
            <p className="label">
              {c.artist.role} <span className="text-acid">/</span> {artist.role[lang]}
            </p>
            <h1 className="kufi mt-4 text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95]">
              {artist.name[lang]}
            </h1>
            <p className="mono mt-3 text-[0.65rem] tracking-[0.16em] text-ash">{artist.latin}</p>

            <p className="lede mt-6 max-w-[56ch]">{artist.bio[lang]}</p>

            <blockquote className="mt-7 border-s-2 border-acid ps-5">
              <p className="kufi text-[1.2rem] leading-relaxed text-bone-2">«{artist.quote[lang]}»</p>
            </blockquote>

            <dl className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.artist.city}</dt>
                <dd className="mt-1 text-[0.9rem] text-bone">{artist.city[lang]}</dd>
              </div>
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.artist.since}</dt>
                <dd className="mono mt-1 text-[0.85rem] text-bone">{artist.since}</dd>
              </div>
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.artist.tags}</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {artist.tags.map((tag) => (
                    <span key={tag} className="tag tag--tight">
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-5">
              {artist.links.map((link) => (
                <li key={link.label}>
                  <a
                    href="#/artists"
                    onClick={(event) => event.preventDefault()}
                    className="mono text-[0.65rem] text-bone-2 underline decoration-white/20 underline-offset-4 transition-colors hover:text-acid"
                    title={c.ui.demo}
                  >
                    {link.label} — {link.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="section hairline mt-16">
        <div className="shell">
          <div className="flex items-center justify-between gap-4">
            <h2 className="kufi text-[clamp(1.5rem,3.4vw,2.4rem)]">{c.artist.releases}</h2>
            <a href="#/music" className="arrow-link">
              {c.musicPage.title}
              <ArrowUpRight size={13} />
            </a>
          </div>

          {artistReleases.length === 0 ? (
            <p className="mt-6 text-[0.9rem] text-ash">{c.artist.noReleases}</p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {artistReleases.map((release, index) => (
                <Reveal key={release.slug} delay={index * 70}>
                  <ReleaseCard release={release} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section hairline">
        <div className="shell">
          <h2 className="kufi text-[clamp(1.5rem,3.4vw,2.4rem)]">{c.artist.shows}</h2>
          {artistShows.length === 0 ? (
            <p className="mt-6 text-[0.9rem] text-ash">{c.artist.noShows}</p>
          ) : (
            <div className="mt-8">
              <ShowList shows={artistShows} />
            </div>
          )}
        </div>
      </section>
    </article>
  )
}
