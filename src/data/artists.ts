import type { Localized } from '../lib/types'

export type Artist = {
  slug: string
  name: Localized
  latin: string
  role: Localized
  city: Localized
  since: number
  image: string
  imageAlt: Localized
  bio: Localized
  quote: Localized
  tags: string[]
  links: { label: string; handle: string }[]
}

export const artists: Artist[] = [
  {
    slug: 'lila-barran',
    name: { ar: 'ليلى برّان', fr: 'Lila Barran' },
    latin: 'LILA BARRAN',
    role: { ar: 'غناء وكتابة', fr: 'Chant & écriture' },
    city: { ar: 'الجزائر العاصمة', fr: 'Alger' },
    since: 2019,
    image: '/images/artist-lila.jpg',
    imageAlt: {
      ar: 'صورة استوديو لليلى برّان بإضاءة جانبية',
      fr: 'Portrait studio de Lila Barran, lumière latérale',
    },
    bio: {
      ar: 'بدأت من أمسيات صغيرة في باب الوادي، ثم صارت تكتب بالدارجة والفرنسية على حد سواء. صوتها يتحرك بين الراي والبوب الإلكتروني، لكن النص عنده أولوية على الإيقاع.',
      fr: 'Elle est partie des petites scènes de Bab El Oued avant d’écrire indifféremment en darija et en français. Sa voix navigue entre raï et pop électronique, mais le texte passe toujours avant le rythme.',
    },
    quote: {
      ar: 'أغنية جيدة تشبه غرفةً يُطفأ فيها الضوء ببطء.',
      fr: 'Une bonne chanson ressemble à une pièce où la lumière s’éteint lentement.',
    },
    tags: ['raï', 'pop', 'électro'],
    links: [
      { label: 'Instagram', handle: '@lilabarran' },
      { label: 'Bandcamp', handle: 'lilabarran' },
    ],
  },
  {
    slug: 'kamal-16',
    name: { ar: 'كمال ١٦', fr: 'Kamal 16' },
    latin: 'KAMAL 16',
    role: { ar: 'راب وكتابة', fr: 'Rap & écriture' },
    city: { ar: 'وهران', fr: 'Oran' },
    since: 2021,
    image: '/images/artist-kamal.jpg',
    imageAlt: {
      ar: 'صورة ليلية لكمال ١٦ أمام جدار مبلّط',
      fr: 'Portrait nocturne de Kamal 16 devant un mur carrelé',
    },
    bio: {
      ar: 'يسجّل في غرفته منذ الرابعة عشرة، ويوزّع على نفسه: كتابة، إنتاج، مكساج. يشتغل على طبقات صوت المدينة: أبواق، محرّكات، وأصوات باعة متجوّلين.',
      fr: 'Il enregistre dans sa chambre depuis ses quatorze ans et assure tout lui-même : écriture, production, mixage. Il échantillonne la ville — klaxons, moteurs, voix de vendeurs ambulants.',
    },
    quote: {
      ar: 'الحارة هي أول استوديو سمعته.',
      fr: 'Le quartier a été mon premier studio.',
    },
    tags: ['rap', 'drill', 'darija'],
    links: [{ label: 'Instagram', handle: '@kamalsetash' }],
  },
  {
    slug: 'nuh',
    name: { ar: 'نُوح', fr: 'Nūh' },
    latin: 'NŪH',
    role: { ar: 'قنبري وإلكترونيات', fr: 'Guembri & électronique' },
    city: { ar: 'بشار', fr: 'Béchar' },
    since: 2018,
    image: '/images/artist-nuh.jpg',
    imageAlt: {
      ar: 'عازف قنبري في ليل صحراوي بإضاءة دافئة',
      fr: 'Joueur de guembri dans une nuit saharienne, lumière chaude',
    },
    bio: {
      ar: 'حامل تقليد الديوان من عائلة في بشار، يوصله بمفاتيح ومسجّلات شريطية. جلساته الطويلة تُسجَّل في ممر واحد بلا مونتاج، والصمت جزء من المقطوعة.',
      fr: 'Héritier d’une famille diwan de Béchar, il relie la tradition aux synthés et aux magnétophones. Ses longues séances sont captées en une prise, sans montage : le silence fait partie du morceau.',
    },
    quote: {
      ar: 'إذا سمعت الصحراء، لن تحتاج إلى مزيد من الآلات.',
      fr: 'Quand on a entendu le désert, on n’a plus besoin d’instruments.',
    },
    tags: ['gnawa', 'ambient', 'diwan'],
    links: [{ label: 'Bandcamp', handle: 'nuh-dz' }],
  },
  {
    slug: 'yasmine',
    name: { ar: 'ياسمين سعداوي', fr: 'Yasmine Sadaoui' },
    latin: 'YASMINE SADAOUI',
    role: { ar: 'غناء وسول', fr: 'Chant & soul' },
    city: { ar: 'قسنطينة', fr: 'Constantine' },
    since: 2020,
    image: '/images/artist-yasmine.jpg',
    imageAlt: {
      ar: 'ياسمين سعداوي جالسة في غرفة بروفات مظلمة',
      fr: 'Yasmine Sadaoui assise dans une salle de répétition sombre',
    },
    bio: {
      ar: 'تدرّبت على البيانو الكلاسيكي قبل أن تكتشف السول عبر أشرطة والدها. تكتب بالعربية الفصحى أحيانًا، وتحتفظ بالطبقات الصوتية كأنها كورال صغير خلفها.',
      fr: 'Formée au piano classique avant de découvrir la soul sur les cassettes de son père. Elle écrit parfois en arabe classique et empile ses voix comme un petit chœur derrière elle.',
    },
    quote: {
      ar: 'أغني ببطء لأن الحقيقة تحتاج وقتًا.',
      fr: 'Je chante lentement parce que la vérité prend du temps.',
    },
    tags: ['soul', 'jazz', 'nay'],
    links: [{ label: 'Instagram', handle: '@yasmine.sdw' }],
  },
  {
    slug: 'sidi-bou',
    name: { ar: 'سيدي بو', fr: 'Sidi Bou' },
    latin: 'SIDI BOU',
    role: { ar: 'إنتاج وإيقاع', fr: 'Production & batterie' },
    city: { ar: 'تيزي وزو', fr: 'Tizi Ouzou' },
    since: 2017,
    image: '/images/artist-sidi.jpg',
    imageAlt: {
      ar: 'سيدي بو في استوديو أمام جدار من المُركّبات الصوتية',
      fr: 'Sidi Bou devant un mur de synthétiseurs modulaires',
    },
    bio: {
      ar: 'مهندس صوت قبل أن يكون منتجًا، ويبني الآلات بنفسه. يشتغل على الأفروبيت والدَب مع إيقاعات أمازيغية، ويقول إن الميكساج الجيد يجب أن يُسمع على مكبّر سيارة.',
      fr: 'Ingénieur du son avant d’être producteur, il construit ses propres machines. Il mêle afrobeat et dub aux rythmes amazighs, avec une règle : un bon mix doit tenir dans une enceinte de voiture.',
    },
    quote: {
      ar: 'الميكساج الجيد لا يُسمع، يُحسّ.',
      fr: 'Un bon mix ne s’entend pas, il se ressent.',
    },
    tags: ['afrobeat', 'dub', 'amazigh'],
    links: [{ label: 'SoundCloud', handle: 'sidibou' }],
  },
]

export function artistBySlug(slug: string) {
  return artists.find((artist) => artist.slug === slug) ?? null
}
