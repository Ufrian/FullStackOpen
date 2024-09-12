const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/testing/reset')
    await request.post('/api/users', {
      data: {
        name: "Usada Pekora",
        username: "pekora",
        password: "pekochan"
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('LOG IN')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill("pekora")
      await page.getByTestId('password').fill("pekochan")
      await page.getByRole("button", { name: "Login" }).click()

      await expect(page.getByText("Usada Pekora logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill("kaela")
      await page.getByTestId('password').fill("konkaela")
      await page.getByRole("button", { name: "Login" }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password') 
      
      await expect(page.getByText("Kaela Kovalskia logged in")).not.toBeVisible()
    })
  })
})