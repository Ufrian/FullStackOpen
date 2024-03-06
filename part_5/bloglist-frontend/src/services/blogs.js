import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${ newToken }`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObj) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogObj, config)
  return response.data
}

const update = async (blogObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blogObj.id}`

  const blogToUpdate = { ...blogObj,
    user: blogObj.user.id
  }

  const response = await axios.put(url, blogToUpdate, config)

  const updatedBlog = { ...response.data,
    user: blogObj.user
  }

  return updatedBlog
}

const deleteBlogById = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`

  const response = await axios.delete(url, config)
  return response.data
}

export default { create, deleteBlogById, getAll, setToken, update }
