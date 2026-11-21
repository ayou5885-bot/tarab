import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { App } from './App'
import { I18nProvider } from './lib/i18n'
import { PlayerProvider } from './lib/player'

const root = document.getElementById('root')
if (!root) throw new Error('Root element missing')

createRoot(root).render(
  <StrictMode>
    <I18nProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </I18nProvider>
  </StrictMode>,
)
