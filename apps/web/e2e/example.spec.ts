import { expect, test } from '@playwright/test'

test('should redirect to login when accessing a protected route', async ({
  page,
}) => {
  await page.goto('/dashboard')

  expect(page.getByText('Login')).toBeVisible()
})

test('should login with correct credentials', async ({ page }) => {
  await page.goto('/auth/login')

  await page.getByLabel('Email').fill('example@domain.com')
  await page.getByLabel('Password').fill('Test1234')

  await page.getByText('Login').click()
  await page.waitForURL('http://localhost:3000/')

  const home = page.getByText('Home')
  expect(home).toBeVisible()
  expect(page.url()).toBe('http://localhost:3000/')
})
