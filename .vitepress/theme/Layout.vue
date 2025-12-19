<!--Layout.vue-->
<template>
  <Layout>
    <template #doc-footer-before> </template>
    <template #doc-after>
      <div style="margin-top: 24px">
        <Giscus
          :key="page.filePath"
          repo="xiaohuangstudent/XIAOHUANG_BLOG"
          repo-id="R_kgDOPDRMrQ"
          category="General"
          category-id="DIC_kwDOPDRMrc4C0A1V"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          lang="zh-CN"
          crossorigin="anonymous"
          :theme="isDark ? 'dark' : 'light'"
        />
      </div>
    </template>
  </Layout>
</template>
 
<script lang="js" setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";
 
const { isDark, page } = useData();
 
const { Layout } = DefaultTheme;
 
watch(isDark, (dark) => {
  if (!inBrowser) return;
 
  const iframe = document
    .querySelector("giscus-widget")
    ?.shadowRoot?.querySelector("iframe");
 
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
    "https://giscus.app"
  );
});
</script>
 