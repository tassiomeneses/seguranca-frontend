import { User } from '@/models/user'
import { UserAPI } from '@/api/user.api'
import { Pagination } from '@/models/pagination'
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface'

const userApi = new UserAPI()

const show = (id: number): AxiosObservable<User> => {
  console.log(id);
  return userApi.show(id)
}

const pageFindBy = (body: User, pageIndex?: number, pageSize?: number): AxiosObservable<Pagination<User>> => {
 console.log(body)
  return userApi.paginator({ body, pageIndex, pageSize })
}

const save = (profile: User): AxiosObservable<User> => {
  return userApi.create(profile)
}

const update = (id: number, profile: User): AxiosObservable<User> => {
  return userApi.update(id, profile)
}

const remove = (id: number): AxiosObservable<any> => {
  return userApi.delete(id)
}

export default {
  show,
  pageFindBy,
  save,
  update,
  remove
}
