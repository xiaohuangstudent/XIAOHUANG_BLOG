// 自定义图片放大组件
export function initImageZoom() {
  // 等待DOM加载完成
  if (typeof document === 'undefined') return;

  const images = document.querySelectorAll('.vp-doc img');
  let zoomedImage = null;
  let zoomOverlay = null;
  let closeButton = null;
  let scale = 1;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let translateX = 0;
  let translateY = 0;

  // 创建放大覆盖层
  function createOverlay() {
    if (zoomOverlay) return;

    zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'image-zoom-overlay';

    // 创建关闭按钮
    closeButton = document.createElement('button');
    closeButton.className = 'image-zoom-close';
    closeButton.innerHTML = '×';
    closeButton.addEventListener('click', closeZoom);

    document.body.appendChild(zoomOverlay);
    document.body.appendChild(closeButton);
  }

  // 打开图片放大
  function openZoom(img) {
    createOverlay();

    // 如果已经有放大的图片，先移除
    if (zoomedImage) {
      zoomOverlay.removeChild(zoomedImage);
    }

    // 创建放大的图片
    zoomedImage = document.createElement('img');
    zoomedImage.src = img.src;
    zoomedImage.alt = img.alt;
    zoomedImage.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      transform: scale(${scale}) translate(${translateX}px, ${translateY}px);
      transition: transform 0.3s;
      cursor: grab;
      user-select: none;
    `;

    // 重置缩放和位置
    scale = 1;
    translateX = 0;
    translateY = 0;

    // 添加鼠标事件
    zoomedImage.addEventListener('mousedown', startDrag);
    zoomedImage.addEventListener('wheel', handleWheel, { passive: false });
    zoomedImage.addEventListener('dblclick', handleDoubleClick);

    zoomOverlay.appendChild(zoomedImage);
    zoomOverlay.style.display = 'flex';
    closeButton.style.display = 'flex';

    // 阻止页面滚动
    document.body.style.overflow = 'hidden';
  }

  // 关闭图片放大
  function closeZoom() {
    if (zoomOverlay) {
      zoomOverlay.style.display = 'none';
      closeButton.style.display = 'none';
      document.body.style.overflow = '';
      
      // 重置状态
      scale = 1;
      translateX = 0;
      translateY = 0;
      isDragging = false;
    }
  }

  // 处理滚轮缩放
  function handleWheel(e) {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.1, Math.min(5, scale + delta));
    
    if (newScale !== scale) {
      scale = newScale;
      updateTransform();
    }
  }

  // 处理双击
  function handleDoubleClick() {
    if (scale === 1) {
      scale = 2;
    } else {
      scale = 1;
      translateX = 0;
      translateY = 0;
    }
    updateTransform();
  }

  // 开始拖拽
  function startDrag(e) {
    if (scale <= 1) return;
    
    isDragging = true;
    dragStartX = e.clientX - translateX;
    dragStartY = e.clientY - translateY;
    zoomedImage.style.cursor = 'grabbing';
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }

  // 拖拽
  function drag(e) {
    if (!isDragging) return;
    
    translateX = e.clientX - dragStartX;
    translateY = e.clientY - dragStartY;
    updateTransform();
  }

  // 停止拖拽
  function stopDrag() {
    isDragging = false;
    zoomedImage.style.cursor = 'grab';
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }

  // 更新变换
  function updateTransform() {
    if (zoomedImage) {
      zoomedImage.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
  }

  // 为所有图片添加双击事件
  images.forEach(img => {
    // 移除之前的点击事件监听器（避免与medium-zoom冲突）
    img.removeEventListener('dblclick', handleImageDoubleClick);
    
    // 添加新的双击事件
    img.addEventListener('dblclick', handleImageDoubleClick);
    
    // 添加鼠标样式提示
    img.style.cursor = 'zoom-in';
  });

  function handleImageDoubleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    openZoom(this);
  }

  // 点击覆盖层关闭
  zoomOverlay?.addEventListener('click', (e) => {
    if (e.target === zoomOverlay) {
      closeZoom();
    }
  });

  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomOverlay?.style.display === 'flex') {
      closeZoom();
    }
  });

  return {
    closeZoom,
    updateTransform
  };
}

// 初始化函数
export function setupImageZoom() {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(initImageZoom, 100);
    });
  }
}
