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

import Calculator from './components/Calculator.vue' //测试计算器
import StatsCard from './components/StatsCard.vue' //人数统计卡片
import confetti from "./components/confetti.vue"  //五彩纸屑

/** @type {import('vitepress').Theme} */
export default {
  Layout, //评论模块
  extends: DefaultTheme,
  appearance: 'dark', // 默认使用夜间模式
  enhanceApp({ app, router, siteData }) {
    app.component('Calculator', Calculator); // 全局注册计算器组件
    app.component('StatsCard', StatsCard); //人数统计卡片
  
    app.component('confetti' , confetti) //五彩纸屑
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
    
  },
}
