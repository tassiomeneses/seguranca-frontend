import { BaseAPI } from '@/api/base.api'
import { ControlProfile } from '@/models/control_profile'
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface'

export class ControlProfileAPI extends BaseAPI<ControlProfile> {
  constructor () {
    super()
    this.apiUrl = `${this.apiUrl}/control-profile`
  }

  public findByUser (idUser: Number): AxiosObservable<ControlProfile[]> {
    return this.axios.get(`${this.apiUrl}/user/${idUser}`)
  }
}
