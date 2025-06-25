/**
 * AI智能面试系统 - 悬浮元素生成与控制
 * 动态创建高科技浮动元素装饰效果
 */

document.addEventListener('DOMContentLoaded', () => {
  // 初始化浮动元素
  initFloatingElements();
  
  // 初始化科技装饰线
  initTechDecorators();
  
  // 初始化脉冲光环
  initPulseAuras();
});

/**
 * 初始化浮动装饰元素
 */
function initFloatingElements() {
  const container = document.querySelector('.floating-elements');
  if (!container) return;
  
  // 检测是否为移动设备
  if (window.innerWidth <= 768) return;
  
  // 浮动元素类型
  const elementTypes = [
    'element-circle',
    'element-hex',
    'element-square',
    'element-ring',
    'element-dot'
  ];
  
  // 创建不同类型的浮动元素
  for (let i = 0; i < 20; i++) {
    const element = document.createElement('div');
    element.classList.add('floating-element');
    
    // 随机选择元素类型
    const typeIndex = Math.floor(Math.random() * elementTypes.length);
    element.classList.add(elementTypes[typeIndex]);
    
    // 随机大小 (8px - 30px)
    const size = Math.floor(Math.random() * 22) + 8;
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    
    // 随机位置
    const xPos = Math.floor(Math.random() * 100);
    element.style.left = `${xPos}%`;
    element.style.bottom = '-20px';
    
    // 随机动画延迟
    const delay = Math.random() * 15;
    element.style.animationDelay = `${delay}s`;
    
    // 随机动画持续时间 (10-20s)
    const duration = Math.random() * 10 + 10;
    element.style.animationDuration = `${duration}s`;
    
    container.appendChild(element);
  }
}

/**
 * 初始化科技装饰线
 */
function initTechDecorators() {
  const container = document.querySelector('.floating-elements');
  if (!container) return;
  
  // 检测是否为移动设备
  if (window.innerWidth <= 768) return;
  
  // 创建水平装饰线
  for (let i = 0; i < 3; i++) {
    const decorator = document.createElement('div');
    decorator.classList.add('tech-decorator', 'horizontal');
    
    // 随机位置
    const top = 20 + Math.floor(Math.random() * 60); // 20% - 80%
    decorator.style.top = `${top}%`;
    
    const left = Math.floor(Math.random() * 30);
    decorator.style.left = `${left}%`;
    
    // 随机长度
    const width = 100 + Math.floor(Math.random() * 150);
    decorator.style.width = `${width}px`;
    
    // 随机动画延迟
    const delay = Math.random() * 5;
    decorator.style.animationDelay = `${delay}s`;
    
    container.appendChild(decorator);
  }
  
  // 创建垂直装饰线
  for (let i = 0; i < 3; i++) {
    const decorator = document.createElement('div');
    decorator.classList.add('tech-decorator', 'vertical');
    
    // 随机位置
    const left = 10 + Math.floor(Math.random() * 80); // 10% - 90%
    decorator.style.left = `${left}%`;
    
    const top = Math.floor(Math.random() * 30);
    decorator.style.top = `${top}%`;
    
    // 随机长度
    const height = 100 + Math.floor(Math.random() * 150);
    decorator.style.height = `${height}px`;
    
    // 随机动画延迟
    const delay = Math.random() * 5;
    decorator.style.animationDelay = `${delay}s`;
    
    container.appendChild(decorator);
  }
}

/**
 * 初始化脉冲光环
 */
function initPulseAuras() {
  const container = document.querySelector('.floating-elements');
  if (!container) return;
  
  // 检测是否为移动设备
  if (window.innerWidth <= 768) return;
  
  // 获取重点元素位置
  const videoContainer = document.querySelector('.video-container');
  const radarChart = document.querySelector('.radar-chart-container');
  
  if (videoContainer) {
    const rect = videoContainer.getBoundingClientRect();
    
    // 创建脉冲光环
    for (let i = 0; i < 3; i++) {
      const aura = document.createElement('div');
      aura.classList.add('pulse-aura');
      
      // 设置位置和大小
      const size = 40 + i * 20; // 逐渐增大的同心圆
      aura.style.width = `${size}px`;
      aura.style.height = `${size}px`;
      
      // 设置位置
      aura.style.left = `${rect.left + rect.width / 2}px`;
      aura.style.top = `${rect.top + rect.height / 2}px`;
      
      // 设置动画延迟
      aura.style.animationDelay = `${i * 0.8}s`;
      
      container.appendChild(aura);
    }
  }
  
  if (radarChart) {
    const rect = radarChart.getBoundingClientRect();
    
    // 为雷达图创建脉冲光环
    for (let i = 0; i < 2; i++) {
      const aura = document.createElement('div');
      aura.classList.add('pulse-aura');
      
      // 设置位置和大小
      const size = 30 + i * 20; // 逐渐增大的同心圆
      aura.style.width = `${size}px`;
      aura.style.height = `${size}px`;
      
      // 设置位置
      aura.style.left = `${rect.left + rect.width / 2}px`;
      aura.style.top = `${rect.top + rect.height / 2}px`;
      
      // 设置动画延迟
      aura.style.animationDelay = `${i * 1}s`;
      
      container.appendChild(aura);
    }
  }
}

// 窗口大小改变时重新定位装饰元素
window.addEventListener('resize', () => {
  // 移除所有现有装饰元素
  const container = document.querySelector('.floating-elements');
  if (!container) return;
  
  container.innerHTML = '';
  
  // 重新初始化所有装饰元素
  initFloatingElements();
  initTechDecorators();
  
  // 延迟添加脉冲光环，以便获取正确的元素位置
  setTimeout(() => {
    initPulseAuras();
  }, 500);
}); 