import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObj) => {
    const config = {
    headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, blogObj, config)
    return response.data
}

const update = async (id, blogObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObj)
  return response.data
}

export default { getAll, create, update, setToken }