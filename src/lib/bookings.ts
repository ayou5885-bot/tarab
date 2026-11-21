export const BOOKING_KEY = 'tarab.bookings.v1'
export const BOOKING_CAP = 20

export type SessionType = 'recording' | 'mixing' | 'mastering' | 'residency'

export type Booking = {
  reference: string
  name: string
  email: string
  phone: string
  session: SessionType
  date: string
  hours: number
  project: string
  notes: string
  createdAt: string
}

const SESSION_TYPES: SessionType[] = ['recording', 'mixing', 'mastering', 'residency']

function read(): unknown[] {
  try {
    const raw = window.localStorage.getItem(BOOKING_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function isBooking(value: unknown): value is Booking {
  if (!value || typeof value !== 'object') return false
  const b = value as Record<string, unknown>
  return (
    typeof b.reference === 'string' &&
    typeof b.name === 'string' &&
    typeof b.email === 'string' &&
    typeof b.phone === 'string' &&
    typeof b.session === 'string' &&
    SESSION_TYPES.includes(b.session as SessionType) &&
    typeof b.date === 'string' &&
    typeof b.hours === 'number' &&
    Number.isFinite(b.hours) &&
    typeof b.project === 'string' &&
    typeof b.notes === 'string' &&
    typeof b.createdAt === 'string'
  )
}

export function saveBooking(booking: Booking) {
  const next = [booking, ...read().filter(isBooking)].slice(0, BOOKING_CAP)
  try {
    window.localStorage.setItem(BOOKING_KEY, JSON.stringify(next))
  } catch {
    /* storage full or blocked: the confirmation screen still works */
  }
}

export function loadBooking(reference: string): Booking | null {
  const found = read().filter(isBooking).find((item) => item.reference === reference)
  return found ?? null
}
