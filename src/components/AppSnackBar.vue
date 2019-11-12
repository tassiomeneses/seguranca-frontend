<template>
  <v-snackbar v-model="show" :timeout="timeout" :color="type" top>
    {{ message }}
    <v-btn text dark @click.native="show = false"><v-icon>close</v-icon></v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import GlobalStore from '@/store/modules/global'

export default Vue.extend({
  name: 'app-snack-bar',
  computed: {
    show: {
      get: () => GlobalStore.snackbar.show,
      set: (show: boolean) => GlobalStore.setSnackBar({ show })
    },
    message: () => GlobalStore.snackbar.message,
    timeout: () => GlobalStore.snackbar.timeout,
    type: () => GlobalStore.snackbar.type
  }
})
</script>

<style lang="scss">
  .v-snack--top{
    top: 10px !important;
    width: 90%;
    height: auto;
    margin: auto;
    .v-snack__content{
      height: auto;
      min-height: 48px;
    }
  }
</style>
