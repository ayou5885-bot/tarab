import { useI18n } from '../lib/i18n'

export function NotFound() {
  const { c } = useI18n()

  return (
    <section className="section pt-[140px]">
      <div className="shell">
        <p className="mono text-[clamp(3rem,12vw,9rem)] leading-none text-acid/25">{c.notFound.code}</p>
        <h1 className="kufi mt-4 max-w-[20ch] text-[clamp(2rem,5.5vw,4rem)] leading-[1]">
          {c.notFound.title}
        </h1>
        <p className="lede mt-4 max-w-[48ch]">{c.notFound.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#/" className="btn btn--acid btn--tight">
            {c.notFound.cta}
          </a>
          <a href="#/music" className="btn btn--ghost btn--tight">
            {c.nav.music}
          </a>
        </div>
      </div>
    </section>
  )
}
