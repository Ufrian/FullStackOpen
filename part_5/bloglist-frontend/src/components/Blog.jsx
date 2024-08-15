import "./Blog.css"
import { useState } from "react"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const showView = { display: view ? '' : 'none' }

  const toggleBtnView = () => {
    setView(!view)
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
        <button>like</button>
      </div>
      <div>
        {blog.author}
      </div>
    </div>
  </div>
  )
}

export default Blog