import { useState } from "react"

const BlogPostDetails = ({ blog, updateLikes }) => {

  const increaseLikes = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    updateLikes(updatedBlog)
  }

  return (
    <div>
      <a href={ blog.url } target="_blank" rel="noopener noreferrer" >{ blog.url }</a>
      <div>
        likes: { blog.likes }
        <button onClick={ increaseLikes }>like</button>
      </div>
      { blog.user.name }
    </div>
  )
}

export default BlogPostDetails
