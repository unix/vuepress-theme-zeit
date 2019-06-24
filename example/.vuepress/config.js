module.exports = {
  title: 'zeit-ui',
  description: '',
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }],
  ],
  theme: require.resolve('../..'),
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Github', link: 'https://github.com/wittbulter' },
      { text: 'options', items: [{
        text: 'one', link: '/w',
        }]}
    ],
    sidebar: {
      '/': [{
        title: 'Guide',
        children: [
          '/',
          'about',
          'install',
          {
            title: 'deployment',
            children: [
              '/deployment/basic.md',
              '/deployment/lifecycle.md',
            ],
          },
          'theme',
        ]
      }]
    }
  },
}
