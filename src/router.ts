import Vue from 'vue'
import Router from 'vue-router'
import GlobalStore from '@/store/modules/global'
import AuthenticationService from '@/services/authentication.service'

Vue.use(Router)

export const router = new Router({
  base: process.env.NODE_ENV === 'production' ? `/${process.env.VUE_APP_BASE_PATH}` : '/',
  routes: [
    {
      path: '/',
      redirect: {
        path: '/home'
      }
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        authorize: [],
        breadcrumb: 'Home'
      },
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },    
    {
      path: '/usuario',
      meta: {
        breadcrumb: 'Usuário'
      },
      component: { render: h => h('router-view') },
      children: [
        {
          path: '',
          name: 'user',
          meta: {
            authorize: ['']
          },
          component: () => import(/* webpackChunkName: "user" */ './views/user/User.vue')
        },
        {
          path: 'cadastro',
          name: 'user-register',
          meta: {
            authorize: [''],
            breadcrumb: 'Cadastro'
          },
          component: () => import(/* webpackChunkName: "user-detail" */ './views/user/Detail.vue')
        },
        {
          path: 'editar/:id',
          name: 'user-edit',
          meta: {
            authorize: [''],
            breadcrumb: 'Editar'
          },
          component: () => import(/* webpackChunkName: "user-detail" */ './views/user/Detail.vue')
        }
      ]
    },  
    {
      path: '/login',
      name: 'login',
      meta: { publicPage: true },
      component: () =>
        import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/esqueceu-senha',
      name: 'forgot-password',
      meta: { publicPage: true },
      component: () =>
        import(/* webpackChunkName: "forgot-password" */ './views/ForgotPassword.vue')
    },
    {
      path: '/resetar-senha',
      name: 'reset-password',
      meta: { publicPage: true },
      component: () =>
        import(/* webpackChunkName: "reset-password" */ './views/ResetPassword.vue')
    },
    {
      path: '*',
      meta: { publicPage: true },
      redirect: {
        path: '/404'
      }
    },
    {
      path: '/404',
      name: 'not-found',
      meta: { publicPage: true },
      component: () =>
        import(/* webpackChunkName: "notFound" */ './views/NotFound.vue')
    },
    {
      path: '/acesso-negado',
      meta: { publicPage: true },
      name: 'denied',
      component: () =>
        import(/* webpackChunkName: "accessDenied" */ `@/views/Deny.vue`)
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta
  const currentUser = GlobalStore.user

  if (authorize) {
    if (!currentUser) {
      return next({ name: 'login', query: { returnUrl: to.path } })
    }

    if (currentUser.firstAccess) {
      return next({ name: 'reset-password' })
    }

    //if (authorize.length && !GlobalStore.functionalities.some(f => authorize.includes(f))) {
    ///  return next({ name: 'denied' })
    //}
  }

  next()
})
