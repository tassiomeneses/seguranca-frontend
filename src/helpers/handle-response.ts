import { AxiosResponse } from 'axios'
import { API_URL_AUTH } from '@/commons/config'

import GlobalStore from '@/store/modules/global'
import AuthenticationService from '@/services/authentication.service'

export const handleResponse = (response: AxiosResponse) => {
  const { data } = response

  if ([401, 403].find(status => status === response.status)) {
    AuthenticationService.logout()
    return Promise.reject(data)
  }

  return data
}

export const handleErrorResponse = (error: any) => {
  const { config, response } = error
  const { data } = response
  let message = data.message

  if (config.url === API_URL_AUTH && (response.status === 401 || response.status === 400)) {
    message = 'Crendenciais inválidas, verifique as informações e tente novamente'
    GlobalStore.setSnackBar({ message, show: true, type: 'error' })
  } else if (response.status === 401) {
    GlobalStore.setBanner({ message, show: true, color: 'warning' })
  } else {
    GlobalStore.setSnackBar({ message, show: true, type: 'error' })
  }

  return Promise.reject(error)
}
