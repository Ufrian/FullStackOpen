import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPersonObj => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const delRequest = id => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, delRequest }