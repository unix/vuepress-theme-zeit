<template lang="pug">
header.header
  Setting.setting(@click="toggleSide" :dark="isDark")
  .layout.contaniner
    Links
    .icons
      Sun(@click="toggleTheme" :dark="isDark")
</template>

<script>
import Sun from '@zeit-ui/vue-icons/packages/sun'
import Setting from '@zeit-ui/vue-icons/packages/setting'
import Links from './tab-links'
import { eventHub } from '../../utils'

export default {
  data: () => ({
    isDark: false,
  }),

  components: {
    Links, Setting, Sun,
  },

  mounted() {
    const theme = window.localStorage.getItem('theme')
    if (!theme) return
    this.toggleTheme(theme.includes('dark'))
  },

  methods: {
    toggleTheme(flag) {
      import('@zeit-ui/vue')
        .then(({ theme }) => {
          const isSpecified = !(flag instanceof Event)
          const current = isSpecified ? !flag : theme.getCurrentTheme().includes('dark')
          const next = current ? 'zi-light-theme' : 'zi-dark-theme'
          this.isDark = !current
          window.localStorage.setItem('theme', next)
          theme.setTheme(next)
        })
    },

    toggleSide() {
      eventHub.$emit('side-toggle')
    },
  },
}
</script>

<style lang="stylus" scoped>
.header
  height 70px
  background-color white
  border-bottom 1px solid #eaeaea
  display flex
  justify-content center
  align-items center
  padding 0 30px
  position fixed
  top 0
  left 0
  right 0
  z-index 100

.contaniner
  display flex
  justify-content space-between
  align-items center

.icons
  user-select none
  height 24px
  display flex
  justify-content center
  align-items center

  svg
    display inline-flex
    cursor pointer
    margin-left 25px

.setting
  margin-right 5px
  display none
  cursor pointer
  user-select none

@media only screen and (max-width 767px)
  .setting
    display block

.zi-dark-theme
  .header
    background-color #111
    border-color #666

</style>
