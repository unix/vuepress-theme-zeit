<script>
import { groupHeaders, hashRE, isActive } from '../../utils'

export default {
  functional: true,
  props: ['item', 'sidebarDepth'],
  render(h, {
    parent: {
      $page,
      $site,
      $route,
      $themeConfig,
      $themeLocaleConfig,
    },
    props: { item, sidebarDepth },
  }) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path)
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active = item.type === 'auto'
      ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
      : selfActive
    const link = item.type === 'external'
      ? renderExternal(h, item.path, item.title || item.path)
      : renderLink(h, item.path, item.title || item.path, active)
    const configDepth = $page.frontmatter.sidebarDepth
      || sidebarDepth
      || $themeLocaleConfig.sidebarDepth
      || $themeConfig.sidebarDepth
    const maxDepth = configDepth === null ? 1 : configDepth
    const displayAllHeaders = $themeLocaleConfig.displayAllHeaders
      || $themeConfig.displayAllHeaders
    if (item.type === 'auto') {
      return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth)]
    }
    if ((active || displayAllHeaders) && item.headers && !hashRE.test(item.path)) {
      const children = groupHeaders(item.headers)
      return [link, renderChildren(h, children, item.path, $route, maxDepth)]
    }
    return link
  },
}

function renderLink(h, to, text, active) {
  return h('router-link', {
    props: {
      to,
      activeClass: '',
      exactActiveClass: '',
    },
    class: {
      active,
      'sidebar-link': true,
    },
  }, text)
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h('ul', { class: 'sidebar-sub-headers' }, children.map(c => {
    const active = isActive(route, path + '#' + c.slug)
    return h('li', { class: 'sidebar-sub-header' }, [
      renderLink(h, path + '#' + c.slug, c.title, active),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1),
    ])
  }))
}

function renderExternal(h, to, text) {
  return h('a', {
    attrs: {
      href: to,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    class: {
      'sidebar-link': true,
    },
  }, [text, h('OutboundLink')])
}
</script>

<style lang="stylus">
.sidebar-sub-headers
  width 100%
  padding-left 21px
  margin 18px 0 0 4px
  border-left 1px solid #eaeaea

  li
    line-height 18px
    padding 0
    margin 0 0 18px 0
    &:before
      display none

.sidebar-sub-header
  position relative

  &:before
    content ''
    position absolute
    left 0

a.sidebar-link
  font-size 14px
  font-weight normal
  color #666
  width: 100%

  &:hover
    color #000

  &.active
    font-weight 600
    color #0076ff

  /*.sidebar-group &*/
    /*padding-left 20px*/

  .sidebar-sub-headers &
    &.active
      font-weight 500

.zi-dark-theme
  a.sidebar-link
    color #999
    &:hover
      color white
    &.active
      font-weight 600
      color #0076ff

  .sidebar-sub-headers
    border-color #666
</style>
