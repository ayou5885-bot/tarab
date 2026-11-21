import { ShowList } from '../components/ShowList'
import { shows } from '../data/shows'
import { useI18n } from '../lib/i18n'

export function Shows() {
  const { c } = useI18n()

  return (
    <section className="section pt-[120px]">
      <div className="shell">
        <p className="label">{c.home.showsKicker}</p>
        <h1 className="kufi mt-4 text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]">
          {c.home.showsTitle}
        </h1>
        <p className="lede mt-5 max-w-[54ch]">{c.studioPage.text}</p>

        <div className="mt-10">
          <ShowList shows={shows} />
        </div>

        <p className="mono mt-8 text-[0.6rem] text-ash">
          {c.ui.generated} {c.footer.demoNote}
        </p>
      </div>
    </section>
  )
}
