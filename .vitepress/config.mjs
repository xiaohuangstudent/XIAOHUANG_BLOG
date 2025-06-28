import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/XIAOHUANG_BLOG/',
  head: [ //网站头
      ["link", { rel:"icon" ,href: "'/XIAOHUANG_BLOG/'icons/网站/笔记本.svg" }]
    ],
  title: "IDEA SUPPORT",
  description: "FOR IDEA",
  themeConfig: {
    outlineTitle: "目录",  // outline-显示标题
    outline:[1,6],  // outline-显示级数
  
    sidebar: false, // 关闭侧边栏
    aside: "left", // 设置右侧侧边栏在左侧显示

    logo: '/icons/网站/笔记本.png',
    nav: [  //导航栏
      //基础格式 { text: 'Home', link: '/' },
      { text: '首页', link: '/' },
      { text: '功能网站', items:[
        {text: 'svg转icon直达', link: 'https://cdkm.com/cn/svg-to-ico'},
        {text: '阿里icon库', link: 'https://www.iconfont.cn/'},
        {text: 'Deepseek直达', link: 'https://www.deepseek.com/'},
        {text: '通义千问', link: 'https://www.tongyi.com/'},
        {text: '高保真图', link: 'https://cdkm.com/cn/svg-to-ico'},
        {text: '建站速通教程', link: 'https://docs.bugdesigner.cn/README.html#%E9%83%A8%E7%BD%B2%E6%AD%A5%E9%AA%A4'}
      ] },
      { text: '快速软件', items:[
      ]},
      { text: '绘图集锦', items:[
      ]},
      { text: '编程语法', items:[
        { text: 'Python', link: '/' },
        { text: 'Matlab', link: '/' },
        { text: 'C/C++', link: '/' },
      ]},
      { text: '公式定理', link: '/' },
      { text: '优化算法', link: '/' },
      { text: '数值计算', link: '/' },
      { text: '人工智能算法',items:[
        {text:'机器学习',link:'/'},
        {text:'深度学习',link:'/'},
        {text:'强化学习',link:'/'}
      ] },
    ],

    // //MD文档左侧固定目录（取消注释则开启）
    // sidebar: [
    //   {
    //     text: '快速导航',
    //     items: [
    //       { text: '首页', link: '/' },
    //     ]
    //   },
    //   {
    //     text: '帮助中心',
    //     items: [
    //       { text: 'Matlab官方文档', link: 'https://www.mathworks.com/support/search.html?q=&page=1' },
    //     ]
    //   }
    // ],

    //搜素框
    search: {
      provider: 'local',
      options:{
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
            }
          }
        }
      }
    },
    //联系方式
    socialLinks: [
      // { icon: 'github', link: 'https://space.bilibili.com/3493126956124793?spm_id_from=333.788.0.0' },
      { logo: "/icons/bilibili_icons/哔哩哔哩.ico", link: 'https://space.bilibili.com/3493126956124793?spm_id_from=333.788.0.0' }
    ],

    //底部
    footer: {
      copyright: 'Copyright © 2025-present 小黄'
    }
  }
})
