var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // Receives a list of blog posts as a parameter and returns the total sum of likes in all of the blog posts.
  return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const fav = blogs.reduce((prev, blog) => prev.likes > blog.likes ? prev : blog)

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const mostBlogs = (blogs) => {
  // Receives an array of blogs and returns the author who has the largest amount of blogs.
  const mostBlogger = _
  .chain(blogs)
  .countBy('author')
  .entries()
  .maxBy(_.last)
  .value()

  return mostBlogger ? {
    author: mostBlogger[0],
    blogs: mostBlogger[1]
  } : []
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}