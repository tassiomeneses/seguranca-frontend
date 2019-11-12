import { BaseModel } from '@/models/base'
import { API_URL_SERVICE } from '@/commons/config'
import { handleRequest, handleErrorRequest } from '@/helpers/handle-request'
import { handleErrorResponse, handleResponse } from '@/helpers/handle-response'

import { Axios } from 'axios-observable'
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios'
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface'

export interface APIModel<T extends BaseModel> {
  body?: T;
  pageIndex?: number;
  pageSize?: number;
}

export class BaseAPI<T extends BaseModel> {
  protected axios: Axios
  protected apiUrl: string

  constructor () {
    this.axios = new Axios(this.buildAxiosInstance())
    this.apiUrl = API_URL_SERVICE
  }

  public getAll (): AxiosObservable<T[]> {
    return this.axios.get(`${this.apiUrl}/`)
  }

  public find (body: T): AxiosObservable<T[]> {
    return this.axios.post(`${this.apiUrl}/find`, body)
  }

  public paginator (model: APIModel<T>): AxiosObservable<any> {
    return this.axios.post(`${this.apiUrl}/page?` +
      `${this.getNumberPage(model.pageIndex)}&` +
      `${this.getNumberRegistries(model.pageSize)}`,
    model.body
    )
  }

  public show (id: number): AxiosObservable<T> {
    return this.axios.get(`${this.apiUrl}/${id}`)
  }

  public create (body: T): AxiosObservable<T> {
    return this.axios.post(`${this.apiUrl}/`, body)
  }

  public update (id: number, body: T): AxiosObservable<T> {
    return this.axios.put(`${this.apiUrl}/${id}`, body)
  }

  public delete (id: number): AxiosObservable<any> {
    return this.axios.delete(`${this.apiUrl}/${id}`)
  }

  protected getNumberPage (pageIndex = 0): string {
    return `page=${pageIndex}`
  }

  protected getNumberRegistries (pageSize = 15): string {
    return `size=${pageSize}`
  }

  private buildAxiosInstance (): AxiosInstance {
    const axiosInstance = axios.create({})
    this.requestInterceptor(axiosInstance)
    this.responseInterceptor(axiosInstance)

    return axiosInstance
  }

  private requestInterceptor (axios: AxiosInstance): void {
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => handleRequest(config),
      (error: any) => handleErrorRequest(error)
    )
  }

  private responseInterceptor (axios: AxiosInstance): void {
    axios.interceptors.response.use(
      (response: AxiosResponse) => handleResponse(response),
      (error: any) => handleErrorResponse(error)
    )
  }
}
