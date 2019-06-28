<template lang="pug">
section.sidebar-group(:class="[{ collapsable, 'is-sub-group': depth !== 0 }, `depth-${depth}`]")
  router-link.sidebar-heading.clickable(
    v-if="item.path" :to="item.path" @click.native="$emit('toggle')"
    :class="{ open, active: isActive($route, item.path) }"
  )
    span {{ item.title }}
    span.arrow(v-if="collapsable" :class="open ? 'down' : 'right'")
  p.sidebar-heading(v-else :class="{ open }" @click="$emit('toggle')")
    SideIcon.arrow(:is-expand="!open" v-if="collapsable")
    span {{ item.title }}
  DropdownTransition
    SidebarLinks.sidebar-group-items(
      v-if="open || !collapsable"
      :items="item.children" :depth="depth + 1" :sidebarDepth="item.sidebarDepth"
    )
</template>

<script>
import SideIcon from './side-icon'
import { isActive } from '../../utils'
import DropdownTransition from '../dropdown'

export default {
  name: 'SidebarGroup',

  props: ['item', 'open', 'collapsable', 'depth'],

  components: { DropdownTransition, SideIcon },

  beforeCreate() {
    this.$options.components.SidebarLinks = require('./side-links').default
  },

  methods: { isActive },
}
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0

    .sidebar-group-items
      border-left 1px solid #eaeaea
      margin 18px 0 0 4px

  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color #666
  display flex
  align-items center
  cursor pointer
  font-size 14px
  font-weight normal
  width 100%
  margin 0
  user-select none

  &.open
    font-weight 600
    color #000

  &.clickable
    &.active
      font-weight 600
      color #000
    &:hover
      color #000

.sidebar-group-items
  margin 18px 0 0 4px
  transition height .1s ease-out
  overflow hidden
</style>
