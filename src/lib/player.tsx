import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { SynthEngine } from './audio'
import { releaseBySlug } from '../data/releases'

type PlayerValue = {
  releaseId: string | null
  playing: boolean
  elapsed: number
  volume: number
  engine: SynthEngine
  toggle: (releaseId: string) => void
  stop: () => void
  setVolume: (value: number) => void
}

const PlayerContext = createContext<PlayerValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<SynthEngine | null>(null)
  if (!engineRef.current) engineRef.current = new SynthEngine()
  const engine = engineRef.current

  const [releaseId, setReleaseId] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const [startedAt, setStartedAt] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setElapsed((Date.now() - startedAt) / 1000)
    }, 200)
    return () => window.clearInterval(id)
  }, [playing, startedAt])

  const toggle = useCallback(
    (id: string) => {
      const release = releaseBySlug(id)
      if (!release) return
      if (releaseId === id && playing) {
        engine.stop()
        setPlaying(false)
        return
      }
      void engine.play(release.groove)
      engine.setVolume(volume)
      setReleaseId(id)
      setStartedAt(Date.now())
      setElapsed(0)
      setPlaying(true)
    },
    [engine, playing, releaseId, volume],
  )

  const stop = useCallback(() => {
    engine.stop()
    setPlaying(false)
    setReleaseId(null)
    setElapsed(0)
  }, [engine])

  const setVolume = useCallback(
    (value: number) => {
      setVolumeState(value)
      engine.setVolume(value)
    },
    [engine],
  )

  useEffect(() => {
    const onHide = () => {
      if (document.hidden && engine.running) {
        engine.stop()
        setPlaying(false)
      }
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [engine])

  const value = useMemo(
    () => ({ releaseId, playing, elapsed, volume, engine, toggle, stop, setVolume }),
    [releaseId, playing, elapsed, volume, engine, toggle, stop, setVolume],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const value = useContext(PlayerContext)
  if (!value) throw new Error('usePlayer must be used inside PlayerProvider')
  return value
}
