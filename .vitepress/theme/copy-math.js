/**
 * 双击数学公式复制Markdown格式功能
 * 支持行内公式和行间公式
 */

// 存储原始Markdown公式的映射
const mathFormulaMap = new Map();

/**
 * 初始化数学公式复制功能
 */
export function initMathCopy() {
  // 等待MathJax渲染完成
  if (window.MathJax) {
    MathJax.startup.promise.then(() => {
      setTimeout(setupMathCopy, 500);
    });
  } else {
    // 如果没有MathJax，等待DOM加载完成后设置
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupMathCopy);
    } else {
      setupMathCopy();
    }
  }
}

/**
 * 设置数学公式复制功能
 */
function setupMathCopy() {
  // 查找所有MathJax容器
  const mathContainers = document.querySelectorAll('mjx-container');
  
  if (mathContainers.length === 0) {
    // 如果没有找到MathJax容器，稍后重试（可能MathJax还在渲染）
    setTimeout(setupMathCopy, 1000);
    return;
  }
  
  console.log(`找到 ${mathContainers.length} 个数学公式容器`);
  
  // 为每个数学公式容器设置双击事件
  mathContainers.forEach((container, index) => {
    // 跳过已经处理过的容器
    if (container.classList.contains('math-copy-enabled')) {
      return;
    }
    
    // 标记为已处理
    container.classList.add('math-copy-enabled');
    
    // 添加双击事件监听器
    container.addEventListener('dblclick', handleMathDoubleClick);
    
    // 添加CSS样式以显示可双击提示
    container.style.cursor = 'pointer';
    container.title = '双击复制公式的Markdown格式';
    
    // 尝试从相邻元素获取原始Markdown
    const originalMarkdown = findOriginalMarkdown(container);
    if (originalMarkdown) {
      mathFormulaMap.set(container, originalMarkdown);
    }
  });
  
  // 监听DOM变化以处理动态加载的内容
  setupMutationObserver();
}

/**
 * 查找数学公式的原始Markdown
 * @param {HTMLElement} container - MathJax容器元素
 * @returns {string|null} 原始Markdown公式或null
 */
function findOriginalMarkdown(container) {
  console.log('开始查找原始Markdown公式...');
  
  // 方法1: 首先在容器内部查找隐藏的span元素
  // 根据config.mjs中的插件，原始Markdown存储在data-math-original属性中
  const internalSpan = container.querySelector('span.math-original[data-math-original]');
  if (internalSpan && internalSpan.dataset.mathOriginal) {
    console.log('方法1成功: 在容器内部找到隐藏span');
    return internalSpan.dataset.mathOriginal;
  }
  
  // 方法2: 查找容器相邻的隐藏span元素
  // 插件可能将span添加为兄弟元素
  const allSpans = document.querySelectorAll('span.math-original[data-math-original]');
  for (const span of allSpans) {
    // 检查这个span是否在容器附近
    if (isElementNearby(container, span)) {
      console.log('方法2成功: 找到附近的隐藏span');
      return span.dataset.mathOriginal;
    }
  }
  
  // 方法3: 查找父元素中的隐藏span
  let parent = container.parentElement;
  let depth = 0;
  while (parent && depth < 5) {
    const parentSpan = parent.querySelector('span.math-original[data-math-original]');
    if (parentSpan && parentSpan.dataset.mathOriginal) {
      console.log('方法3成功: 在父元素中找到隐藏span');
      return parentSpan.dataset.mathOriginal;
    }
    parent = parent.parentElement;
    depth++;
  }
  
  // 方法4: 从script标签获取（MathJax3的常见模式）
  const scriptTag = container.querySelector('script[type="math/tex"], script[type="math/tex; mode=display"]');
  if (scriptTag && scriptTag.textContent) {
    console.log('方法4成功: 从script标签获取');
    const content = scriptTag.textContent.trim();
    // 根据script类型决定是行内还是行间公式
    if (scriptTag.getAttribute('type') === 'math/tex; mode=display') {
      return `$$${content}$$`;
    } else {
      return `$${content}$`;
    }
  }
  
  // 方法5: 尝试从TeX格式转换
  const texContent = getTexContent(container);
  if (texContent) {
    console.log('方法5成功: 从TeX格式转换');
    // 判断是行内公式还是行间公式
    if (container.hasAttribute('display') && container.getAttribute('display') === 'true') {
      return `$$${texContent}$$`;
    } else {
      return `$${texContent}$`;
    }
  }
  
  console.log('所有方法都失败，返回null');
  return null;
}

/**
 * 检查两个元素是否在DOM中相邻
 * @param {HTMLElement} elem1 - 第一个元素
 * @param {HTMLElement} elem2 - 第二个元素
 * @returns {boolean} 是否相邻
 */
function isElementNearby(elem1, elem2) {
  // 检查是否是兄弟元素
  if (elem1.nextElementSibling === elem2 || elem1.previousElementSibling === elem2) {
    return true;
  }
  
  // 检查是否有共同的父元素且距离较近
  const parent1 = elem1.parentElement;
  const parent2 = elem2.parentElement;
  
  if (parent1 === parent2) {
    // 在同一父元素下，检查索引位置
    const children = Array.from(parent1.children);
    const index1 = children.indexOf(elem1);
    const index2 = children.indexOf(elem2);
    
    if (index1 !== -1 && index2 !== -1 && Math.abs(index1 - index2) <= 3) {
      return true;
    }
  }
  
  return false;
}

