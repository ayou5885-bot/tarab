import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cx } from '../lib/cx'
import { useI18n } from '../lib/i18n'
import type { Lang } from '../lib/types'

const NAV = [
  { path: '/artists', key: 'artists' },
  { path: '/music', key: 'music' },
  { path: '/shows', key: 'shows' },
  { path: '/studio', key: 'studio' },
] as const

export function Header({ path }: { path: string }) {
  const { c, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (target: string) => path === target || path.startsWith(`${target}/`)

  const langButton = (value: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={cx(
        'mono px-2 py-1 transition-colors',
        lang === value ? 'text-acid' : 'text-ash hover:text-bone',
      )}
    >
      {label}
    </button>
  )

  return (
    <>
      <header className="head" data-scrolled={scrolled}>
        <div className="shell head__inner">
          <a href="#/" className="group flex items-baseline gap-2.5" aria-label="طَرَب — TARAB">
            <span className="kufi text-[1.6rem] leading-none text-bone transition-colors group-hover:text-acid">
              طَرَب
            </span>
            <span className="mono hidden text-[0.55rem] tracking-[0.28em] text-ash sm:block">
              LABEL<span className="text-acid">/</span>ALGER
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="primary">
            {NAV.map((item) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                className="navlink"
                data-active={isActive(item.path)}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {c.nav[item.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <div className="hidden items-center gap-0.5 border border-white/10 px-1 sm:flex" aria-label={c.ui.langLabel}>
              {langButton('ar', 'AR')}
              {langButton('fr', 'FR')}
            </div>
            <a href="#/studio" className="btn btn--acid btn--sm hidden sm:inline-flex">
              {c.nav.book}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center border border-white/15 text-bone lg:hidden"
              aria-label={c.ui.menu}
              aria-expanded={open}
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="menu" role="dialog" aria-modal="true" aria-label={c.ui.menu}>
          <div className="flex items-center justify-between">
            <span className="kufi text-[1.5rem] text-bone">طَرَب</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center border border-white/20 text-bone"
              aria-label={c.ui.closeMenu}
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="mt-8 flex-1" aria-label="mobile">
            {NAV.map((item, index) => (
              <a key={item.path} href={`#${item.path}`} className="menu__link">
                <span>{c.nav[item.key]}</span>
                <small>0{index + 1}</small>
              </a>
            ))}
            <a href="#/studio" className="menu__link text-acid">
              <span>{c.nav.book}</span>
              <small className="text-acid">0{NAV.length + 1}</small>
            </a>
          </nav>

          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <div className="flex items-center gap-2">
              {langButton('ar', 'العربية')}
              {langButton('fr', 'Français')}
            </div>
            <span className="label">{c.ui.demo}</span>
          </div>
        </div>
      )}
    </>
  )
}
