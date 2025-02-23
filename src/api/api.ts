import axios, { AxiosInstance } from "axios"

const api: AxiosInstance = axios.create({
  baseURL: "api.openweathermap.org",
})

export default api