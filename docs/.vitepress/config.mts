import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Qian Blog',
  description: 'A blog powered by VitPress and GitHub Pages',
  lang: 'zh-CN',
  base: '/agentblog/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'Qian Blog',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/first-post' }
    ],
    sidebar: [
      {
        text: '博客',
        items: [
          { text: '开始使用', link: '/posts/first-post' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cq0206/agentblog' }
    ],
    footer: {
      message: 'Powered by VitPress',
      copyright: 'Copyright © 2026 Qian'
    }
  }
})
