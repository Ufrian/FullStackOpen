import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlogForm from './NewBlogForm'

test('calls event handler with correct details when new blog is created', async () => {
  const newBlog = {
    title: 'JavaScript Runs the World—Maybe Even Literally',
    author: 'SHEON HAN',
    url: 'https://www.wired.com/story/javascript-runs-the-world-maybe-literally/',
  }

  const mockAddBlog = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm addNewBlog={ mockAddBlog }/>)

  const sendBtn = screen.getByRole('button')

  const [title, author, url] = screen.getAllByRole('textbox')
  await user.type(title, newBlog.title)
  await user.type(author, newBlog.author)
  await user.type(url, newBlog.url)

  await user.click(sendBtn)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0]).toEqual(newBlog)
})