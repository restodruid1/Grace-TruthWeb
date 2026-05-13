export interface EventItem {
  id: number
  title: string
  category: string
  date: Date
  time: string
  location: string
  description: string
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getMonthAbbr(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

export function filterEvents(events: EventItem[], category: string): EventItem[] {
  if (category === 'all') return events
  return events.filter(e => e.category === category)
}
