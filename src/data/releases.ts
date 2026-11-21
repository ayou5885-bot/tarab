import type { Localized } from '../lib/types'

export type Groove = {
  bpm: number
  root: number
  scale: number[]
  kick: number[]
  snare: number[]
  hat: number[]
  /** scale degree per 16th note, -1 = silence */
  bass: number[]
  pad: number[]
  lead: number[]
  swing: number
  filter: number
}

export type Track = { n: number; title: Localized; length: string }

export type Release = {
  slug: string
  title: Localized
  artistSlug: string
  year: number
  format: Localized
  catalog: string
  cover: string
  coverAlt: Localized
  runtime: string
  tags: string[]
  note: Localized
  credits: Localized
  tracks: Track[]
  groove: Groove
}

const rest = (map: Record<number, number>): number[] =>
  Array.from({ length: 16 }, (_, i) => map[i] ?? -1)

export const releases: Release[] = [
  {
    slug: 'harra',
    title: { ar: 'حَرّة', fr: 'Harra' },
    artistSlug: 'lila-barran',
    year: 2025,
    format: { ar: 'ألبوم', fr: 'Album' },
    catalog: 'TRB-014',
    cover: '/images/cover-harra.jpg',
    coverAlt: {
      ar: 'غلاف حَرّة: كولاج أسود وأخضر ليموني',
      fr: 'Pochette de Harra : collage noir et vert citron',
    },
    runtime: '27:40',
    tags: ['raï', 'pop', 'électro'],
    note: {
      ar: 'ثمانية مقاطع سُجّلت على مدى سنتين بين الجزائر العاصمة ووهران. الحرارة في العنوان ليست عن الطقس فقط.',
      fr: 'Huit titres captés sur deux ans entre Alger et Oran. La chaleur du titre ne parle pas que du climat.',
    },
    credits: {
      ar: 'كلمات وألحان: ليلى برّان · إنتاج: سيدي بو · تسجيل ومكساج: استوديو طَرَب، ٢٠٢٥',
      fr: 'Textes et musiques : Lila Barran · Production : Sidi Bou · Prise et mixage : Studio Tarab, 2025',
    },
    tracks: [
      { n: 1, title: { ar: 'مفتاح', fr: 'Miftah' }, length: '3:12' },
      { n: 2, title: { ar: 'حَرّة', fr: 'Harra' }, length: '3:48' },
      { n: 3, title: { ar: 'لا تقل لي', fr: 'Ne me dis pas' }, length: '3:05' },
      { n: 4, title: { ar: 'باب الوادي', fr: 'Bab El Oued' }, length: '4:21' },
      { n: 5, title: { ar: 'ضوء خفيف', fr: 'Lumière faible' }, length: '2:58' },
      { n: 6, title: { ar: 'صباح', fr: 'Sabah' }, length: '3:33' },
      { n: 7, title: { ar: 'ماء وملح', fr: 'Eau et sel' }, length: '3:44' },
      { n: 8, title: { ar: 'آخر الليل', fr: 'Fin de nuit' }, length: '2:59' },
    ],
    groove: {
      bpm: 96,
      root: 45,
      scale: [0, 2, 3, 5, 7, 8, 10],
      kick: [0, 6, 8, 14],
      snare: [4, 12],
      hat: [2, 4, 6, 10, 12, 14],
      bass: rest({ 0: 0, 3: 0, 6: 3, 8: 0, 11: 0, 14: 5 }),
      pad: [0, 2, 4],
      lead: rest({ 6: 7, 14: 4 }),
      swing: 0.06,
      filter: 1,
    },
  },
  {
    slug: 'seize',
    title: { ar: '١٦ / الرصيف', fr: '16 / Le trottoir' },
    artistSlug: 'kamal-16',
    year: 2024,
    format: { ar: 'أسطوانة مطوّلة', fr: 'EP' },
    catalog: 'TRB-011',
    cover: '/images/cover-16.jpg',
    coverAlt: {
      ar: 'غلاف ١٦: صورة مكبّر صوت بتباين عالٍ',
      fr: 'Pochette de 16 : haut-parleur en fort contraste',
    },
    runtime: '16:20',
    tags: ['rap', 'drill', 'darija'],
    note: {
      ar: 'خمسة مقاطع مسجّلة في غرفة نوم بوهران، بميكروفون واحد ودراجة هوائية تُشحن في الممر.',
      fr: 'Cinq titres enregistrés dans une chambre d’Oran : un seul micro, un vélo qui charge dans le couloir.',
    },
    credits: {
      ar: 'كتابة وأداء: كمال ١٦ · إنتاج: كمال ١٦ · مكساج: سيدي بو',
      fr: 'Écriture et interprétation : Kamal 16 · Production : Kamal 16 · Mixage : Sidi Bou',
    },
    tracks: [
      { n: 1, title: { ar: 'الرصيف', fr: 'Le trottoir' }, length: '3:02' },
      { n: 2, title: { ar: 'ساعة ٤', fr: '4 heures' }, length: '3:26' },
      { n: 3, title: { ar: 'كرتون', fr: 'Carton' }, length: '2:54' },
      { n: 4, title: { ar: 'بلا شبكة', fr: 'Hors réseau' }, length: '3:11' },
      { n: 5, title: { ar: 'رجوع', fr: 'Retour' }, length: '3:47' },
    ],
    groove: {
      bpm: 84,
      root: 41,
      scale: [0, 3, 5, 7, 10],
      kick: [0, 7, 10],
      snare: [4, 12],
      hat: [2, 6, 10, 14],
      bass: rest({ 0: 0, 4: 0, 7: 3, 10: 0, 14: 1 }),
      pad: [0, 2, 4],
      lead: rest({ 12: 7 }),
      swing: 0.1,
      filter: 0.8,
    },
  },
  {
    slug: 'leil-becheref',
    title: { ar: 'ليل بشار', fr: 'Nuit à Béchar' },
    artistSlug: 'nuh',
    year: 2025,
    format: { ar: 'ألبوم', fr: 'Album' },
    catalog: 'TRB-013',
    cover: '/images/cover-leil.jpg',
    coverAlt: {
      ar: 'غلاف ليل بشار: كثبان صحراوية بطباعة ليمونية',
      fr: 'Pochette de Nuit à Béchar : dunes en trame citron',
    },
    runtime: '34:05',
    tags: ['gnawa', 'ambient', 'diwan'],
    note: {
      ar: 'تسجيل مباشر في ممر واحد، بلا مونتاج. المقطوعات تتجاوز العشر دقائق ولا تخشى الصمت.',
      fr: 'Captation live en une prise, sans montage. Des pièces de plus de dix minutes qui n’ont pas peur du silence.',
    },
    credits: {
      ar: 'قنبري وغناء: نُوح · إلكترونيات: نُوح وسيدي بو · تسجيل: استوديو طَرَب',
      fr: 'Guembri et voix : Nūh · Électronique : Nūh & Sidi Bou · Prise : Studio Tarab',
    },
    tracks: [
      { n: 1, title: { ar: 'مدخل', fr: 'Entrée' }, length: '4:44' },
      { n: 2, title: { ar: 'ليل بشار', fr: 'Nuit à Béchar' }, length: '6:12' },
      { n: 3, title: { ar: 'غبار', fr: 'Poussière' }, length: '5:31' },
      { n: 4, title: { ar: 'ممر', fr: 'Couloir' }, length: '4:08' },
      { n: 5, title: { ar: 'سيدي بلال', fr: 'Sidi Belal' }, length: '5:26' },
      { n: 6, title: { ar: 'مفتاح الليل', fr: 'Clé de nuit' }, length: '4:02' },
      { n: 7, title: { ar: 'خروج', fr: 'Sortie' }, length: '4:02' },
    ],
    groove: {
      bpm: 108,
      root: 43,
      scale: [0, 2, 3, 5, 7, 9, 10],
      kick: [0, 3, 6, 10, 12],
      snare: [8],
      hat: [1, 2, 4, 5, 7, 9, 11, 13, 15],
      bass: rest({ 0: 0, 3: 0, 5: 3, 7: 0, 10: 5, 12: 3 }),
      pad: [0, 2, 4, 6],
      lead: rest({ 5: 9, 13: 4 }),
      swing: 0.04,
      filter: 1.2,
    },
  },
  {
    slug: 'sahla',
    title: { ar: 'سَهلة', fr: 'Sahla' },
    artistSlug: 'yasmine',
    year: 2023,
    format: { ar: 'أسطوانة مطوّلة', fr: 'EP' },
    catalog: 'TRB-007',
    cover: '/images/cover-sahla.jpg',
    coverAlt: {
      ar: 'غلاف سَهلة: يد تمسك كابل ميكروفون بطباعة حجرية',
      fr: 'Pochette de Sahla : main et câble de micro en trame',
    },
    runtime: '14:12',
    tags: ['soul', 'jazz', 'nay'],
    note: {
      ar: 'أربع مقطوعات على البيانو والناي، سُجّلت في جلسة واحدة بعد منتصف الليل ولم تُعدّل إلا قليلًا.',
      fr: 'Quatre pièces piano-nay captées en une seule séance après minuit, à peine retouchées.',
    },
    credits: {
      ar: 'غناء وبيانو: ياسمين سعداوي · ناي: ع. مرزوق · تسجيل: استوديو طَرَب',
      fr: 'Voix et piano : Yasmine Sadaoui · Nay : A. Merzouk · Prise : Studio Tarab',
    },
    tracks: [
      { n: 1, title: { ar: 'سَهلة', fr: 'Sahla' }, length: '3:58' },
      { n: 2, title: { ar: 'قسنطينة، مساء', fr: 'Constantine, le soir' }, length: '3:24' },
      { n: 3, title: { ar: 'ظلّ', fr: 'Ombre' }, length: '3:36' },
      { n: 4, title: { ar: 'مفتوحة', fr: 'Ouverte' }, length: '3:14' },
    ],
    groove: {
      bpm: 74,
      root: 48,
      scale: [0, 2, 3, 5, 7, 8, 10],
      kick: [0, 8],
      snare: [4, 12],
      hat: [2, 6, 10, 14],
      bass: rest({ 0: 0, 6: 3, 8: 5, 14: 2 }),
      pad: [0, 2, 4, 6],
      lead: rest({ 2: 4, 10: 7 }),
      swing: 0.02,
      filter: 0.9,
    },
  },
]

export function releaseBySlug(slug: string) {
  return releases.find((release) => release.slug === slug) ?? null
}

export function releasesByArtist(slug: string) {
  return releases.filter((release) => release.artistSlug === slug)
}
