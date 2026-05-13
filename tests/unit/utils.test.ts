import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validateRequired,
  formatEventDate,
  getMonthAbbr,
  filterEvents,
  type EventItem,
} from '../../src/utils'

// ── validateEmail ──────────────────────────────────────────────────────────
describe('validateEmail', () => {
  it('accepts a standard email', () => {
    expect(validateEmail('info@graceandtruthchapel.org')).toBe(true)
  })

  it('accepts email with dots and plus', () => {
    expect(validateEmail('user.name+tag@example.co.uk')).toBe(true)
  })

  it('rejects an empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('rejects a string with no @ symbol', () => {
    expect(validateEmail('notanemail')).toBe(false)
  })

  it('rejects a string that starts with @', () => {
    expect(validateEmail('@nodomain.com')).toBe(false)
  })

  it('trims surrounding whitespace before checking', () => {
    expect(validateEmail('  user@example.com  ')).toBe(true)
  })
})

// ── validateRequired ───────────────────────────────────────────────────────
describe('validateRequired', () => {
  it('returns true for a non-empty string', () => {
    expect(validateRequired('Hello')).toBe(true)
  })

  it('returns false for an empty string', () => {
    expect(validateRequired('')).toBe(false)
  })

  it('returns false for a whitespace-only string', () => {
    expect(validateRequired('   ')).toBe(false)
  })

  it('returns true for a single character', () => {
    expect(validateRequired('a')).toBe(true)
  })
})

// ── formatEventDate ────────────────────────────────────────────────────────
describe('formatEventDate', () => {
  it('includes the month name', () => {
    const date = new Date(2026, 5, 15) // June 15, 2026
    expect(formatEventDate(date)).toContain('June')
  })

  it('includes the day number', () => {
    const date = new Date(2026, 5, 15)
    expect(formatEventDate(date)).toContain('15')
  })

  it('includes the year', () => {
    const date = new Date(2026, 5, 15)
    expect(formatEventDate(date)).toContain('2026')
  })
})

// ── getMonthAbbr ───────────────────────────────────────────────────────────
describe('getMonthAbbr', () => {
  it('returns a 3-letter uppercased month abbreviation', () => {
    const june = new Date(2026, 5, 1)
    expect(getMonthAbbr(june)).toBe('JUN')
  })

  it('handles December correctly', () => {
    const dec = new Date(2026, 11, 25)
    expect(getMonthAbbr(dec)).toBe('DEC')
  })
})

// ── filterEvents ───────────────────────────────────────────────────────────
describe('filterEvents', () => {
  const events: EventItem[] = [
    { id: 1, title: 'Sunday Service',  category: 'service',   date: new Date(), time: '10:00 AM', location: 'Main Sanctuary', description: '' },
    { id: 2, title: 'Youth Night',     category: 'youth',     date: new Date(), time: '6:00 PM',  location: 'Fellowship Hall', description: '' },
    { id: 3, title: 'Community BBQ',   category: 'community', date: new Date(), time: '12:00 PM', location: 'Church Grounds',  description: '' },
    { id: 4, title: 'Bible Study',     category: 'study',     date: new Date(), time: '7:00 PM',  location: 'Classroom B',     description: '' },
  ]

  it('returns all events when category is "all"', () => {
    expect(filterEvents(events, 'all')).toHaveLength(4)
  })

  it('filters to only youth events', () => {
    const result = filterEvents(events, 'youth')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Youth Night')
  })

  it('filters to only community events', () => {
    const result = filterEvents(events, 'community')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(3)
  })

  it('returns an empty array for a category with no matches', () => {
    expect(filterEvents(events, 'sports')).toHaveLength(0)
  })

  it('does not mutate the original array', () => {
    filterEvents(events, 'youth')
    expect(events).toHaveLength(4)
  })
})
