import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Agent 笔记博客',
  description: '用 VitePress 记录 Agent 笔记、实验和思考',
  lang: 'zh-CN',
  base: '/agentblog/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'Agent 笔记博客',
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记路径', link: '/posts/roadmap' },
      { text: '文章', link: '/posts/' },
      { text: '资源', link: '/resources' }
    ],
    sidebar: {
      '/posts/': [
        {
          text: '开始',
          items: [{ text: '文章索引', link: '/posts/' }]
        },
        {
          text: '笔记路径',
          items: [
            { text: 'Agent 学习 + 实战路线图', link: '/posts/roadmap' },
            { text: 'Agent 工程师知识地图（2026）', link: '/posts/knowledge-map-2026' },
            { text: 'Agent OS 内核架构图（2026）', link: '/posts/agent-os-kernel-2026' },
            { text: 'AI Computer 架构图（2026）', link: '/posts/ai-computer-architecture-2026' }
          ]
        },
        {
          text: '学习笔记',
          items: [
            { text: 'Day 1: What Is Agent', link: '/posts/day01-agent-basics' },
            { text: '第一篇：从 0 到 1 搭建 Agent', link: '/posts/first-post' },
            { text: '提示词模式：常用模板', link: '/posts/prompt-patterns' },
            { text: '工具调用与工作流', link: '/posts/tools-and-workflow' },
            { text: 'Inbox Triage Agent 项目', link: '/posts/inbox-triage-agent-project' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cq0206/agentblog' }
    ],
    footer: {
      message: 'Powered by VitePress',
      copyright: 'Copyright © 2026 Qian'
    },
    search: {
      provider: 'local'
    }
  }
})
