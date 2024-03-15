import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('Blog List Tests', () => {
  test('<Blog/> Display title and author but not likes or URL', () => {
    const blog = {
      title: 'Why Bloat Is Still Softwares Biggest Vulnerability',
      author: 'BERT HUBERT',
      url: 'https://spectrum.ieee.org/lean-software-development',
      likes: 2
    }

    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blog-display')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)

    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes.toString())
  })
})

