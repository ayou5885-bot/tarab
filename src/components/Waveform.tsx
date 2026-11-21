import { useEffect, useRef } from 'react'
import { usePlayer } from '../lib/player'

export function Waveform({ className, bars = 56 }: { className?: string; bars?: number }) {
  const { engine, playing } = usePlayer()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const playingRef = useRef(playing)
  playingRef.current = playing

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let raf = 0
    const levels = new Float32Array(bars)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const data = new Uint8Array(256)

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      const analyser = engine.analyserNode
      if (analyser && playingRef.current) {
        analyser.getByteFrequencyData(data)
      }

      const gap = 2
      const barWidth = Math.max(1, (w - gap * (bars - 1)) / bars)
      const live = analyser && playingRef.current

      for (let i = 0; i < bars; i += 1) {
        let target = 0.08
        if (live) {
          const bin = Math.floor((i / bars) * 96) + 2
          const value = data[bin] ?? 0
          target = Math.max(0.08, (value / 255) ** 1.4)
        }
        levels[i] = levels[i] + (target - levels[i]) * 0.18
        const barHeight = Math.max(2, levels[i] * h)
        const x = i * (barWidth + gap)
        ctx.fillStyle =
          i % 4 === 0 ? 'rgba(200, 247, 81, 0.85)' : 'rgba(237, 234, 227, 0.42)'
        ctx.fillRect(x, (h - barHeight) / 2, barWidth, barHeight)
      }

      frame += 1
      raf = requestAnimationFrame(draw)
      if (frame > 1e9) frame = 0
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [bars, engine])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
