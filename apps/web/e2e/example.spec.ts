import { expect, test } from '@playwright/test';

test('should redirect to login when accessing a protected route', async ({ page }) => {
  await page.goto('/');

  const el = page.getByText('Login')

  expect(el).toBeDefined();
});

test('should login with correct credentials', async ({ page }) => {
  await page.goto('/auth/login')

  await page.getByLabel('Email').fill('example@domain.com')
  await page.getByLabel('Password').fill('Test1234')

  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForURL('/')

  const home = page.getByText('Home')
  expect(home).toBeDefined()
  expect(page.url()).toBe('/')
})