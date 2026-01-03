<template>
  <div class="stats-wrapper">
    <div class="stats-card">
      <div class="stats-item">
        <div class="stats-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
        <div class="stats-content">
          <div class="stats-label">本站总访问量</div>
          <div class="stats-value" id="busuanzi_value_site_pv">0</div>
          <div class="stats-unit">次</div>
        </div>
      </div>

      <div class="stats-divider"></div>

      <div class="stats-item">
        <div class="stats-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stats-content">
          <div class="stats-label">本站访客数</div>
          <div class="stats-value" id="busuanzi_value_site_uv">0</div>
          <div class="stats-unit">人次</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加任何逻辑，比如组件逻辑
</script>

<style scoped>
/* 新增的包装器，用于居中 */
.stats-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
  width: 100%;
}

.stats-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f8faff 0%, #eef2ff 100%);
  border: 1px solid #e0e7ff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.08);
  max-width: 500px;
  width: 100%;
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.12);
  border-color: #3b82f6;
}

.stats-item {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;
}

.stats-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #3b82f6;
  border-radius: 12px;
  color: white;
  flex-shrink: 0;
}

.stats-content {
  display: flex;
  flex-direction: column;
}

.stats-label {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
  font-weight: 500;
}

.stats-value {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
}

.stats-unit {
  font-size: 14px;
  color: #64748b;
  margin-top: 4px;
}

.stats-divider {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, #cbd5e1, transparent);
  margin: 0 32px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .stats-card {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    max-width: 90%;
  }

  .stats-divider {
    width: 100%;
    height: 1px;
    margin: 10px 0;
  }

  .stats-item {
    width: 100%;
    justify-content: center;
  }

  /* 移动端进一步调整间距 */
  .stats-wrapper {
    margin: 24px 0;
  }
}

/* 暗色模式适配 */
:deep(.dark) .stats-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-color: #334155;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.5);
}

:deep(.dark) .stats-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.2);
}

:deep(.dark) .stats-value {
  color: #f8fafc;
}

:deep(.dark) .stats-label,
:deep(.dark) .stats-unit {
  color: #94a3b8;
}

:deep(.dark) .stats-divider {
  background: linear-gradient(to bottom, transparent, #475569, transparent);
}
</style>