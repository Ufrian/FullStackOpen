const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginWith } = require("./helper")

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
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
      await loginWith(page, "pekora", "pekochan")

      await expect(page.getByText("Usada Pekora logged in")).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, "kaela", "konkaela")

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password') 
      
      await expect(page.getByText("Kaela Kovalskia logged in")).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "pekora", "pekochan")
    })
  
    test.only('a new blog can be created', async ({ page }) => {
      await createBlog(page, "Super Title Test", "Gol D. Roger", "www.google.com.br")

      await expect(page.getByText("Super Title Test - Gol D. Roger")).toBeVisible()
    })
  })
})