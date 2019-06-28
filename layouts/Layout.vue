<template lang="pug">
.container.layout
  Tabbar
  Sidebar(:items="sidebarItems")
  Page(:sidebar-items="sidebarItems")
    slot(name="page-top" v-slot:top)
    slot(name="page-bottom" v-slot:bottom)
</template>

<script>
import '@zeit-ui/vue/dist/zeit-ui.css'
import Tabbar from '../components/tabbar'
import Sidebar from '../components/sidebar'
import Page from '../components/page'
import * as utils from '../utils'

export default {
  components: {
    Tabbar, Sidebar, Page,
  },

  computed: {
    sidebarItems() {
      return utils.resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
  },
}
</script>

<style scoped lang="stylus">
.container
  display flex
  padding-top 70px
  min-height 100vh
  justify-content space-between
  align-items flex-start
</style>
