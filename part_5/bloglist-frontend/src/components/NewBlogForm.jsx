const NewBlogForm = ({ newBlog, handleNewBlog, addNewBlog }) => {
  return (
    <div>
      <h2>Create new Blog</h2>
      <div>
        title:
        <input
          type='text'
          name='title'
          value={newBlog.title}
          onChange={handleNewBlog} 
        />
      </div>
      <div>
        author:
        <input
          type='text'
          name='author'
          value={newBlog.author}
          onChange={handleNewBlog} 
        />
      </div>
      <div>
        url:
        <input
          type='text'
          name='url'
          value={newBlog.url}
          onChange={handleNewBlog} 
        />
      </div>
      <button type='submit' onClick={ addNewBlog }>create</button>
    </div>
  )
}

export default NewBlogForm