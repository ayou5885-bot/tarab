import type { Groove } from '../data/releases'

const midiToFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12)

function noteFreq(groove: Groove, degree: number) {
  const size = groove.scale.length
  const octave = Math.floor(degree / size)
  const step = ((degree % size) + size) % size
  return midiToFreq(groove.root + groove.scale[step] + octave * 12)
}

/**
 * A tiny generative ensemble. Every release gets its own tempo, scale and
 * pattern, so pressing play produces real audio instead of a fake timeline.
 */
export class SynthEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private analyser: AnalyserNode | null = null
  private noise: AudioBuffer | null = null
  private timer: number | null = null
  private step = 0
  private nextTime = 0
  private groove: Groove | null = null
  private volume = 0.55

  get analyserNode() {
    return this.analyser
  }

  get running() {
    return this.timer !== null
  }

  private ensure(): AudioContext {
    if (this.ctx) return this.ctx
    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) throw new Error('Web Audio is not available in this browser')

    const ctx = new Ctor()
    const master = ctx.createGain()
    master.gain.value = 0.0001

    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -16
    comp.knee.value = 18
    comp.ratio.value = 3
    comp.attack.value = 0.006
    comp.release.value = 0.22

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0.82

    master.connect(comp)
    comp.connect(analyser)
    analyser.connect(ctx.destination)

    const frames = Math.floor(ctx.sampleRate * 1.5)
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1

    this.ctx = ctx
    this.master = master
    this.analyser = analyser
    this.noise = buffer
    return ctx
  }

  setVolume(value: number) {
    this.volume = Math.min(1, Math.max(0, value))
    if (this.ctx && this.master) {
      const target = this.running ? 0.42 * this.volume : 0.0001
      this.master.gain.cancelScheduledValues(this.ctx.currentTime)
      this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.08)
    }
  }

  async play(groove: Groove) {
    const ctx = this.ensure()
    if (ctx.state === 'suspended') await ctx.resume()
    this.groove = groove
    this.step = 0
    this.nextTime = ctx.currentTime + 0.12
    if (this.master) {
      this.master.gain.cancelScheduledValues(ctx.currentTime)
      this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), ctx.currentTime)
      this.master.gain.linearRampToValueAtTime(0.42 * this.volume, ctx.currentTime + 0.35)
    }
    if (this.timer !== null) window.clearInterval(this.timer)
    this.timer = window.setInterval(() => this.tick(), 25)
  }

  stop() {
    if (this.timer !== null) {
      window.clearInterval(this.timer)
      this.timer = null
    }
    if (this.ctx && this.master) {
      const t = this.ctx.currentTime
      this.master.gain.cancelScheduledValues(t)
      this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), t)
      this.master.gain.exponentialRampToValueAtTime(0.0001, t + 0.24)
    }
    this.groove = null
  }

  private tick() {
    const ctx = this.ctx
    const groove = this.groove
    if (!ctx || !groove) return
    const stepDur = 60 / groove.bpm / 4

    while (this.nextTime < ctx.currentTime + 0.2) {
      const at = this.nextTime
      const index = this.step % 16
      const bar = Math.floor(this.step / 16)
      this.schedule(index, bar, at, groove)
      this.nextTime += stepDur + (this.step % 2 === 1 ? stepDur * groove.swing : 0)
      this.step += 1
    }
  }

  private schedule(index: number, bar: number, at: number, g: Groove) {
    if (g.kick.includes(index)) this.kick(at)
    if (g.snare.includes(index)) this.snare(at)
    if (g.hat.includes(index)) this.hat(at, index % 4 === 2)
    const bassDegree = g.bass[index] ?? -1
    if (bassDegree >= 0) this.bass(at, noteFreq(g, bassDegree), 60 / g.bpm / 3)

    if (index === 0 && bar % 2 === 0) {
      this.pad(at, g.pad.map((degree) => noteFreq(g, degree)), (60 / g.bpm) * 8, g.filter)
    }
    const leadDegree = g.lead[index] ?? -1
    if (leadDegree >= 0) this.pluck(at, noteFreq(g, leadDegree + 7), 0.18)
  }

  private kick(at: number) {
    const ctx = this.ctx
    if (!ctx || !this.master) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(152, at)
    osc.frequency.exponentialRampToValueAtTime(46, at + 0.19)
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(0.85, at + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.34)
    osc.connect(gain)
    gain.connect(this.master)
    osc.start(at)
    osc.stop(at + 0.36)
  }

  private snare(at: number) {
    const ctx = this.ctx
    if (!ctx || !this.master || !this.noise) return
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 1750
    band.Q.value = 0.9
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(0.32, at + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.15)
    src.connect(band)
    band.connect(gain)
    gain.connect(this.master)
    src.start(at, Math.random() * 0.4)
    src.stop(at + 0.2)

    const tone = ctx.createOscillator()
    const toneGain = ctx.createGain()
    tone.type = 'triangle'
    tone.frequency.setValueAtTime(196, at)
    toneGain.gain.setValueAtTime(0.16, at)
    toneGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.1)
    tone.connect(toneGain)
    toneGain.connect(this.master)
    tone.start(at)
    tone.stop(at + 0.12)
  }

  private hat(at: number, accent: boolean) {
    const ctx = this.ctx
    if (!ctx || !this.master || !this.noise) return
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 8200
    const gain = ctx.createGain()
    const peak = accent ? 0.14 : 0.07
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(peak, at + 0.002)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.05)
    src.connect(hp)
    hp.connect(gain)
    gain.connect(this.master)
    src.start(at, Math.random() * 0.6)
    src.stop(at + 0.08)
  }

  private bass(at: number, freq: number, dur: number) {
    const ctx = this.ctx
    if (!ctx || !this.master) return
    const osc = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, at)
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(520, at)
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(0.4, at + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.master)
    osc.start(at)
    osc.stop(at + dur + 0.02)
  }

  private pad(at: number, freqs: number[], dur: number, brightness: number) {
    const ctx = this.ctx
    if (!ctx || !this.master) return
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(500 * brightness, at)
    filter.frequency.linearRampToValueAtTime(900 * brightness, at + dur * 0.4)
    filter.frequency.linearRampToValueAtTime(420 * brightness, at + dur)
    filter.Q.value = 0.7

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.linearRampToValueAtTime(0.085, at + 0.9)
    gain.gain.linearRampToValueAtTime(0.0001, at + dur)

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.value = freq
      osc.detune.value = (i - 1) * 6
      osc.connect(filter)
      osc.start(at)
      osc.stop(at + dur + 0.1)
    })

    filter.connect(gain)
    gain.connect(this.master)
  }

  private pluck(at: number, freq: number, dur: number) {
    const ctx = this.ctx
    if (!ctx || !this.master) return
    const osc = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, at)
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2600, at)
    filter.frequency.exponentialRampToValueAtTime(900, at + dur)
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(0.16, at + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.master)
    osc.start(at)
    osc.stop(at + dur + 0.02)
  }
}
