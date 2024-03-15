import { useState } from 'react'

import BlogPostDetails from './BlogPostDetails'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [show, setShow] = useState(false)

  const btnLabel = show ? 'hide' : 'show'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleBtn = () => {
    setShow(!show)
  }

  return (
    <div style={ blogStyle }>
      <div className='blog-display'>
        { blog.title } - { blog.author }
        <button onClick={ toggleBtn }>{ btnLabel }</button>
      </div>
      { show && <BlogPostDetails blog={blog} updateLikes={ updateLikes } deleteBlog={ deleteBlog } /> }
    </div>
  )
}

export default Blog
