<template>
  <v-fab-transition>
    <v-btn
      fab="fab"
      small
      dark="dark"
      fixed="fixed"
      bottom="bottom"
      right="right"
      color="primary"
      v-show="fab"
      v-scroll="onScroll"
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: 'app-fab',
  data: () => ({
    fab: false
  }),
  methods: {
    onScroll () {
      if (typeof window === 'undefined') return
      this.fab = (window.pageYOffset || document.documentElement.offsetTop || 0) > 0
    },
    toTop () {
      this.$router.push({ hash: '' })
      this.$vuetify.goTo(0)
    }
  }
}
</script>
