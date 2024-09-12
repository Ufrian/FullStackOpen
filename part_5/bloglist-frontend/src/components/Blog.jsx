import "./Blog.css"
import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ blog, updateBlog, removeBlog, isBlogOwner }) => {
  const [view, setView] = useState(false)
  const showView = { display: view ? "" : "none" }

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

  const popUpRemoveBlog = () => {
    if (window.confirm(`Do you really want to remove ${blog.title}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blog-view">
      <div className="blog-header">
        {blog.title} - {blog.author}
        <button onClick={toggleBtnView} className="btn-view">{view ? "hide" : "view"}</button>
      </div>
      <div style={showView}>
        <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a>
        <div>likes: {blog.likes}<button onClick={ increaseLikes }>like</button></div>
        <div>{blog.author}</div>
        <div>{blog.user.name}</div>
        {isBlogOwner(blog.user.name)
          ? <button onClick={popUpRemoveBlog}>remove</button>
          : ""
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog