<template lang="pug">
.contaniner
  ClientOnly
    template(v-for="(link, i) in links")
      Link(:key="link.text + i" v-if="!hasChild(link)" :item="link")
      zi-popover(v-else)
        span.host {{ link.text }}
        template(v-slot:dropdown)
          template(v-for="(child, j) in link.items")
            zi-popover-item(v-if="isExternal(child.link)" :href="child.link") {{ child.text }}
            zi-popover-item(v-else :to="child.link") {{ child.text }}
</template>

<script>
import * as utils from '../../utils'
import Link from './tab-link'
import Vue from 'vue'

export default {
  async mounted() {
    const popover = await import('@zeit-ui/vue/lib/popover.common')
    popover.install(Vue)
    this.$forceUpdate()
  },

  components: {
    Link,
  },

  computed: {
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },

    nav() {
      const { locales } = this.$site
      if (!locales || Object.keys(locales).length <= 1) return this.userNav

      const currentLink = this.$page.path
      const routes = this.$router.options.routes
      const themeLocales = this.$site.themeConfig.locales || {}

      const languageDropdown = {
        text: this.$themeLocaleConfig.selectText || 'Languages',
        items: Object.keys(locales).map(path => {
          const locale = locales[path]
          const text = themeLocales[path] && themeLocales[path].label || locale.lang

          let link
          if (locale.lang === this.$lang) {
            link = currentLink
          } else {
            link = currentLink.replace(this.$localeConfig.path, path)
            if (!routes.some(route => route.path === link)) {
              link = path
            }
          }
          return { text, link }
        }),
      }
      return [...this.userNav, languageDropdown]
    },

    links() {
      return this.nav || []
    },
  },

  methods: {
    hasChild(link) {
      return link && link.items
    },

    isExternal: utils.isExternal,
  },
}
</script>

<style scoped lang="stylus">
.contaniner
  display flex
  justify-content right
  align-items center

.host
  text-transform uppercase
  font-weight 600
  color #666
  padding 0 12px
</style>
