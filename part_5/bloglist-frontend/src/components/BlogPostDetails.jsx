import { useState } from "react"

const BlogPostDetails = ({ blog, updateLikes }) => {
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const increaseLikes = () => {
    const updatedBlog = {...blog, likes: blogLikes + 1, user: blog.user.id}
    updateLikes(updatedBlog)
    setBlogLikes(prevLikes => prevLikes + 1)
  }

  return (
    <div>
      <a href={ blog.url } target="_blank" rel="noopener noreferrer" >{ blog.url }</a>
      <div>
        likes: { blogLikes }
        <button onClick={ increaseLikes }>like</button>
      </div>
      { blog.user.name }
    </div>
  )
}

export default BlogPostDetails
