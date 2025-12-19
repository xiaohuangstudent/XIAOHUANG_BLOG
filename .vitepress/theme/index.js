// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '../styles/mathjax.css'
import '../styles/custom.css'
import '../styles/image-zoom.css'

import { onMounted, watch, nextTick } from 'vue';
import { useData,useRoute } from 'vitepress';
import { setupImageZoom, initImageZoom } from './image-zoom.js';
import { initMathCopy } from './copy-math.js';

import { inBrowser } from "vitepress";
import { NProgress } from "nprogress-v2/dist/index.js"; // 进度条组件
import "nprogress-v2/dist/index.css"; // 进度条样式

import busuanzi from "busuanzi.pure.js" //浏览量
import Layout from './Layout.vue'


/** @type {import('vitepress').Theme} */
export default {
  Layout,
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 切换路由进度条
    if (inBrowser) {
      NProgress.configure({ showSpinner: false });

      router.onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      
      router.onAfterRouteChange = () => {
        NProgress.done(); // 停止进度条
        busuanzi.fetch();
      };
    }
  },
  setup() {
    // const { frontmatter } = useData();
    const route = useRoute();
    
    // 设置图片放大功能
    onMounted(() => {
      setupImageZoom();
      initMathCopy();
    });
    
    // 路由变化时重新初始化图片放大和数学公式复制
    watch(
      () => route.path,
      () => nextTick(() => {
        setTimeout(() => {
          initImageZoom();
          initMathCopy();
        }, 100);
      })
    );
    // // giscus配置
    // giscusTalk({
    //   repo: 'xiaohuangstudent/XIAOHUANG_BLOG', //仓库
    //   repoId: 'R_kgDOPDRMrQ', //仓库ID
    //   category: 'General', // 讨论分类
    //   categoryId: 'DIC_kwDOPDRMrc4C0A1V', //讨论分类ID
    //   mapping: 'pathname',
    //   inputPosition: 'bottom',
    //   lang: 'zh-CN',
    //   }, 
    //   {
    //     frontmatter, route
    //   },
    //   //默认值为true，表示已启用，此参数可以忽略；
    //   //如果为false，则表示未启用
    //   //您可以使用"comment:true"序言在页面上单独启用它
    //   true
    // );
    
  },
}
