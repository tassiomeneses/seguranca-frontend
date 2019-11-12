import { AxiosRequestConfig } from 'axios'
import AuthenticationService from '@/services/authentication.service'

export const handleRequest = (config: AxiosRequestConfig) => {
  const token = AuthenticationService.token
  const authHeader = token ? `Bearer ${token}` : ''
  config.headers = {
    ...config.headers,
    'Authorization': authHeader,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  return config
}

export const handleErrorRequest = (error: any) => Promise.reject(error)
