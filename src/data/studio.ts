import type { Localized } from '../lib/types'

export type Service = {
  id: 'recording' | 'mixing' | 'mastering' | 'residency'
  name: Localized
  desc: Localized
  rate: number
  unit: Localized
}

export const services: Service[] = [
  {
    id: 'recording',
    name: { ar: 'تسجيل', fr: 'Enregistrement' },
    desc: {
      ar: 'قاعة رئيسية بمساحة ٦٨ م²، غرفة عازل، ومهندس صوت معك في كل ساعة.',
      fr: 'Grande salle de 68 m², cabine isolée et un ingénieur du son à chaque heure.',
    },
    rate: 4500,
    unit: { ar: 'للساعة', fr: 'par heure' },
  },
  {
    id: 'mixing',
    name: { ar: 'مكساج', fr: 'Mixage' },
    desc: {
      ar: 'مكساج تناظري على مسجل شريطي، مع مراجعتين مجانيتين بعد التسليم.',
      fr: 'Mixage analogique sur bande, avec deux révisions gratuites après livraison.',
    },
    rate: 12000,
    unit: { ar: 'للمقطوعة', fr: 'par titre' },
  },
  {
    id: 'mastering',
    name: { ar: 'ماسترينغ', fr: 'Mastering' },
    desc: {
      ar: 'ماسترينغ للإصدار الرقمي والفينيل، مع ملفات جاهزة للمنصات.',
      fr: 'Mastering pour digital et vinyle, fichiers prêts pour les plateformes.',
    },
    rate: 9000,
    unit: { ar: 'للمقطوعة', fr: 'par titre' },
  },
  {
    id: 'residency',
    name: { ar: 'إقامة فنية', fr: 'Résidence' },
    desc: {
      ar: 'أسبوع كامل في الاستوديو مع سكن ومطبخ، لثلاثة أفراد كحد أقصى.',
      fr: 'Une semaine complète en studio, logement et cuisine inclus, trois personnes maximum.',
    },
    rate: 180000,
    unit: { ar: 'للأسبوع', fr: 'par semaine' },
  },
]

export const gear = [
  { group: { ar: 'غرفة التحكّم', fr: 'Régie' }, items: ['SSL Big Six', 'Genelec 8341A', 'Avid HDX', 'Pro Tools Ultimate'] },
  { group: { ar: 'الميكروفونات', fr: 'Micros' }, items: ['Neumann U87', 'Coles 4038 ×2', 'Beyerdynamic M160', 'Shure SM7B'] },
  { group: { ar: 'الأجهزة', fr: 'Outboard' }, items: ['Chandler TG2', 'DBX 160X', 'Lexicon PCM91', 'Revox B77'] },
  { group: { ar: 'الآلات', fr: 'Instruments' }, items: ['Yamaha C3', 'Fender Rhodes', 'Moog Subsequent 37', 'Guembri, derbouka, bendir'] },
]

export const rooms = [
  {
    name: { ar: 'القاعة الرئيسية', fr: 'Grande salle' },
    size: '68 m²',
    desc: {
      ar: 'خشب وطوب ظاهر، وقت صدى ٠٫٦ ثانية. تكفي فرقة من ستة أفراد.',
      fr: 'Bois et brique apparente, réverbération de 0,6 s. Six musiciens maximum.',
    },
  },
  {
    name: { ar: 'غرفة التحكّم', fr: 'La régie' },
    size: '22 m²',
    desc: {
      ar: 'ميكساج تناظري وشاشتان، مع إمكانية العمل ليلًا بلا إزعاج.',
      fr: 'Mixage analogique, deux écrans, travail nocturne sans gêne.',
    },
  },
  {
    name: { ar: 'غرفة الكتابة', fr: 'La pièce d’écriture' },
    size: '12 m²',
    desc: {
      ar: 'بيانو، مُركّب صوتي، ومساحة هادئة للكتابة والتجريب.',
      fr: 'Piano, synthé et un espace calme pour écrire et chercher.',
    },
  },
]
