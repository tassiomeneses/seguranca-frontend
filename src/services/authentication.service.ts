import { router } from '@/router'
import { Auth } from '@/models/auth'
import { User } from '@/models/user'
import { UserAPI } from '@/api/user.api'
import { BASE_PATH_APP } from '@/commons/config'
import { IUserResetPassword } from '@/models/interface/IUserResetPassword'

import JwtDecode from 'jwt-decode'
import GlobalStore from '@/store/modules/global'

import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs'

const AUTH = `${BASE_PATH_APP}-auth`
const userApi = new UserAPI()

const currentUser = () => {
  const { token = null, functionalities = [] } = JSON.parse(localStorage.getItem(AUTH)) || {}

  if (!token) return null

  const { sub, name, username, email, roles, cpf, firstAccess } = JwtDecode(token)
  return new User(sub, name, username, cpf, email, firstAccess, roles, true, functionalities)
}

const userSubject = new BehaviorSubject(currentUser())

userSubject.subscribe(user => {
  if (GlobalStore) {
    GlobalStore.setUser(user)
  }
})

const login = (usernameOrEmail: string, password: string, returnUrl?: string): Observable<User> => {
  return userApi
    .signin(usernameOrEmail, password)
    .pipe(map(response => setSession(response, returnUrl)))
}

const logout = (): void => {
  localStorage.removeItem(AUTH)
  userSubject.next(null)
  router.push('/login')
}

const setSession = (authResult: any, returnUrl: any): User => {
  buildAuth(authResult)

  userSubject.next(currentUser())
  router.push(returnUrl || '/')

  return userSubject.value
}

const buildAuth = ({ token }: Auth) => {
  localStorage.setItem(AUTH, JSON.stringify({ token }))
}

const currentToken = () => {
  const { token = null } = JSON.parse(localStorage.getItem(AUTH)) || {}
  return token
}

const forgotPassword = (usernameOrEmail: string, returnUrl?: string): Observable<any> => {
  return userApi.forgotPassword(usernameOrEmail, returnUrl)
}

const resetPassword = (data: IUserResetPassword): Observable<any> => {
  return userApi.resetPassword(data)
}

export default {
  login,
  logout,
  forgotPassword,
  resetPassword,
  get currentUserValue () {
    return userSubject.value
  },
  get token () {
    return currentToken()
  },
}
