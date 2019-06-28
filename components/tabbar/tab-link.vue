<template lang="pug">
  a.link(v-if="isExternal(link)" target="_blank" :href="link") {{ item.text }}
  router-link.link(v-else :to="link" :exact="exact") {{ item.text }}
</template>

<script>
import * as utils from '../../utils'

export default {
  props: ['item'],

  computed: {
    link() {
      return utils.ensureExt(this.item.link)
    },

    exact() {
      if (!this.$site.locales) return this.link === '/'
      return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
    },
  },

  methods: {
    isExternal: utils.isExternal,
  },
}
</script>

<style scoped lang="stylus">
.link
  color #666
  transition color .2 ease
  padding 0 12px

  &:hover
    color black
    text-decoration none

.zi-dark-theme
  .link
    color #999

    &:hover
      color white
</style>
