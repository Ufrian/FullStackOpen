import Blog from './Blog'

const Blogs = ({ blogs, updateLikes }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={ updateLikes } />
      )}
    </div>
  )
}

export default Blogs
