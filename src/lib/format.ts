const AR = 'ar-DZ'
const FR = 'fr-DZ'

export function format(value: number, lang: 'ar' | 'fr') {
  return new Intl.NumberFormat(lang === 'ar' ? AR : FR).format(value)
}

export function clock(seconds: number) {
  const safe = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function longDate(iso: string, lang: 'ar' | 'fr') {
  const date = new Date(`${iso}T20:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(lang === 'ar' ? AR : FR, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function shortDate(iso: string, lang: 'ar' | 'fr') {
  const date = new Date(`${iso}T20:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(lang === 'ar' ? AR : FR, {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

export function validEmail(value: string) {
  const trimmed = value.trim()
  if (trimmed.length < 6 || trimmed.length > 120) return false
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(trimmed)
}

/** Algerian mobile and landline formats, digits only after cleanup. */
export function validDzPhone(value: string) {
  const digits = value.replace(/[^\d+]/g, '').replace(/^\+213/, '0')
  return /^0(5|6|7)\d{8}$/.test(digits) || /^0(2|3|4)\d{7}$/.test(digits)
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

/** Collapse whitespace and drop control characters before anything is stored. */
export function cleanText(value: string, max = 160) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export function cleanMessage(value: string, max = 1200) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

/** Booking reference such as TRB-4K7Q. */
export function makeReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(4)
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes)
  else for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256)
  const body = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
  return `TRB-${body}`
}
