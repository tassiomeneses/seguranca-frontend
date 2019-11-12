import store from '@/store'
import AuthenticationService from '@/services/authentication.service'

import { User } from '@/models/user'
import { IBanner } from '@/models/interface/IBanner'
import { ISnackbar } from '@/models/interface/ISnackbar'
import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators'

@Module({
  dynamic: true,
  namespaced: true,
  name: 'global',
  store
})
class GlobalModule extends VuexModule {
  drawer: Boolean = true;
  user: User = AuthenticationService.currentUserValue;
  snackbar: ISnackbar = { show: false, timeout: 6000, message: '', type: '' };
  banner: IBanner = { show: false, message: '', color: '' };

  ///get functionalities (): String[] {
  //  const { functionalities = [] } = this.user || {}
   // return functionalities
 // }

  @Mutation
  toggleDrawer (): void {
    this.drawer = !this.drawer
  }

  @Mutation
  setDrawer (drawer: Boolean): void {
    this.drawer = drawer
  }

  @Mutation
  setUser (user: User): void {
    this.user = user
  }

  @Mutation
  setSnackBar (snackbar: ISnackbar) {
    this.snackbar.show = snackbar.show
    this.snackbar.type = snackbar.type || this.snackbar.type
    this.snackbar.timeout = snackbar.timeout || this.snackbar.timeout
    this.snackbar.message = snackbar.message || this.snackbar.message
  }

  @Mutation
  setBanner (banner: IBanner) {
    this.banner.show = banner.show
    this.banner.color = banner.color || this.banner.color
    this.banner.message = banner.message || this.banner.message
  }
}

export default getModule(GlobalModule)
