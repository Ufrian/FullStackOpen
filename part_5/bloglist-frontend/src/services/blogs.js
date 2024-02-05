import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}



const getAllReq = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }