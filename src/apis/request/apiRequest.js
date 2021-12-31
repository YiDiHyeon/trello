import axios from 'axios'

const apiRequest = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 50000,
})

apiRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  },
)

// response interceptor
apiRequest.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    } else {
      return response
    }
  },
  (error) => {
    console.error(error.response)
    if (error && error.response) {
      console.log(error)
      return Promise.reject(error.response.data)
    } else {
      console.log(error)
      // alert('서버 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.')
      return Promise.reject(null)
    }
  },
)

export default apiRequest
