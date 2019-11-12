<template>
  <v-layout row class="align-center px-2 pt-4">
    <v-breadcrumbs :items="breadcrumbs" divider=">" large>
      <template v-slot:item="props">
        <template v-if="props.item.icon">
          <v-breadcrumbs-item
            :to="props.item.to"
            :disabled="props.item.disabled"
          >
            <v-icon small>
              {{props.item.icon}}
            </v-icon>
          </v-breadcrumbs-item>
        </template>

        <template v-else>
          <v-breadcrumbs-item
            :to="props.item.to"
            :disabled="props.item.disabled"
            exact
          >
            {{ props.item.text }}
          </v-breadcrumbs-item>
        </template>
      </template>
    </v-breadcrumbs>
  </v-layout>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'page-header',
  computed: {
    breadcrumbs () {
      return this.reduceBreadcrumbs()
    }
  },
  methods: {
    mountBreadcrumbs (matched) {
      if (matched.parent) {
        this.mountBreadcrumbs(matched.parent)
      }

      return {
        to: matched.name === this.$route.name ? this.$route.path : matched.path,
        text: matched.meta.breadcrumb || matched.path,
        disabled: false
      }
    },
    reduceBreadcrumbs () {
      return this.$route.matched
        .reduce((breadcrumbList, matched, i) => {
          if (matched.meta.breadcrumb) {
            breadcrumbList.push(this.mountBreadcrumbs(matched))
          }

          return breadcrumbList
        }, [{
          to: '/home',
          icon: 'home',
          disabled: false
        }])
    }
  }
})
</script>
