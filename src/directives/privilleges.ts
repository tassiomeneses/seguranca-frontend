import Vue from 'vue'
import GlobalStore from '@/store/modules/global'

const hasPrivilleges = Vue.directive('hasPrivilleges', {
  inserted: (el, binding, vnode) => {
    const { user } = GlobalStore

  //  if (user && (!user.functionalities || !user.functionalities.includes(binding.value))) {
    //  el.remove()
   // }
  }
})

export default {
  hasPrivilleges
}
