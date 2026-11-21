import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/studio'
import { loadBooking } from '../lib/bookings'
import { format, longDate } from '../lib/format'
import { useI18n } from '../lib/i18n'

export function Sent({ reference }: { reference: string }) {
  const { c, lang } = useI18n()
  const booking = loadBooking(reference)
  const service = booking ? services.find((item) => item.id === booking.session) : null

  return (
    <section className="section pt-[130px]">
      <div className="shell max-w-3xl">
        <p className="label label--acid">{c.sent.kicker}</p>
        <h1 className="kufi mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-[0.98]">{c.sent.title}</h1>
        <p className="lede mt-4 max-w-[52ch]">{c.sent.text}</p>

        <div className="mt-8 inline-flex flex-col border border-acid/50 bg-acid/[0.06] px-5 py-4">
          <span className="label">{c.sent.reference}</span>
          <span className="mono mt-1 text-[1.4rem] tracking-[0.14em] text-acid">{reference}</span>
        </div>

        {!booking ? (
          <div className="mt-10 border border-white/12 p-5">
            <p className="text-[0.9rem] leading-7 text-bone-2">{c.sent.missing}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#/studio" className="btn btn--acid btn--tight">
                {c.sent.again}
              </a>
              <a href="#/" className="btn btn--ghost btn--tight">
                {c.sent.backHome}
              </a>
            </div>
          </div>
        ) : (
          <>
            <h2 className="label mt-10">{c.sent.summary}</h2>
            <dl className="mt-3 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                { k: c.sent.session, v: service ? service.name[lang] : booking.session },
                { k: c.sent.date, v: longDate(booking.date, lang) },
                { k: c.sent.hours, v: c.studioPage.hoursValue(booking.hours) },
                { k: c.sent.project, v: booking.project },
              ].map((row) => (
                <div key={row.k} className="bg-ink px-4 py-3">
                  <dt className="label">{row.k}</dt>
                  <dd className="mt-1 text-[0.92rem] text-bone">{row.v}</dd>
                </div>
              ))}
              {service && (
                <div className="bg-ink px-4 py-3">
                  <dt className="label">{c.sent.estimate}</dt>
                  <dd className="mono mt-1 text-[0.88rem] text-acid">
                    {format(
                      service.id === 'recording' ? service.rate * booking.hours : service.rate,
                      lang,
                    )}{' '}
                    {c.ui.currency}
                  </dd>
                </div>
              )}
              <div className="bg-ink px-4 py-3">
                <dt className="label">{c.sent.contact}</dt>
                <dd className="mt-1 text-[0.88rem] text-bone" dir="ltr">
                  {booking.email}
                </dd>
              </div>
            </dl>

            {booking.notes && (
              <div className="mt-5 border-s-2 border-white/15 ps-4">
                <p className="label">{c.studioPage.notes}</p>
                <p className="mt-1 whitespace-pre-line text-[0.86rem] leading-7 text-bone-2">
                  {booking.notes}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#/studio" className="btn btn--acid btn--tight">
                {c.sent.again}
                <ArrowUpRight size={13} />
              </a>
              <a href="#/music" className="btn btn--ghost btn--tight">
                {c.nav.music}
              </a>
            </div>
          </>
        )}

        <p className="mono mt-10 border-t border-white/10 pt-4 text-[0.58rem] leading-relaxed text-ash">
          {c.sent.note}
        </p>
      </div>
    </section>
  )
}
