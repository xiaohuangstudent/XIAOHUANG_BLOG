---
# https://vitepress.dev/reference/default-theme-home-page
#这个文件下的所有文件都以项目路径为根目录,config.mjs都以vitepress.config.js为根目录
layout: home

hero:
  name: "小黄同学的在线笔记"
  text: 偷偷看一眼
  tagline: "发现真的很好看!!!"
  image:
    src: icons/网站/智能.png
    alt: 背景图
  actions:
    - theme: brand
      text: 个人主页
      link: xiaohuang_mdwork/个人主页/个人主页.md

    - theme: alt
      text: 算法笔记
      link: xiaohuang_mdwork/算法笔记/算法笔记主页目录.md

    - theme: brand #按钮
      text: 论文阅读主页目录
      link: xiaohuang_mdwork/论文阅读/论文阅读主页目录.md

features:
  - icon: 📖
    title: 算法笔记
    details: 快速获取所需的公开资料
    link: xiaohuang_mdwork/算法笔记/算法笔记主页目录.md

  - icon: 🖥️
    title: 软件工具
    details: 快速获取所需的公开软件资料
    link: xiaohuang_mdwork/软件工具/软件工具目录.md
  - icon: 🛠️
    title: 硬件工具
    details: 快速获取所需的公开软件资料
    link: xiaohuang_mdwork/硬件资料/硬件资料主页目录.md
  - icon: 📁
    title: 数据集
    details: 快速获取所需的公开数据集资料
    link: xiaohuang_mdwork/硬件工具.md
  - icon: 👥
    title: 联系小黄
    details: 快速获取所需的公开数据集资料
    link: xiaohuang_mdwork/联系我们/联系我们.md

  - icon: 🔍
    title: 页面测试
    details: 用于测试的文档
    link: xiaohuang_mdwork/测试/test.md
---

<!-- 人员介绍 -->
<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/xiaohuangstudent.png',
    name: '小黄同学',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/xiaohuangstudent' },
    ]
  },
  {
    avatar: 'https://www.github.com/kiaking.png', 
    name: '火柴人',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'XXX' },
      { icon: 'twitter', link: 'XXX' }
    ]
  },
]
</script>

<br>

# 浏览量

<StatsCard />

# 关于

<VPTeamMembers size="small" :members="members" />
