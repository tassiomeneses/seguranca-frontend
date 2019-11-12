<template>
  <v-toolbar color="primary" dark>
    <v-app-bar-nav-icon @click.stop="handleDrawerToggle"></v-app-bar-nav-icon>
    <v-toolbar-title>Segurança</v-toolbar-title>
    <v-spacer></v-spacer>

    <app-menu></app-menu>
  </v-toolbar>
</template>

<script>
import Vue from 'vue'
import AppMenu from './AppMenu'
import GlobalStore from '@/store/modules/global'

export default Vue.extend({
  name: 'app-toolbar',
  components: {
    AppMenu
  },
  methods: {
    handleDrawerToggle () {
      GlobalStore.toggleDrawer()
    }
  }
})
</script>
