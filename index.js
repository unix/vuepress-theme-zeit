const { join } = require('path')

module.exports = {
  clientRootMixin: join(__dirname, 'utils', 'root.js'),
  plugins: [
    '@vuepress/plugin-search',
    ['container', {
      type: 'tip',
      defaultTitle: 'HINT',
    }],
    ['container', {
      type: 'warning',
      defaultTitle: 'WARNING',
    }],
    ['container', {
      type: 'danger',
      defaultTitle: 'DANGER',
    }],
  ],
}
