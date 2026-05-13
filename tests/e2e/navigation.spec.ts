import { test, expect } from '@playwright/test'

test.describe('Site navigation', () => {
  test('home page loads and shows the church name in the title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Grace and Truth Chapel/)
  })

  test('home hero contains the church name', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('.hero h1')
    await expect(hero).toContainText('Grace and Truth Chapel')
  })

  test('home page shows service times section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#services')).toBeVisible()
    await expect(page.locator('.service-card')).toHaveCount(4)
  })

  test('navigates to About page via nav link', async ({ page }) => {
    await page.goto('/')
    await page.click('nav a[href="/about.html"]')
    await expect(page).toHaveURL(/about\.html/)
    await expect(page).toHaveTitle(/About Us/)
  })

  test('navigates to Events page via nav link', async ({ page }) => {
    await page.goto('/')
    await page.click('nav a[href="/events.html"]')
    await expect(page).toHaveURL(/events\.html/)
  })

  test('navigates to Staff page via nav link', async ({ page }) => {
    await page.goto('/')
    await page.click('nav a[href="/staff.html"]')
    await expect(page).toHaveURL(/staff\.html/)
    await expect(page.locator('.staff-card')).toHaveCount(6)
  })

  test('navigates to Contact page via nav link', async ({ page }) => {
    await page.goto('/')
    await page.click('nav a[href="/contact.html"]')
    await expect(page).toHaveURL(/contact\.html/)
  })

  test('footer links are present on every page', async ({ page }) => {
    for (const path of ['/', '/about.html', '/events.html', '/staff.html', '/contact.html']) {
      await page.goto(path)
      await expect(page.locator('footer')).toBeVisible()
      const footerLinks = page.locator('footer .footer__links a')
      await expect(footerLinks).toHaveCount(5)
    }
  })
})
