import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PlayerBar } from './components/PlayerBar'
import { Artist } from './pages/Artist'
import { Artists } from './pages/Artists'
import { Home } from './pages/Home'
import { Music } from './pages/Music'
import { NotFound } from './pages/NotFound'
import { ReleasePage } from './pages/Release'
import { Sent } from './pages/Sent'
import { Shows } from './pages/Shows'
import { Studio } from './pages/Studio'
import { useI18n } from './lib/i18n'

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [pathAndQuery, anchor] = raw.split('#')
  const [path] = pathAndQuery.split('?')
  return { path: path || '/', anchor: anchor ?? '' }
}

export function App() {
  const { c } = useI18n()
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  useEffect(() => {
    if (route.anchor) {
      const target = document.getElementById(route.anchor)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route.path, route.anchor])

  const artistMatch = route.path.match(/^\/artists\/([\w-]+)$/)
  const releaseMatch = route.path.match(/^\/music\/([\w-]+)$/)
  const sentMatch = route.path.match(/^\/sent\/([\w-]+)$/)

  let page
  if (route.path === '/') page = <Home />
  else if (route.path === '/artists') page = <Artists />
  else if (artistMatch) page = <Artist slug={artistMatch[1]} />
  else if (route.path === '/music') page = <Music />
  else if (releaseMatch) page = <ReleasePage slug={releaseMatch[1]} />
  else if (route.path === '/shows') page = <Shows />
  else if (route.path === '/studio') page = <Studio />
  else if (sentMatch) page = <Sent reference={sentMatch[1]} />
  else page = <NotFound />

  return (
    <div className="grain flex min-h-screen flex-col">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70] focus:bg-acid focus:px-4 focus:py-2 focus:text-[12px] focus:text-ink"
      >
        {c.skip}
      </a>

      <Header path={route.path} />

      <main id="main" tabIndex={-1} className="flex-1 pb-24 outline-none">
        <div key={route.path} className="page-enter">
          {page}
        </div>
      </main>

      <Footer />
      <PlayerBar />
    </div>
  )
}
