import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken ) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlogObj) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlogObj, config)
  return response.data
}

const update = async (id, newBlogObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlogObj)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create,  setToken, update, remove }