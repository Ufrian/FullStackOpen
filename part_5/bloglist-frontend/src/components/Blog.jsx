import "./Blog.css"
import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [view, setView] = useState(false)

  const showView = { display: view ? '' : 'none' }

  const toggleBtnView = () => {
    setView(!view)
  }

  const increaseLikes = () => {
    const blogToUpdate = {...blog, likes: blog.likes + 1}
    updateBlog(blogToUpdate)
  }
  
  return (
  <div className="blog-view">  
    <div>
      {blog.title} - {blog.author} 
    <button onClick={toggleBtnView} className="btn-view">{view ? "hide" : "view"}</button>  
    </div>
    <div style={showView}>
      <div>
        {blog.url}
      </div>
      <div>
        likes: {blog.likes}
        <button onClick={ increaseLikes }>like</button>
      </div>
      <div>
        {blog.author}
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>
  </div>
  )
}

export default Blog