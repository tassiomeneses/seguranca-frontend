import { User } from '@/models/user'
import { BaseAPI } from '@/api/base.api'
import { API_URL_AUTH, API_URL_SERVICE, ID_APP } from '@/commons/config'
import { IUserResetPassword } from '@/models/interface/IUserResetPassword'
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface'

export class UserAPI extends BaseAPI<User> {
  constructor () {
    super()
    this.apiUrl = `${this.apiUrl}/user`
  }

  public signin (usernameOrEmail: string, password: string): AxiosObservable<User> {
    return this.axios.post(`${API_URL_AUTH}`, { usernameOrEmail, password, application: ID_APP })
  }

  public forgotPassword (login: string, returnUrl?: string): AxiosObservable<any> {
    return this.axios.post(`${API_URL_SERVICE}/auth/forgot-password`, { login, returnUrl })
  }

  public resetPassword (data: IUserResetPassword): AxiosObservable<any> {
    return this.axios.post(`${API_URL_SERVICE}/auth/reset-password`, data)
  }
}
