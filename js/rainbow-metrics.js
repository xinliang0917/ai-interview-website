/**
 * AI智能面试系统 - 七彩渐变显示条交互效果
 * 为竞争力分析面板添加动态交互和动画效果
 */

// 在文档加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  // 初始化彩虹指标效果
  initRainbowMetrics();
});

/**
 * 初始化彩虹指标效果
 */
function initRainbowMetrics() {
  // 为所有指标添加鼠标悬停效果
  setupHoverEffects();
  
  // 模拟数据变化的动画效果（仅供演示）
  setupDemoAnimations();
  
  // 添加点击指标的交互效果
  setupClickInteractions();
  
  // 应用发光指标效果
  applyGlowEffects();
}

/**
 * 设置指标条的悬停效果
 */
function setupHoverEffects() {
  const metricItems = document.querySelectorAll('.metric-item');
  
  metricItems.forEach(item => {
    // 鼠标进入时
    item.addEventListener('mouseenter', () => {
      // 增加发光效果
      const fill = item.querySelector('.metric-fill');
      if (fill) {
        fill.style.boxShadow = '0 0 15px rgba(0, 208, 255, 0.8)';
      }
    });
    
    // 鼠标离开时
    item.addEventListener('mouseleave', () => {
      // 恢复原来的效果
      const fill = item.querySelector('.metric-fill');
      if (fill) {
        fill.style.boxShadow = '0 0 10px rgba(0, 208, 255, 0.5)';
      }
    });
  });
}

/**
 * 设置演示动画效果
 * 定期随机更新某些指标值以展示动画效果
 */
function setupDemoAnimations() {
  // 每隔一段时间更新一个随机指标
  setInterval(() => {
    // 随机选择一个指标
    const metricItems = document.querySelectorAll('.metric-item');
    if (metricItems.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * metricItems.length);
    const randomItem = metricItems[randomIndex];
    
    // 获取当前值
    const scoreElement = randomItem.querySelector('.metric-score');
    const fillElement = randomItem.querySelector('.metric-fill');
    
    if (!scoreElement || !fillElement) return;
    
    // 当前分数
    const currentScore = parseInt(scoreElement.textContent, 10);
    
    // 生成新分数 (±5以内的变化)
    let newScore = currentScore + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5);
    
    // 确保分数在合理范围内
    newScore = Math.max(60, Math.min(99, newScore));
    
    // 应用动画效果
    updateMetricWithAnimation(scoreElement, fillElement, currentScore, newScore);
  }, 5000); // 每5秒更新一次
}

/**
 * 使用动画更新指标值
 */
function updateMetricWithAnimation(scoreElement, fillElement, oldValue, newValue) {
  // 添加动画类
  scoreElement.classList.add('animate');
  
  // 延迟更新，让动画有时间开始
  setTimeout(() => {
    // 更新分数
    scoreElement.textContent = newValue;
    
    // 更新填充宽度
    fillElement.style.width = `${newValue}%`;
    
    // 根据值的变化设置临时颜色
    if (newValue > oldValue) {
      // 增加时使用绿色闪光
      fillElement.style.boxShadow = '0 0 15px rgba(57, 228, 131, 0.8)';
      scoreElement.style.color = '#39e483';
    } else if (newValue < oldValue) {
      // 减少时使用红色闪光
      fillElement.style.boxShadow = '0 0 15px rgba(255, 61, 113, 0.8)';
      scoreElement.style.color = '#ff3d71';
    }
    
    // 动画结束后恢复原样
    setTimeout(() => {
      scoreElement.classList.remove('animate');
      fillElement.style.boxShadow = '0 0 10px rgba(0, 208, 255, 0.5)';
      scoreElement.style.color = '';
    }, 1000);
  }, 100);
}

/**
 * 设置点击交互
 */
function setupClickInteractions() {
  const metricItems = document.querySelectorAll('.metric-item');
  
  metricItems.forEach(item => {
    item.addEventListener('click', () => {
      // 获取指标的详细数据(这里只是模拟)
      const metricName = item.querySelector('.metric-name').textContent;
      const metricScore = item.querySelector('.metric-score').textContent;
      
      // 显示闪烁效果
      const fill = item.querySelector('.metric-fill');
      if (fill) {
        // 创建闪烁动画
        fill.style.animation = 'none';
        setTimeout(() => {
          fill.style.animation = 'rainbow-flow 8s linear infinite';
        }, 10);
      }
      
      // 这里可以添加更多交互，比如显示详细信息弹窗等
      console.log(`${metricName}: ${metricScore}分`);
    });
  });
}

/**
 * 应用发光效果到指标条
 */
function applyGlowEffects() {
  // 获取所有指标条
  const metricFills = document.querySelectorAll('.metric-fill');
  
  metricFills.forEach(fill => {
    // 初始宽度为0
    const originalWidth = fill.style.width;
    fill.style.width = '0%';
    
    // 触发重绘
    void fill.offsetWidth;
    
    // 应用过渡动画
    fill.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
    
    // 延迟设置回原来的宽度，产生加载动画效果
    setTimeout(() => {
      fill.style.width = originalWidth;
    }, 300);
  });
} 