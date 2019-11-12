import { User } from '@/models/user'
import { BaseModel } from '@/models/base'
//import { Profile } from '@/models/profile'
//import { Application } from '@/models/application'
//import { Functionality } from '@/models/functionality'

export class ControlProfile extends BaseModel {
  constructor (
    public id: number,
    public user?: User,
    //public profile?: Profile,
    //public application?: Application,
    //public functionalityList?: Functionality[]
  ) { super(id) }
}
