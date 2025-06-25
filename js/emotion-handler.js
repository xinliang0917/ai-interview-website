/**
 * AI智能面试系统 - 情绪处理脚本
 * 处理情绪变化的动画效果并进行UI更新
 */

// 在文档加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 初始化情绪处理
  initEmotionHandler();
});

/**
 * 初始化情绪处理
 */
function initEmotionHandler() {
  // 获取情绪标签元素
  const emotionElement = document.getElementById('emotion');
  if (!emotionElement) return;
  
  // 添加情绪变化观察器
  setupEmotionObserver(emotionElement);
  
  // 初始化情绪标签效果
  enhanceEmotionLabel(emotionElement);
}

/**
 * 设置情绪变化观察器
 * 监听情绪文本的变化并添加动画效果
 */
function setupEmotionObserver(emotionElement) {
  // 创建MutationObserver实例
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        // 情绪文本已变化
        const newEmotion = emotionElement.textContent;
        
        // 应用变化动画
        applyEmotionChangeAnimation(emotionElement);
        
        // 更新情绪标签样式
        updateEmotionStyle(emotionElement, newEmotion);
      }
    });
  });
  
  // 配置观察选项
  const config = { characterData: true, childList: true, subtree: true };
  
  // 开始观察
  observer.observe(emotionElement, config);
}

/**
 * 应用情绪变化动画
 */
function applyEmotionChangeAnimation(element) {
  // 添加动画类
  element.classList.add('emotion-change');
  
  // 动画完成后移除类
  setTimeout(() => {
    element.classList.remove('emotion-change');
  }, 1000);
}

/**
 * 增强情绪标签显示效果
 */
function enhanceEmotionLabel(emotionElement) {
  // 获取父容器
  const label = emotionElement.closest('.emotion-label');
  if (!label) return;
  
  // 添加动态效果类
  label.classList.add('enhanced');
  
  // 创建发光效果元素
  const glowEffect = document.createElement('div');
  glowEffect.className = 'emotion-glow';
  label.appendChild(glowEffect);
  
  // 添加悬停效果
  label.addEventListener('mouseenter', () => {
    label.classList.add('hover');
  });
  
  label.addEventListener('mouseleave', () => {
    label.classList.remove('hover');
  });
  
  // 添加初始动画
  setTimeout(() => {
    applyEmotionChangeAnimation(emotionElement);
  }, 500);
}

/**
 * 根据情绪更新样式
 */
function updateEmotionStyle(element, emotion) {
  // 情绪颜色映射
  const emotionColors = {
    '平静': '#64748b',
    '愉快': '#22c55e', 
    '悲伤': '#64748b',
    '愤怒': '#ef4444',
    '恐惧': '#a855f7',
    '厌恶': '#8b5cf6',
    '惊讶': '#eab308',
    '未检测': '#d2e2ff',
    '未检测到人脸': '#d2e2ff'
  };
  
  // 获取对应颜色
  const color = emotionColors[emotion] || '#d2e2ff';
  
  // 应用颜色
  element.style.color = color;
  
  // 获取父容器
  const label = element.closest('.emotion-label');
  if (label) {
    // 更新发光效果颜色
    const glow = label.querySelector('.emotion-glow');
    if (glow) {
      glow.style.boxShadow = `0 0 10px ${color}`;
    }
  }
}

// 添加样式到文档
function addEmotionStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* 情绪标签增强样式 */
    .emotion-label.enhanced {
      position: relative;
      overflow: visible;
      transition: all 0.3s ease;
    }
    
    .emotion-label .emotion-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: var(--radius-full);
      opacity: 0;
      z-index: -1;
      transition: all 0.5s ease;
    }
    
    .emotion-label.hover .emotion-glow {
      opacity: 0.5;
      transform: scale(1.1);
    }
    
    /* 情绪变化动画 */
    @keyframes emotion-pulse {
      0% {
        transform: scale(1);
        filter: brightness(1);
      }
      50% {
        transform: scale(1.1);
        filter: brightness(1.3);
      }
      100% {
        transform: scale(1);
        filter: brightness(1);
      }
    }
    
    .emotion-change {
      animation: emotion-pulse 0.5s ease-in-out;
    }
  `;
  
  document.head.appendChild(styleElement);
}

// 添加情绪样式
addEmotionStyles();

// 提供手动触发情绪更新的函数（用于测试）
function simulateEmotion(emotion) {
  if (window.updateEmotion) {
    window.updateEmotion(emotion);
  } else {
    const emotionElement = document.getElementById('emotion');
    if (emotionElement) {
      emotionElement.textContent = emotion;
    }
  }
} 