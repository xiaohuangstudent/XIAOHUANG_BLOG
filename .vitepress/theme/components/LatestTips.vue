<template>
  <div class="latest-tips-wrapper">
    <div class="latest-tips-header">
      <span class="badge">最新4条资讯</span>
      <span class="badge"
        >可以在顶端的前端导航界面或每篇的文章下给我留言哦！</span
      >
      <a
        href="/XIAOHUANG_BLOG/xiaohuang_mdwork/UpdataTips/UpdataList"
        class="badge badge-link"
      >
        点击此处查看所有资讯
      </a>
    </div>

    <div v-if="loading" class="status-text">加载中...</div>
    <div v-else-if="tips.length === 0" class="status-text">暂无 Tip 更新</div>

    <div v-else class="tips-list">
      <div v-for="(tip, index) in tips" :key="index" class="tip-card">
        <div class="tip-title">{{ tip.title }}</div>
        <!-- 使用 v-html 渲染 Markdown 内容 -->
        <div class="tip-content" v-html="tip.renderedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import MarkdownIt from "markdown-it";
import container from "markdown-it-container";

// ---------- 初始化 markdown-it 实例 ----------
const md = new MarkdownIt({
  html: true, // 允许 HTML 标签（图片等）
  linkify: true, // 自动识别链接
  typographer: true,
});

// 注册自定义容器，以支持 >[!Tip]
md.use(container, "tip", {
  validate: (params) => params.trim().match(/^tip$/i),
  render: (tokens, idx) => {
    const token = tokens[idx];
    if (token.nesting === 1) {
      // 开始标签 —— 使用 VitePress 的类名以匹配样式
      return '<div class="custom-block tip">';
    } else {
      return "</div>\n";
    }
  },
});

// 可选：如果你后续想支持其他容器，可以按同样方式注册

// ---------- 导入数据文件 ----------
// 当前组件位于 .vitepress/theme/components/，需三级回退到项目根
import tipsRaw from "../../../xiaohuang_mdwork/UpdataTips/UpdataList.md?raw";

// // 👇 添加这一行，在浏览器控制台查看原始内容
// console.log("✅ tipsRaw 内容:", tipsRaw);
// console.log("📏 tipsRaw 长度:", tipsRaw?.length || 0);

const loading = ref(false);

// 解析并渲染 Tip 列表
const tips = computed(() => {
  if (!tipsRaw) return [];

  const sections = tipsRaw.split(/\n(?=## )/g);
  const parsed = [];

  for (let section of sections) {
    if (!section || !section.trim()) continue;
    const titleMatch = section.match(/^## (.*?)(?:\n|$)/m);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();

    let content = section.replace(/^## .*?\n/m, "").trim();
    if (!content.includes("> [!Tip]")) continue;

    // // 替换图片路径
    // content = content.replace(
    //   /!\[([^\]]*)\]\(\.\/UpdataList\.assets\/([^)]+)\)/g,
    //   "![$1](/xiaohuang_mdwork/UpdataTips/UpdataList.assets/$2)"
    // );
    // content = content.replace(
    //   /<img\s+src=["']\.\/UpdataList\.assets\/([^"']+)["']/g,
    //   '<img src="/xiaohuang_mdwork/UpdataTips/UpdataList.assets/$1"'
    // );

    parsed.push({ title, content });
  }

  return parsed.slice(-4).reverse();
});
</script>

<style scoped>
/* 样式与之前完全相同，无需修改 */
.latest-tips-wrapper {
  margin: 2rem 0;
  padding: 1.5rem 1.8rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}

.latest-tips-header {
  display: flex;
  flex-wrap: wrap; /* 防止小屏幕溢出 */
  justify-content: center; /* 水平居中 */
  align-items: center;
  gap: 16px; /* 两个 badge 之间的间距 */
  margin-bottom: 1.8rem;
}

.latest-tips-header h2 {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

.badge {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  font-size: 1rem; /* 原先 0.7rem，现在放大 */
  font-weight: 600;
  padding: 0.4rem 1.2rem; /* 增加内边距，显得更大 */
  border-radius: 30px;
  letter-spacing: 0.3px;
  white-space: nowrap; /* 防止换行（但长文字可能换行，可省略） */
}

.badge-link {
  background: #e74c3c !important; /* 红色 */
  color: white !important;
  text-decoration: none; /* 去掉下划线 */
  cursor: pointer;
}
.badge-link:hover {
  background: #c0392b !important; /* 悬停加深 */
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.tip-card {
  background: var(--vp-c-bg);
  padding: 1.2rem 1.6rem;
  border-radius: 12px;
  border-left: 4px solid var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;
}

.tip-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
  transform: translateY(-2px);
}

.tip-title {
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
}

.tip-title::before {
  content: "📌";
  margin-right: 10px;
  font-size: 0.9rem;
}

/* 保证 Tip 容器和图片样式与 VitePress 默认一致 */
.tip-content :deep(.custom-block) {
  margin: 0.5rem 0;
}

.tip-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 0.6rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.status-text {
  color: var(--vp-c-text-2);
  text-align: center;
  padding: 1.5rem 0;
}
</style>