import './style.css'
import { validateEmail, validateRequired, filterEvents, type EventItem } from './utils'

// ── Mobile navigation ──────────────────────────────────────────────────────
const hamburger = document.querySelector<HTMLButtonElement>('.nav__hamburger')
const navLinks = document.querySelector<HTMLElement>('.nav__links')

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open')
  navLinks?.classList.toggle('open')
})

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open')
    navLinks.classList.remove('open')
  })
})

// ── Contact form ───────────────────────────────────────────────────────────
const form = document.querySelector<HTMLFormElement>('#contact-form')
const formSuccess = document.querySelector<HTMLElement>('.form-success')
const formFields = document.querySelector<HTMLElement>('.form-fields')

form?.addEventListener('submit', e => {
  e.preventDefault()

  const nameEl    = form.querySelector<HTMLInputElement>('#name')
  const emailEl   = form.querySelector<HTMLInputElement>('#email')
  const messageEl = form.querySelector<HTMLTextAreaElement>('#message')

  let valid = true

  if (nameEl && !validateRequired(nameEl.value)) {
    nameEl.classList.add('error'); valid = false
  } else nameEl?.classList.remove('error')

  if (emailEl && !validateEmail(emailEl.value)) {
    emailEl.classList.add('error'); valid = false
  } else emailEl?.classList.remove('error')

  if (messageEl && !validateRequired(messageEl.value)) {
    messageEl.classList.add('error'); valid = false
  } else messageEl?.classList.remove('error')

  if (!valid) return

  // TODO: replace with Formspree / Netlify Forms integration
  if (formFields) formFields.style.display = 'none'
  if (formSuccess) formSuccess.classList.add('show')
})

form?.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('error'))
})

// ── Events filter ──────────────────────────────────────────────────────────
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn')
const eventCards    = document.querySelectorAll<HTMLElement>('.event-card')

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    const category = btn.dataset.filter ?? 'all'

    const allEvents: EventItem[] = Array.from(eventCards).map(card => ({
      id:          Number(card.dataset.id),
      title:       '',
      category:    card.dataset.category ?? '',
      date:        new Date(),
      time:        '',
      location:    '',
      description: '',
    }))

    const visible = new Set(filterEvents(allEvents, category).map(e => e.id))

    eventCards.forEach(card => {
      card.style.display = visible.has(Number(card.dataset.id)) ? '' : 'none'
    })
  })
})
