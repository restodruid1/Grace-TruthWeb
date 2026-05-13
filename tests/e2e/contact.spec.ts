import { test, expect } from '@playwright/test'

test.describe('Contact page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact.html')
  })

  test('contact form is visible', async ({ page }) => {
    await expect(page.locator('#contact-form')).toBeVisible()
  })

  test('all required form fields are present', async ({ page }) => {
    await expect(page.locator('#name')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#subject')).toBeVisible()
    await expect(page.locator('#message')).toBeVisible()
  })

  test('submit with empty fields marks name and email as errors', async ({ page }) => {
    await page.click('button[type="submit"]')
    await expect(page.locator('#name')).toHaveClass(/error/)
    await expect(page.locator('#email')).toHaveClass(/error/)
    await expect(page.locator('#message')).toHaveClass(/error/)
  })

  test('error class is removed when user starts typing in the field', async ({ page }) => {
    // Trigger errors first
    await page.click('button[type="submit"]')
    await expect(page.locator('#name')).toHaveClass(/error/)

    // Start typing — error should clear
    await page.fill('#name', 'J')
    await expect(page.locator('#name')).not.toHaveClass(/error/)
  })

  test('shows success message after valid form submission', async ({ page }) => {
    await page.fill('#name', 'Jane Smith')
    await page.fill('#email', 'jane@example.com')
    await page.selectOption('#subject', 'visit')
    await page.fill('#message', 'I would love to visit your church this Sunday.')

    await page.click('button[type="submit"]')

    await expect(page.locator('.form-success')).toBeVisible()
    await expect(page.locator('.form-fields')).not.toBeVisible()
  })
})
