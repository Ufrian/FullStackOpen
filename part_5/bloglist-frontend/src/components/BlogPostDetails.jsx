const BlogPostDetails = ({ blog, updateLikes, deleteBlog }) => {
  const increaseLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateLikes(updatedBlog)
  }

  const confirmDeleteWindow = () => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div>
      <a href={ blog.url } target="_blank" rel="noopener noreferrer" >{ blog.url }</a>
      <div>
        likes: { blog.likes }
        <button className="like-btn" onClick={ increaseLikes }>like</button>
      </div>
      { blog.user.name }
      <div>
        <button onClick={ confirmDeleteWindow }>delete</button>
      </div>
    </div>
  )
}

export default BlogPostDetails
