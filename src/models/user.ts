import { BaseModel } from '@/models/base'
//import { Functionality } from '@/models/functionality'
//import { Company } from '@/models/company'
//import { Profile } from '@/models/profile'
//import { Sector } from '@/models/sector'

export class User extends BaseModel {
  constructor (
    public id: number,
    public name?: string,
    public login?: string,
    public cpf?: string,
    public email?: string,
    public firstAccess?: boolean,
    public roles?: String[],
    public active?: boolean,
    public gender?: string,
    public birthPlace?: string,
    public nationality?: string,
    public birthDate?: Date,
    public lastAccess?: Date,
    public controlProfiles?: Object[]
  ) { super(id) }
}
