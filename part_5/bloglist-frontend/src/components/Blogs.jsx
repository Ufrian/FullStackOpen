import Blog from './Blog'

const Blogs = ({ name, blogs, logOut }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {name} logged in
      <button type='submit' onClick={logOut}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs 