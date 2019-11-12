<template>
  <v-list class="pt-0" dense expand>
    <v-list-item :to="home.to">
      <v-list-item-action>
        <v-icon>{{ home.icon }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>{{ home.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-for="item in items" :key="item.title" :to="item.to" v-hasPrivilleges="item.privilege">
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'app-side-bar' })
export default class AppSideBar extends Vue {
  home: object = { title: 'Home', icon: 'home', to: '/home' };
  items: object[] = [
    { title: 'Usuário', icon: 'account_circle', to: '/usuario', privilege: '' }
  ];
}
</script>
