import Blog from './Blog'

const Blogs = ({ blogs, updateLikes, deleteBlog }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={ updateLikes }  deleteBlog={ deleteBlog } />
      )}
    </div>
  )
}

export default Blogs
