/**
 * AI智能面试系统 - 图表视觉增强脚本
 * 不改变原有功能，为图表添加额外的视觉效果
 */

// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 等待确保原始图表已完全加载
  setTimeout(enhanceChartVisuals, 1500);
});

// 图表视觉增强主函数
function enhanceChartVisuals() {
  console.log('正在应用图表视觉增强效果...');
  
  // 应用各种增强效果
  addProgressEndGlow();
  addRadarCenterGlow();
  enhanceChartContainers();
  
  console.log('图表视觉增强完成');
}

// 为进度条添加终点光效
function addProgressEndGlow() {
  // 查找所有进度条
  const progressBars = document.querySelectorAll('.progress-bar .progress');
  
  progressBars.forEach(progress => {
    // 创建终点光效元素
    const endGlow = document.createElement('div');
    endGlow.className = 'progress-end-glow';
    
    // 添加到进度条中
    progress.appendChild(endGlow);
  });
}

// 为雷达图添加中心光效
function addRadarCenterGlow() {
  // 查找所有雷达图容器
  const radarContainers = document.querySelectorAll('.radar-chart-container');
  
  radarContainers.forEach(container => {
    // 确保容器有定位属性
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    
    // 创建中心光效元素
    const centerGlow = document.createElement('div');
    centerGlow.className = 'radar-center-glow';
    
    // 添加到雷达图容器
    container.appendChild(centerGlow);
  });
}

// 增强图表容器的鼠标交互效果
function enhanceChartContainers() {
  const chartContainers = document.querySelectorAll('.chart-container');
  
  chartContainers.forEach(container => {
    // 添加鼠标进入效果
    container.addEventListener('mouseenter', function() {
      // 轻微放大效果
      this.style.transform = 'scale(1.01)';
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 208, 255, 0.3)';
    });
    
    // 添加鼠标离开效果
    container.addEventListener('mouseleave', function() {
      // 恢复原始大小
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    });
  });
}

// 增强实时指标的动态效果
function enhanceRealTimeMetrics() {
  const metricValues = document.querySelectorAll('.realtime-metrics .metric-value');
  
  metricValues.forEach(value => {
    // 获取当前值
    const currentValue = parseInt(value.textContent);
    if (isNaN(currentValue)) return;
    
    // 为值变化添加动画效果
    value.addEventListener('update', function(e) {
      if (!e.detail || isNaN(e.detail.value)) return;
      
      const newValue = parseInt(e.detail.value);
      const oldValue = parseInt(this.textContent);
      
      // 如果变化较大，添加突出效果
      if (Math.abs(newValue - oldValue) > 5) {
        this.classList.add('value-change');
        setTimeout(() => {
          this.classList.remove('value-change');
        }, 1000);
      }
      
      // 更新值
      this.textContent = newValue;
    });
  });
  
  // 添加值变化的CSS效果
  const style = document.createElement('style');
  style.textContent = `
    .value-change {
      animation: value-highlight 1s ease-out;
    }
    
    @keyframes value-highlight {
      0% {
        transform: scale(1);
        text-shadow: 0 0 10px rgba(0, 208, 255, 0.5);
      }
      50% {
        transform: scale(1.2);
        text-shadow: 0 0 20px rgba(0, 208, 255, 0.8);
      }
      100% {
        transform: scale(1);
        text-shadow: 0 0 10px rgba(0, 208, 255, 0.5);
      }
    }
  `;
  document.head.appendChild(style);
}

// 监听窗口大小变化，调整效果
window.addEventListener('resize', function() {
  const isMobile = window.innerWidth <= 768;
  
  // 移动设备上减弱某些效果
  document.querySelectorAll('.chart-container').forEach(container => {
    if (isMobile) {
      container.classList.add('mobile-view');
    } else {
      container.classList.remove('mobile-view');
    }
  });
}); 