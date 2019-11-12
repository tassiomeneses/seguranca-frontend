import { ControlProfile } from '@/models/control_profile'
import { ControlProfileAPI } from '@/api/control_profile.service'
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface'

const api = new ControlProfileAPI()

const findByUser = (idUser: Number): AxiosObservable<ControlProfile[]> => {
  return api.findByUser(idUser)
}

export default {
  findByUser
}
