<template lang="pug">
ul(v-if="items.length").list
  li(v-for="(item, i) in items" :key="i")
    SidebarGroup(v-if="item.type === 'group'"
      :item="item" :open="i === openGroupIndex" :depth="depth"
      :collapsable="item.collapsable || item.collapsible"
      @toggle="toggleGroup(i)"
    )
    SideLink(v-else :item="item" :sidebarDepth="sidebarDepth")
</template>

<script>
import SidebarGroup from './side-group'
import SideLink from './side-link'
import { isActive } from '../../utils'

const resolveOpenGroupIndex = (route, items) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => c.type === 'page' && isActive(route, c.path))) {
      return i
    }
  }
  return -1
}

export default {
  props: ['items', 'depth', 'sidebarDepth'],

  components: {
    SideLink, SidebarGroup,
  },

  data: () => ({
    openGroupIndex: 0,
  }),

  created() {
    this.refreshIndex()
  },

  watch: {
    '$route'() {
      this.refreshIndex()
    },
  },

  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items)
      if (index > -1) this.openGroupIndex = index
    },

    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive(page) {
      return isActive(this.$route, page.regularPath)
    },
  },
}
</script>

<style lang="stylus" scoped>
.list
  width 100%
  margin 18px 0 0 0
  padding-left 21px

  li
    line-height 18px
    padding 0
    margin 0 0 18px 0
    &:before
      display none

</style>
