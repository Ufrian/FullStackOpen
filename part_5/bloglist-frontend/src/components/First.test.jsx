import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog List Tests', () => {
  const blog = {
    title: 'Why Bloat Is Still Softwares Biggest Vulnerability',
    author: 'BERT HUBERT',
    url: 'https://spectrum.ieee.org/lean-software-development',
    likes: 2,
    user: {
      username: 'pekora',
      name: 'Usada Pekora',
    },
  }

  test('<Blog/> Display title and author but not likes or URL', () => {
    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blog-display')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)

    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes.toString())
  })

  test('Likes and URL are displayed after button clicked', async () => {
    const toggleBtn = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} toggleBtn={toggleBtn} />)

    const btn = screen.getByRole('button')
    await user.click(btn)

    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText(`likes: ${blog.likes}`)).toBeDefined()
  })
})