/**
 * 从MathJax容器中提取TeX内容
 * @param {HTMLElement} container - MathJax容器元素
 * @returns {string|null} TeX内容或null
 */
function getTexContent(container) {
  // 尝试从MathJax的内部表示中提取
  const mathElement = container.querySelector('mjx-math');
  if (mathElement && mathElement.hasAttribute('aria-label')) {
    const ariaLabel = mathElement.getAttribute('aria-label');
    // MathJax的aria-label通常包含TeX格式
    if (ariaLabel && ariaLabel.startsWith('\\(') && ariaLabel.endsWith('\\)')) {
      return ariaLabel.slice(2, -2);
    }
  }
  
  // 尝试从alttext获取
  const altText = container.getAttribute('alttext');
  if (altText) {
    return altText;
  }
  
  return null;
}

/**
 * 处理数学公式的双击事件
 * @param {Event} event - 双击事件
 */
function handleMathDoubleClick(event) {
  event.preventDefault();
  event.stopPropagation();
  
  const container = event.currentTarget;
  let markdownFormula = mathFormulaMap.get(container);
  
  // 如果没有存储的Markdown，尝试实时提取
  if (!markdownFormula) {
    console.log('尝试查找原始Markdown公式...');
    markdownFormula = findOriginalMarkdown(container);
    console.log('findOriginalMarkdown 结果:', markdownFormula);
    
    // 如果还是找不到，使用TeX格式
    if (!markdownFormula) {
      console.log('尝试从TeX格式提取...');
      const texContent = getTexContent(container);
      console.log('getTexContent 结果:', texContent);
      if (texContent) {
        if (container.hasAttribute('display') && container.getAttribute('display') === 'true') {
          markdownFormula = `$$${texContent}$$`;
        } else {
          markdownFormula = `$${texContent}$`;
        }
      } else {
        markdownFormula = '无法提取公式';
      }
    }
  }
  
  console.log('最终要复制的公式:', markdownFormula);
  
  // 复制到剪贴板
  copyToClipboard(markdownFormula);
  
  // 显示反馈
  showCopyFeedback(container, markdownFormula);
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 */
function copyToClipboard(text) {
  // 使用现代剪贴板API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('复制失败:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    // 回退方案
    fallbackCopyToClipboard(text);
  }
}

/**
 * 回退的剪贴板复制方法
 * @param {string} text - 要复制的文本
 */
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('回退复制失败:', err);
  }
  
  document.body.removeChild(textArea);
}

/**
 * 显示复制反馈
 * @param {HTMLElement} container - MathJax容器元素
 * @param {string} formula - 复制的公式
 */
function showCopyFeedback(container, formula) {
  // 移除现有的反馈元素
  const existingFeedback = container.querySelector('.math-copy-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }
  
  // 创建反馈元素
  const feedback = document.createElement('div');
  feedback.className = 'math-copy-feedback';
  feedback.textContent = '✓ 已复制';
  feedback.style.cssText = `
    position: absolute;
    background: rgba(0, 150, 0, 0.9);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 10000;
    pointer-events: none;
    animation: fadeOut 2s forwards;
    white-space: nowrap;
  `;
  
  // 添加到容器
  container.style.position = 'relative';
  container.appendChild(feedback);
  
  // 定位反馈元素
  const rect = container.getBoundingClientRect();
  feedback.style.top = `${rect.height}px`;
  feedback.style.left = '50%';
  feedback.style.transform = 'translateX(-50%)';
  
  // 3秒后移除反馈
  setTimeout(() => {
    if (feedback.parentNode) {
      feedback.remove();
    }
  }, 2000);
}

/**
 * 设置MutationObserver以监听DOM变化
 */
function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldUpdate = true;
      }
    });
    
    if (shouldUpdate) {
      // 防抖处理
      clearTimeout(window.mathCopyUpdateTimeout);
      window.mathCopyUpdateTimeout = setTimeout(() => {
        setupMathCopy();
      }, 500);
    }
  });
  
  // 观察整个文档的变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/**
 * 添加必要的CSS样式
 */
function addStyles() {
  if (document.getElementById('math-copy-styles')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'math-copy-styles';
  style.textContent = `
    mjx-container.math-copy-enabled {
      cursor: pointer !important;
      transition: background-color 0.2s;
    }
    
    mjx-container.math-copy-enabled:hover {
      background-color: rgba(0, 120, 215, 0.1) !important;
      border-radius: 4px;
    }
    
    @keyframes fadeOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }
    
    .math-copy-feedback {
      animation: fadeOut 2s forwards !important;
    }
  `;
  
  document.head.appendChild(style);
}

// 初始化
if (typeof window !== 'undefined') {
  // 添加样式
  addStyles();
  
  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initMathCopy();
    });
  } else {
    initMathCopy();
  }
  
  // 路由变化时重新初始化（VitePress特定）
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('vitepress:after-switch', () => {
      setTimeout(initMathCopy, 100);
    });
  }
}
