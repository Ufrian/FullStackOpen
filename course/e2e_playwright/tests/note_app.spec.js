const { beforeEach, describe, expect, test } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note App',() => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Nanashi Mumei',
        username: 'mooms',
        password: 'mumei'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    
    await expect(page.getByText("Note app, Department of Computer Science, University of Helsinki 2024")).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    
    await page.getByTestId('username').fill('mooms')
    await page.getByTestId('password').fill('mumei')

    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Nanashi Mumei logged in')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'mooms', 'mumei')
    await expect(page.getByText('Nanashi Mumei logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('pekora')
    await page.getByTestId('password').fill('pekochan')
    await page.getByRole('button', { name: 'login' }).click()

    // await expect(page.getByText('Wrong credentials')).toBeVisible()
    
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    // await expect(errorDiv).toHaveCSS('border-style', 'solid')
    // await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    // await expect(page.getByText('Nanashi Mumei logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mooms', 'mumei')
    })
  
    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright', true)
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  
    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note', true)
        await createNote(page, 'second note', true)
  
        await createNote(page, 'third note', true)
      })
  
      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherdNoteElement = await otherNoteText.locator('..')
      
        await otherdNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherdNoteElement.getByText('make important')).toBeVisible()
      })
    })
  }) 
})