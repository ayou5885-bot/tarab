import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'
import { services, gear, rooms } from '../data/studio'
import type { SessionType } from '../lib/bookings'
import { saveBooking } from '../lib/bookings'
import {
  cleanMessage,
  cleanText,
  format,
  makeReference,
  validDzPhone,
  validEmail,
} from '../lib/format'
import { useI18n } from '../lib/i18n'
import { Reveal } from '../lib/motion'

type FormState = {
  name: string
  email: string
  phone: string
  session: SessionType | ''
  date: string
  hours: string
  project: string
  notes: string
}

type FieldKey = keyof FormState

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  session: 'recording',
  date: '',
  hours: '4',
  project: '',
  notes: '',
}

const isoDay = (date: Date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

const HOURS = ['2', '3', '4', '6', '8', '10', '12']

export function Studio() {
  const { c, lang } = useI18n()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  const bounds = useMemo(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const max = new Date()
    max.setMonth(max.getMonth() + 6)
    return { min: isoDay(tomorrow), max: isoDay(max) }
  }, [])

  const selected = services.find((service) => service.id === form.session) ?? services[0]
  const hours = Number(form.hours)
  const estimate = selected.id === 'recording' ? selected.rate * (Number.isFinite(hours) ? hours : 0) : selected.rate

  const update = (key: FieldKey, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => {
      if (!previous[key]) return previous
      const next = { ...previous }
      delete next[key]
      return next
    })
  }

  const validate = () => {
    const next: Partial<Record<FieldKey, string>> = {}
    if (cleanText(form.name, 80).length < 3) next.name = c.form.nameShort
    if (!validEmail(form.email)) next.email = c.form.emailInvalid
    if (!validDzPhone(form.phone)) next.phone = c.form.phoneInvalid
    if (!services.some((service) => service.id === form.session)) next.session = c.form.sessionInvalid
    if (!form.date || form.date < bounds.min || form.date > bounds.max) next.date = c.form.dateInvalid
    if (!Number.isFinite(hours) || hours < 2 || hours > 12) next.hours = c.form.hoursInvalid
    if (cleanText(form.project, 100).length < 3) next.project = c.form.projectShort
    if (form.notes.length > 1200) next.notes = c.form.notesLong
    return next
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return
    const found = validate()
    setErrors(found)
    const firstKey = Object.keys(found)[0]
    if (firstKey) {
      document.getElementById(`bk-${firstKey}`)?.focus()
      return
    }

    setSubmitting(true)
    const reference = makeReference()
    saveBooking({
      reference,
      name: cleanText(form.name, 80),
      email: form.email.trim().slice(0, 120),
      phone: form.phone.trim().slice(0, 24),
      session: form.session as SessionType,
      date: form.date,
      hours,
      project: cleanText(form.project, 100),
      notes: cleanMessage(form.notes, 1200),
      createdAt: new Date().toISOString(),
    })

    window.setTimeout(() => {
      window.location.hash = `#/sent/${reference}`
    }, 420)
  }

  const fieldError = (key: FieldKey) =>
    errors[key] ? (
      <span id={`err-${key}`} className="field__error" role="alert">
        {errors[key]}
      </span>
    ) : null

  const invalid = (key: FieldKey) => (errors[key] ? true : undefined)
  const described = (key: FieldKey, hintId: string) =>
    errors[key] ? `${hintId} err-${key}` : hintId

  return (
    <>
      <section className="section pt-[120px]">
        <div className="shell">
          <p className="label">{c.studioPage.kicker}</p>
          <h1 className="kufi mt-4 max-w-[24ch] text-[clamp(2.4rem,7vw,5.2rem)] leading-[0.95]">
            {c.studioPage.title}
          </h1>
          <p className="lede mt-5 max-w-[58ch]">{c.studioPage.text}</p>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="label">{c.studioPage.servicesTitle}</h2>
              <ul className="mt-4 border-t border-white/10">
                {services.map((service, index) => (
                  <li key={service.id} className="border-b border-white/10 py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="kufi text-[1.15rem] text-bone">
                        <span className="mono me-3 text-[0.58rem] text-acid">0{index + 1}</span>
                        {service.name[lang]}
                      </h3>
                      <p className="mono shrink-0 text-[0.62rem] text-bone-2">
                        {format(service.rate, lang)} {c.ui.currency}
                        <span className="text-ash"> / {service.unit[lang]}</span>
                      </p>
                    </div>
                    <p className="mt-2 max-w-[54ch] text-[0.86rem] leading-7 text-ash">
                      {service.desc[lang]}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mono mt-4 text-[0.58rem] text-ash">{c.studioPage.servicesText}</p>

              <h2 className="label mt-12">{c.studioPage.roomsTitle}</h2>
              <div className="mt-4 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {rooms.map((room) => (
                  <div key={room.size} className="bg-ink p-4">
                    <p className="mono text-[0.55rem] text-acid">{room.size}</p>
                    <p className="kufi mt-2 text-[1rem] text-bone">{room.name[lang]}</p>
                    <p className="mt-2 text-[0.78rem] leading-6 text-ash">{room.desc[lang]}</p>
                  </div>
                ))}
              </div>

              <h2 className="label mt-12">{c.studioPage.gearTitle}</h2>
              <p className="mt-2 max-w-[52ch] text-[0.84rem] leading-7 text-ash">{c.studioPage.gearText}</p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {gear.map((group) => (
                  <div key={group.group.ar}>
                    <p className="mono text-[0.58rem] tracking-[0.14em] text-bone-2">
                      {group.group[lang]}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[0.8rem] text-ash">
                          <span className="h-1 w-1 bg-acid" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div id="book" className="border border-white/12 bg-ink-2 p-5 sm:p-7">
                <h2 className="kufi text-[1.6rem] text-bone">{c.studioPage.bookTitle}</h2>
                <p className="mt-2 text-[0.82rem] leading-6 text-ash">{c.studioPage.bookText}</p>

                <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
                  <div className="field">
                    <label className="field__label" htmlFor="bk-name">
                      <span>{c.studioPage.name}</span>
                      <span className="text-ash">{c.ui.required}</span>
                    </label>
                    <input
                      id="bk-name"
                      name="name"
                      className="field__input"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => update('name', event.target.value)}
                      aria-invalid={invalid('name')}
                      aria-describedby={described('name', 'hint-name')}
                      maxLength={80}
                      required
                    />
                    <span id="hint-name" className="field__hint">
                      {c.studioPage.nameHint}
                    </span>
                    {fieldError('name')}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="field">
                      <label className="field__label" htmlFor="bk-email">
                        <span>{c.studioPage.email}</span>
                      </label>
                      <input
                        id="bk-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        className="field__input"
                        autoComplete="email"
                        value={form.email}
                        onChange={(event) => update('email', event.target.value)}
                        aria-invalid={invalid('email')}
                        aria-describedby={described('email', 'hint-email')}
                        maxLength={120}
                        required
                      />
                      <span id="hint-email" className="field__hint">
                        {c.studioPage.emailHint}
                      </span>
                      {fieldError('email')}
                    </div>

                    <div className="field">
                      <label className="field__label" htmlFor="bk-phone">
                        <span>{c.studioPage.phone}</span>
                      </label>
                      <input
                        id="bk-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        className="field__input"
                        autoComplete="tel"
                        dir="ltr"
                        value={form.phone}
                        onChange={(event) => update('phone', event.target.value)}
                        aria-invalid={invalid('phone')}
                        aria-describedby={described('phone', 'hint-phone')}
                        maxLength={24}
                        required
                      />
                      <span id="hint-phone" className="field__hint">
                        {c.studioPage.phoneHint}
                      </span>
                      {fieldError('phone')}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="field">
                      <label className="field__label" htmlFor="bk-session">
                        <span>{c.studioPage.session}</span>
                      </label>
                      <select
                        id="bk-session"
                        name="session"
                        className="field__input"
                        value={form.session}
                        onChange={(event) => update('session', event.target.value)}
                        aria-invalid={invalid('session')}
                        aria-describedby={described('session', 'hint-session')}
                      >
                        <option value="">—</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name[lang]}
                          </option>
                        ))}
                      </select>
                      <span id="hint-session" className="field__hint">
                        {selected.unit[lang]}
                      </span>
                      {fieldError('session')}
                    </div>

                    <div className="field">
                      <label className="field__label" htmlFor="bk-date">
                        <span>{c.studioPage.date}</span>
                      </label>
                      <input
                        id="bk-date"
                        name="date"
                        type="date"
                        className="field__input"
                        min={bounds.min}
                        max={bounds.max}
                        value={form.date}
                        onChange={(event) => update('date', event.target.value)}
                        aria-invalid={invalid('date')}
                        aria-describedby={described('date', 'hint-date')}
                        required
                      />
                      <span id="hint-date" className="field__hint">
                        {c.studioPage.dateHint}
                      </span>
                      {fieldError('date')}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="field">
                      <label className="field__label" htmlFor="bk-hours">
                        <span>{c.studioPage.hours}</span>
                      </label>
                      <select
                        id="bk-hours"
                        name="hours"
                        className="field__input"
                        value={form.hours}
                        onChange={(event) => update('hours', event.target.value)}
                        aria-invalid={invalid('hours')}
                        aria-describedby={described('hours', 'hint-hours')}
                      >
                        {HOURS.map((value) => (
                          <option key={value} value={value}>
                            {c.studioPage.hoursValue(Number(value))}
                          </option>
                        ))}
                      </select>
                      <span id="hint-hours" className="field__hint">
                        {c.studioPage.estimate}: {format(estimate, lang)} {c.ui.currency}
                      </span>
                      {fieldError('hours')}
                    </div>

                    <div className="field">
                      <label className="field__label" htmlFor="bk-project">
                        <span>{c.studioPage.project}</span>
                      </label>
                      <input
                        id="bk-project"
                        name="project"
                        className="field__input"
                        value={form.project}
                        onChange={(event) => update('project', event.target.value)}
                        aria-invalid={invalid('project')}
                        aria-describedby={described('project', 'hint-project')}
                        maxLength={100}
                        required
                      />
                      <span id="hint-project" className="field__hint">
                        {c.studioPage.projectHint}
                      </span>
                      {fieldError('project')}
                    </div>
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="bk-notes">
                      <span>{c.studioPage.notes}</span>
                      <span className="text-ash">{c.ui.optional}</span>
                    </label>
                    <textarea
                      id="bk-notes"
                      name="notes"
                      className="field__input"
                      value={form.notes}
                      onChange={(event) => update('notes', event.target.value)}
                      aria-invalid={invalid('notes')}
                      aria-describedby={described('notes', 'hint-notes')}
                      maxLength={1200}
                      placeholder={c.studioPage.notesHint}
                    />
                    <span id="hint-notes" className="field__hint">
                      {c.studioPage.notesHint} · {form.notes.length}/1200
                    </span>
                    {fieldError('notes')}
                  </div>

                  {Object.keys(errors).length > 0 && (
                    <p className="mono text-[0.6rem] text-[#ff8a70]" role="status">
                      {c.studioPage.fixErrors}
                    </p>
                  )}

                  <button type="submit" className="btn btn--acid w-full" disabled={submitting}>
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    {submitting ? c.studioPage.sending : c.studioPage.submit}
                  </button>

                  <p className="mono text-[0.55rem] leading-relaxed text-ash">{c.studioPage.privacy}</p>
                </form>
              </div>

              <Reveal className="mt-6 border border-white/10 p-4">
                <p className="label">{c.studioPage.kicker}</p>
                <p className="mt-2 text-[0.84rem] leading-7 text-bone-2">{c.footer.address}</p>
                <p className="mono mt-1 text-[0.6rem] text-ash">{c.footer.hours}</p>
                <a href="#/shows" className="arrow-link mt-3">
                  {c.nav.shows}
                  <ArrowUpRight size={12} />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
