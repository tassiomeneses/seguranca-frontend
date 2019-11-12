<template>
  <v-app class="app">
    <template v-if="!publicPage">
      <v-layout>
        <v-content>
          <app-toolbar></app-toolbar>
          <app-drawer></app-drawer>
          <app-banner></app-banner>
          <page-header></page-header>
          <router-view/>
        </v-content>

        <app-fab></app-fab>
        <app-snack-bar></app-snack-bar>
      </v-layout>
    </template>

    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
      </transition>
    </template>
  </v-app>
</template>

<script>
import Vue from 'vue'
import AppFab from '@/components/AppFab'
import AppBanner from '@/components/AppBanner'
import AppDrawer from '@/components/AppDrawer'
import AppToolbar from '@/components/AppToolbar'
import AppSnackBar from '@/components/AppSnackBar'
import PageHeader from '@/components/PageHeader'
import HasPrivilleges from '@/directives/privilleges'

export default Vue.extend({
  name: 'App',
  components: {
    AppFab,
    AppBanner,
    PageHeader,
    AppSnackBar,
    AppToolbar,
    AppDrawer
  },
  directives: {
    HasPrivilleges
  },
  computed: {
    publicPage () {
      const { fullPath, meta: { publicPage } } = this.$route
      return fullPath === '/' ? true : publicPage
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>
