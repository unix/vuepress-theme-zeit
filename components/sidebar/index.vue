<template lang="pug">
aside.side(:class="{ active: isOpen }")
  SidebarLinks(:depth="0" :items="items")
</template>

<script>
import SidebarLinks from './side-links'
import { eventHub } from '../../utils'

export default {
  props: ['items'],

  data: () => ({
    isOpen: false,
  }),

  watch: {
    '$route'() {
      this.isOpen = false
    },
  },

  components: { SidebarLinks },

  mounted() {
    eventHub.$on('side-toggle', () => {
      this.isOpen = !this.isOpen
    })
  },
}
</script>

<style lang="stylus" scoped>
.side
  display block
  width 280px
  position fixed
  top 80px
  bottom 0
  overflow-y scroll
  z-index 1
  background-color white
  padding 20px 40px 20px 0
  -webkit-overflow-scrolling touch

@media only screen and (max-width 767px)
  .side
    width 0
    padding 0
    top 70px
    transition all .15s ease

    &.active
      width 280px
      padding 20px 40px 20px 0

.zi-dark-theme
  .side
    background-color #111
</style>
