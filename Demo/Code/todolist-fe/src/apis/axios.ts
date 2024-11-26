import axios, { AxiosError } from "axios"
import { ErrorResponse } from "./response.type"

const API_URL = "__API_URL__"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Encrypted: "true"
  }
  //   withCredentials: true
})

axiosInstance.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: {
        ...response.data,
        success: true
      }
    }
  },
  (error: AxiosError<ErrorResponse>) => {
    return { ...error.response, success: false } as ErrorResponse
  }
)

export default axiosInstance
