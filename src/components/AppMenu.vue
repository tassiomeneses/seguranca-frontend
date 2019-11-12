<template>
  <v-menu right bottom>
    <template v-slot:activator="{ on }">
      <v-btn dark icon v-on="on">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>

    <v-list class="pa-0">
      <v-list-item href="#">
        <v-list-item-action>
          <v-icon>account_circle</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="(item,index) in items"
        :to="!item.href ? { name: item.name } : null"
        :href="item.href"
        @click="item.click"
        ripple="ripple"
        :disabled="item.disabled"
        :target="item.target"
        rel="noopener"
        :key="index"
      >
        <v-list-item-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Vue from 'vue'
import GlobalStore from '@/store/modules/global'
import AuthenticationService from '@/services/authentication.service'

export default Vue.extend({
  name: 'app-menu',
  data: () => ({
    items: [
      {
        icon: 'settings',
        href: '#',
        title: 'Definições',
        click: e => {}
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Sair',
        click: e => {
          AuthenticationService.logout()
          GlobalStore.setSnackBar({
            show: true,
            message: 'Saiu do sistema com sucesso!!!',
            type: 'success'
          })
        }
      }
    ]
  }),
  computed: {
    user: () => GlobalStore.user || { }
  }
})
</script>
