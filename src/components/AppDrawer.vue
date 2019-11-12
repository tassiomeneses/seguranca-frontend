<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="280"
  >
    <v-toolbar>
      <img
        src=""
        height="auto"
        width="180"
        class="mat-toolbar__img"
        alt=""
      >
    </v-toolbar>

    <v-subheader>Menu</v-subheader>
    <app-side-bar></app-side-bar>
  </v-navigation-drawer>
</template>

<script>
import GlobalStore from '@/store/modules/global'
import AppSideBar from '@/components/AppSideBar'

export default {
  components: {
    AppSideBar
  },
  data: () => ({
    mini: false
  }),
  computed: {
    drawer: {
      get: () => {
        return GlobalStore.drawer
      },
      set: value => {
        GlobalStore.setDrawer(value)
      }
    }
  },
  created () {
    const { name } = this.$vuetify.breakpoint
    if (name === 'xs') {
      GlobalStore.setDrawer(false)
    }
  }
}
</script>

<style lang="stylus">
#appDrawer {
  overflow: hidden;

  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow: auto;
  }

  .mat-toolbar__img {
    margin: auto;
    display: table;
  }
}
</style>
