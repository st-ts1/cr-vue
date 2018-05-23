const path = require('path')
const crcodeLoader = require.resolve('./utils/crcode-loader.js')

module.exports = {
  lang: 'ja',
  title: '基礎から学ぶ Vue.js',
  description: '書籍用サポートページ',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/notosansjapanese.css' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'コード＆動作デモ', link: '/guide/' },
      { text: '実例集', link: '/examples/' },
      { text: 'チュートリアル', link: '/tutorials/' },
    ],

    sidebar: {
      '/guide/': [
        '',
        'chapter1.md',
        'chapter2.md',
        'chapter3.md',
        'chapter4.md',
        'chapter5.md',
        'chapter6.md',
        'chapter7.md',
        'chapter8.md',
        'chapter9.md'
      ],
      '/examples/': [
        '',
        'tab.md',
        'modal.md',
        'loading.md',
        'text-animation.md',
        'delay-transition.md',
        //'fixed-header.md',
        //'svg-graph.md',
        'canvas.md',
        'slot-scope.md',
        //'nexted-route',
      ],
      '/tutorials/': [
        '',
        'todo.md',
        'firebase.md',
        'netlify.md',
      ]
    },
    repo: 'mio3io/cr-vue',
    repoLabel: 'GitHub',
    docsRepo: 'mio3io/cr-vue',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'プルリクする'
  },
  markdown: {
    config: md => {
      md.use(require('markdown-it-attrs'))
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@docs', path.resolve(__dirname, '../'))
    config.module
      .rule('crcode').pre().test(/\.md$/).use('crcode').loader(crcodeLoader)
  }
}
