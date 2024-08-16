import "./Blog.css"
import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [view, setView] = useState(false)
  const showView = { display: view ? '' : 'none' }

  const toggleBtnView = () => {
    setView(!view)
  }

  const increaseLikes = () => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(blogToUpdate)
  }
  
  return (
  <div className="blog-view">  
    <div>
      {blog.title} - {blog.author} 
    <button onClick={toggleBtnView} className="btn-view">{view ? "hide" : "view"}</button>  
    </div>
    <div style={showView}>
      <a target="_blank" rel="noopener" href={blog.url}>{blog.url}</a>
      <div>likes: {blog.likes}<button onClick={ increaseLikes }>like</button></div>
      <div>{blog.author}</div>
      <div>{blog.user.name}</div>
    </div>
  </div>
  )
}

export default Blog