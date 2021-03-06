import axios from 'axios'
const baseUrl = 'http://localhost:8001/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
//the login is an object not refactor