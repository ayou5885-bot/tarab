import { ArrowUpRight } from 'lucide-react'
import { artists } from '../data/artists'
import { useI18n } from '../lib/i18n'
import { Reveal } from '../lib/motion'

export function Artists() {
  const { c, lang } = useI18n()

  return (
    <section className="section pt-[120px]">
      <div className="shell">
        <p className="label">{c.artistsPage.kicker}</p>
        <h1 className="kufi mt-4 text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]">
          {c.artistsPage.title}
        </h1>
        <p className="lede mt-5 max-w-[54ch]">{c.artistsPage.text}</p>

        <ul className="mt-12 border-t border-white/10">
          {artists.map((artist, index) => (
            <li key={artist.slug}>
              <a
                href={`#/artists/${artist.slug}`}
                className="group grid grid-cols-[2rem_3.5rem_1fr_auto] items-center gap-4 border-b border-white/10 py-4 transition-colors hover:bg-white/[0.04] sm:gap-6 sm:py-5"
              >
                <span className="mono text-[0.6rem] text-ash">0{index + 1}</span>
                <img
                  src={artist.image}
                  alt={artist.imageAlt[lang]}
                  loading="lazy"
                  className="h-14 w-14 border border-white/10 object-cover grayscale-[0.4] transition-all duration-700 group-hover:grayscale-0"
                />
                <div className="min-w-0">
                  <p className="kufi truncate text-[clamp(1.2rem,3vw,2rem)] leading-tight text-bone transition-colors group-hover:text-acid">
                    {artist.name[lang]}
                  </p>
                  <p className="mono mt-1 truncate text-[0.6rem] text-ash">
                    {artist.role[lang]} · {artist.city[lang]} · {artist.since}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-ash transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-wrap gap-2">
          {[...new Set(artists.flatMap((artist) => artist.tags))].map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
