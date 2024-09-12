const { test, expect, beforeEach, describe, mergeTests } = require('@playwright/test')
const { createBlog, loginWith, logOut } = require("./helper")

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
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "Super Title Test", "Gol D. Roger", "www.google.com")

      await expect(page.getByText("Super Title Test - Gol D. Roger")).toBeVisible()
    })

    describe("and a blog exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "Blog One", "Monkey D. Luffy", "www.google.com")
      })

      test("a blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click()
        await page.getByRole("button", { name: "like" }).click()

        await expect(page.getByText("Likes: 1")).toBeVisible()
      })

      describe("remove blog", () => {
        test("user who added blog can delete it", async ({ page }) => {
          await page.getByRole("button", { name: "view" }).click()
          
          page.on('dialog', async dialog => {
            await dialog.accept();
          })
          await page.getByRole("button", { name: "remove" }).click()

          await expect(page.getByText("Blog One - Monkey D. Luffy")).not.toBeVisible()
        })

        test("Other users cant see remove button", async ({ page, request }) => {
          await logOut(page)
          await request.post('/api/users', {
            data: {
              name: "Nakiri Ayame",
              username: "nakiriojou",
              password: "dochidochi"
            }
          })
          await loginWith(page, "nakiriojou", "dochidochi")
          await page.getByRole("button", { name: "view" }).click()
          await expect(page.getByRole("button", { name: "remove" })).not.toBeVisible()
        })
      })
    })


  })
})