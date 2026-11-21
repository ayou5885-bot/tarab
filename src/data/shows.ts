import type { Localized } from '../lib/types'

export type ShowStatus = 'onsale' | 'few' | 'soldout'

export type Show = {
  id: string
  date: string
  city: Localized
  venue: string
  artistSlug: string
  status: ShowStatus
  price: number
}

export const shows: Show[] = [
  {
    id: 'alg-0425',
    date: '2026-12-04',
    city: { ar: 'الجزائر العاصمة', fr: 'Alger' },
    venue: 'قاعة ابن زيدون',
    artistSlug: 'lila-barran',
    status: 'few',
    price: 2500,
  },
  {
    id: 'ora-1207',
    date: '2026-12-07',
    city: { ar: 'وهران', fr: 'Oran' },
    venue: 'مسرح عبد القادر علولة',
    artistSlug: 'kamal-16',
    status: 'onsale',
    price: 1800,
  },
  {
    id: 'bec-1212',
    date: '2026-12-12',
    city: { ar: 'بشار', fr: 'Béchar' },
    venue: 'دار الثقافة',
    artistSlug: 'nuh',
    status: 'soldout',
    price: 1500,
  },
  {
    id: 'cst-0116',
    date: '2027-01-16',
    city: { ar: 'قسنطينة', fr: 'Constantine' },
    venue: 'مسرح محمد العيد آل خليفة',
    artistSlug: 'yasmine',
    status: 'onsale',
    price: 2200,
  },
  {
    id: 'tiz-0123',
    date: '2027-01-23',
    city: { ar: 'تيزي وزو', fr: 'Tizi Ouzou' },
    venue: 'المسرح الجهوي',
    artistSlug: 'sidi-bou',
    status: 'onsale',
    price: 1600,
  },
  {
    id: 'alg-0206',
    date: '2027-02-06',
    city: { ar: 'الجزائر العاصمة', fr: 'Alger' },
    venue: 'استوديو طَرَب — جلسة مغلقة',
    artistSlug: 'nuh',
    status: 'few',
    price: 3000,
  },
]

export function showsByArtist(slug: string) {
  return shows.filter((show) => show.artistSlug === slug)
}
