<template lang="pug">
main.page
  slot(name="top")
  Content.content
  footer.page-edit
  .page-nav(v-if="prev || next")
    .edit-link(v-if="editLink")
      zi-link(:href="editLink" target="_blank" rel="noopener noreferrer" more) {{ editLinkText }}
    .last-updated(v-if="lastUpdated")
      span.prefix {{ lastUpdatedText }}&nbsp;&nbsp;
      span.time {{ lastUpdated }}
    p.inner
      span.next(v-if="next")
        router-link(v-if="next" :to="next.path") {{ next.title || next.path }}
      span.prev(v-if="prev")
        router-link(v-if="prev" :to="prev.path") {{ prev.title || prev.path }}
  slot(name="bottom")
</template>

<script>
import { endingSlashRE, outboundRE, resolvePage } from '../utils'

const flatten = (items, res) => {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}

const find = (page, items, offset) => {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}
const resolvePrev = (page, items) => find(page, items, -1)
const resolveNext = (page, items) => find(page, items, 1)

export default {
  props: ['sidebarItems'],

  computed: {
    lastUpdated() {
      return this.$page.lastUpdated
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') return this.$themeLocaleConfig.lastUpdated
      if (typeof this.$site.themeConfig.lastUpdated === 'string') return this.$site.themeConfig.lastUpdated
      return 'Last Updated'
    },

    prev() {
      const prev = this.$page.frontmatter.prev
      if (prev === false) return
      if (prev) return resolvePage(this.$site.pages, prev, this.$route.path)
      return resolvePrev(this.$page, this.sidebarItems)
    },

    next() {
      const next = this.$page.frontmatter.next
      if (next === false) return
      if (next) return resolvePage(this.$site.pages, next, this.$route.path)
      return resolveNext(this.$page, this.sidebarItems)
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) return false
      const {
        repo, editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo,
      } = this.$site.themeConfig
      if (!docsRepo || !editLinks || !this.$page.relativePath) return false
      return this.createEditLink({
        repo, docsRepo, docsDir, docsBranch, path: this.$page.relativePath,
      })
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText
          || this.$site.themeConfig.editLinkText
          || 'EDIT'
      )
    },
  },

  methods: {
    createEditLink({ repo, docsRepo, docsDir, docsBranch, path }) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '')
          + '/src'
          + `/${docsBranch}/`
          + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
          + path
          + `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }
      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + '/edit'
        + `/${docsBranch}/`
        + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
        + path
      )
    },
  },
}
</script>
