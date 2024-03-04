const BlogPostDetails = ({ blog }) => {
  return (
    <div>
      <a href={ blog.url } target="_blank" rel="noopener noreferrer" >{ blog.url }</a>
      <div>
        likes: { blog.likes }
        <button>like</button>
      </div>
      { blog.user.name }
    </div>
  )
}

export default BlogPostDetails
