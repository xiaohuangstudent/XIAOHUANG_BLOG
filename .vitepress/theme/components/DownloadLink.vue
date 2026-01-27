<!-- .vitepress/components/DownloadLink.vue -->
<template>
  <a :href="hrefWithBase" :download="filename" class="download-link">
    <slot>下载文件</slot>
  </a>
</template>

<script setup>
import { useData } from "vitepress";
import { computed } from "vue";

const props = defineProps({
  file: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    default: "",
  },
});

const { site } = useData();
const hrefWithBase = computed(() => {
  // 自动添加 base URL
  const base = site.value.base || "/";
  return `${base}${props.file.replace(/^\//, "")}`;
});
</script>

<style>
.download-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #95ffffb1 !important;
  color: black !important; /* 使用 !important 确保优先级最高 */
  text-decoration: none;
  border-radius: 4px;
}
.download-link:hover {
  background-color: #95ffffb1 !important;
}
</style>