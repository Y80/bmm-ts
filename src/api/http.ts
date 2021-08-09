import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({ baseURL: 'http://localhost:7890/bmm' })
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError) => {
    let msg = error.message
    if (error.response?.data.message) msg = error.response.data.message
    window.$message.error(msg)

    return Promise.reject()
  }
)

export default axiosInstance
