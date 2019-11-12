<template>
  <v-banner
    :value="show"
    sticky
    elevation="1">
    <v-icon
      :color="color"
      slot="icon"
      size="36"
    >
      cloud_off
    </v-icon>

    {{ message }}. Favor fazer o login na aplicação novamente.

    <template v-slot:actions>
      <v-btn text color="primary" @click="show = false">Cancelar</v-btn>
      <v-btn text color="primary" @click="logout">Login</v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import Vue from 'vue'
import GlobalStore from '@/store/modules/global'
import AuthenticationService from '@/services/authentication.service'

export default Vue.extend({
  data: () => ({
  }),
  computed: {
    show: {
      get: () => GlobalStore.banner.show,
      set: (show: boolean) => GlobalStore.setBanner({ show })
    },
    message: () => GlobalStore.banner.message,
    color: () => GlobalStore.banner.color
  },
  methods: {
    logout () {
      AuthenticationService.logout()
      GlobalStore.setBanner({ show: false })
      GlobalStore.setSnackBar({
        show: true,
        message: 'Saiu do sistema com sucesso!!!',
        type: 'success'
      })
    }
  }
})
</script>
