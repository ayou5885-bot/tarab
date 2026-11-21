import { useI18n } from '../lib/i18n'

const YEAR = 2026

export function Footer() {
  const { c } = useI18n()

  return (
    <footer className="foot mt-16">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="kufi text-[1.35rem] text-bone">طَرَب</p>
            <p className="mono mt-1 text-[0.55rem] tracking-[0.24em] text-ash">TARAB · RECORDS & STUDIO</p>
            <p className="mt-4 max-w-[26ch] text-[0.82rem] leading-7 text-bone-2">{c.footer.tagline}</p>
          </div>

          <div>
            <p className="label">{c.footer.label}</p>
            <ul className="mt-3 space-y-2 text-[0.84rem] text-bone-2">
              <li>
                <a href="#/artists" className="transition-colors hover:text-acid">
                  {c.nav.artists}
                </a>
              </li>
              <li>
                <a href="#/music" className="transition-colors hover:text-acid">
                  {c.nav.music}
                </a>
              </li>
              <li>
                <a href="#/shows" className="transition-colors hover:text-acid">
                  {c.nav.shows}
                </a>
              </li>
              <li>
                <a href="#/studio" className="transition-colors hover:text-acid">
                  {c.nav.studio}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label">{c.footer.studio}</p>
            <p className="mt-3 text-[0.84rem] leading-7 text-bone-2">{c.footer.address}</p>
            <p className="mono mt-2 text-[0.6rem] text-ash">{c.footer.hours}</p>
          </div>

          <div>
            <p className="label">{c.footer.contact}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#/studio" className="mono text-[0.66rem] text-bone transition-colors hover:text-acid">
                  hello@tarab.example
                </a>
              </li>
              <li>
                <span className="mono text-[0.66rem] text-ash">+213 (0) 555 00 00 00</span>
              </li>
              <li className="pt-2">
                <a href="#/studio" className="arrow-link">
                  {c.nav.book}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-[70ch] text-[0.76rem] leading-6 text-ash">
            <span className="mono me-2 text-acid">[{c.ui.demo}]</span>
            {c.footer.demoNote}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="mono text-[0.58rem] text-ash">
            © {YEAR} طَرَب — {c.footer.rights}
          </p>
          <p className="mono text-[0.58rem] text-ash">{c.footer.built}</p>
        </div>
      </div>

      <div className="shell overflow-hidden">
        <p className="foot__word text-center" aria-hidden="true">
          TARAB
        </p>
      </div>
    </footer>
  )
}
