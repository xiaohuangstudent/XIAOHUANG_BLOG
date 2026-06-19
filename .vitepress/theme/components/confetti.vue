<template>
  <!-- 这是一个空占位，只负责触发动画 -->
  <div style="display: none"></div>
</template>

<script setup>
import { onMounted } from "vue";
import confetti from "canvas-confetti";

onMounted(() => {
  // 五彩纸屑效果
  confetti({
    particleCount: 100,
    spread: 170,
    origin: { y: 0.6 },
  });
});
</script>