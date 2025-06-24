/**
 * AI智能面试系统 - 悬停交互增强
 * 为UI元素增加高级悬停效果
 */

// 悬停效果控制器
class HoverEffects {
  constructor() {
    // 配置
    this.config = {
      // 悬停动画时长(ms)
      animationDuration: 300,
      // 3D效果强度
      tiltIntensity: 10,
      // 光晕效果强度
      glowIntensity: 0.15,
      // 粒子数量
      particleCount: 15
    };
    
    // 状态
    this.initialized = false;
    this.trackingElements = new Map();
  }
  
  // 初始化
  init() {
    if (this.initialized) return;
    
    console.log('🚀 初始化高级悬停效果...');
    
    // 添加高级悬停效果
    this.setupCardHoverEffects();
    this.setupMetricHoverEffects();
    this.setupButtonHoverEffects();
    this.setupProgressBarHoverEffects();
    
    // 添加通用悬停跟踪
    this.setupGlobalHoverTracking();
    
    // 添加窗口大小改变事件监听
    window.addEventListener('resize', this.handleResize.bind(this));
    
    this.initialized = true;
    console.log('✨ 高级悬停效果初始化完成');
  }
  
  // 设置卡片悬停效果
  setupCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      // 为每个卡片添加光晕层
      const glowLayer = document.createElement('div');
      glowLayer.className = 'card-glow-layer';
      glowLayer.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 0;
        background: radial-gradient(circle at 50% 50%, 
          rgba(0, 208, 255, ${this.config.glowIntensity}), 
          transparent 70%);
        opacity: 0;
        transition: opacity ${this.config.animationDuration}ms ease-out;
      `;
      
      // 添加到卡片
      if (card.style.position !== 'relative' && card.style.position !== 'absolute') {
        card.style.position = 'relative';
      }
      card.appendChild(glowLayer);
      
      // 鼠标进入事件
      card.addEventListener('mouseenter', e => {
        // 添加活跃类
        card.classList.add('hover-active');
        
        // 显示光晕
        glowLayer.style.opacity = '1';
        
        // 创建粒子效果
        this.createParticleEffect(card);
      });
      
      // 鼠标移动事件 - 3D倾斜效果
      card.addEventListener('mousemove', e => {
        if (!card.classList.contains('hover-active')) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 计算倾斜角度
        const tiltX = (y / rect.height - 0.5) * this.config.tiltIntensity;
        const tiltY = (0.5 - x / rect.width) * this.config.tiltIntensity;
        
        // 应用3D变换
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // 更新光晕位置
        glowLayer.style.background = `radial-gradient(circle at ${x}px ${y}px, 
          rgba(0, 208, 255, ${this.config.glowIntensity * 1.5}), 
          transparent 70%)`;
      });
      
      // 鼠标离开事件
      card.addEventListener('mouseleave', () => {
        // 移除活跃类
        card.classList.remove('hover-active');
        
        // 重置变换
        card.style.transform = '';
        
        // 隐藏光晕
        glowLayer.style.opacity = '0';
      });
    });
  }
  
  // 设置指标悬停效果
  setupMetricHoverEffects() {
    const metrics = document.querySelectorAll('.realtime-metrics .metric, .metric-item');
    
    metrics.forEach(metric => {
      // 鼠标进入事件
      metric.addEventListener('mouseenter', () => {
        // 添加脉冲动画到数值
        const valueElement = metric.querySelector('.metric-value, .value');
        if (valueElement) {
          valueElement.classList.add('pulse-animation');
        }
        
        // 添加闪光效果到进度条
        const progressElement = metric.querySelector('.progress, .metric-fill');
        if (progressElement) {
          progressElement.classList.add('shine-animation');
        }
      });
      
      // 鼠标离开事件
      metric.addEventListener('mouseleave', () => {
        // 移除脉冲动画
        const valueElement = metric.querySelector('.metric-value, .value');
        if (valueElement) {
          valueElement.classList.remove('pulse-animation');
        }
        
        // 移除闪光效果
        const progressElement = metric.querySelector('.progress, .metric-fill');
        if (progressElement) {
          progressElement.classList.remove('shine-animation');
        }
      });
    });
    
    // 添加脉冲和闪光动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-animation {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.9; }
      }
      
      .pulse-animation {
        animation: pulse-animation 1.5s infinite ease-in-out;
      }
      
      @keyframes shine-animation {
        0% { 
          background-position: -100% 0; 
        }
        100% { 
          background-position: 200% 0; 
        }
      }
      
      .shine-animation::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 255, 255, 0.4) 50%, 
          transparent 100%);
        animation: shine-animation 1.5s infinite;
        background-size: 200% 100%;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 设置按钮悬停效果
  setupButtonHoverEffects() {
    const buttons = document.querySelectorAll('button:not(.close-modal)');
    
    buttons.forEach(button => {
      // 鼠标进入事件
      button.addEventListener('mouseenter', () => {
        // 添加活跃类
        button.classList.add('button-hover-active');
        
        // 创建涟漪效果
        this.createRippleEffect(button);
      });
      
      // 鼠标离开事件
      button.addEventListener('mouseleave', () => {
        // 移除活跃类
        button.classList.remove('button-hover-active');
      });
      
      // 点击事件 - 创建点击涟漪
      button.addEventListener('click', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.createClickRipple(button, x, y);
      });
    });
  }
  
  // 设置进度条悬停效果
  setupProgressBarHoverEffects() {
    const progressBars = document.querySelectorAll('.progress-bar, .metric-bar');
    
    progressBars.forEach(bar => {
      // 鼠标进入事件
      bar.addEventListener('mouseenter', () => {
        // 添加活跃类
        bar.classList.add('progress-hover-active');
        
        // 获取进度条填充元素
        const fill = bar.querySelector('.progress, .metric-fill');
        if (fill) {
          // 添加闪光效果
          fill.classList.add('progress-shine');
          
          // 添加发光效果
          fill.style.boxShadow = '0 0 10px rgba(0, 208, 255, 0.8)';
        }
      });
      
      // 鼠标离开事件
      bar.addEventListener('mouseleave', () => {
        // 移除活跃类
        bar.classList.remove('progress-hover-active');
        
        // 获取进度条填充元素
        const fill = bar.querySelector('.progress, .metric-fill');
        if (fill) {
          // 移除闪光效果
          fill.classList.remove('progress-shine');
          
          // 重置发光效果
          fill.style.boxShadow = '';
        }
      });
    });
    
    // 添加闪光动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes progress-shine {
        0% {
          background-position: -100% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      .progress-shine::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 255, 255, 0.4) 20%, 
          transparent 40%);
        animation: progress-shine 1.5s infinite linear;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 创建粒子效果
  createParticleEffect(element) {
    // 检查是否已经有Canvas
    let canvas = element.querySelector('.particle-canvas');
    if (!canvas) {
      // 创建Canvas元素
      canvas = document.createElement('canvas');
      canvas.className = 'particle-canvas';
      canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      `;
      
      // 添加到元素
      element.appendChild(canvas);
    }
    
    // 设置Canvas尺寸
    const rect = element.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // 创建粒子
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        life: Math.random() * 50 + 50,
        opacity: Math.random() * 0.5 + 0.5
      });
    }
    
    // 动画粒子
    let frame = 0;
    const animate = () => {
      if (!element.classList.contains('hover-active')) {
        // 如果不再处于悬停状态，清除Canvas并停止动画
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      
      // 清除Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新和绘制粒子
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // 更新位置和生命周期
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        p.opacity -= 0.01;
        
        // 如果粒子消失，重置它
        if (p.life <= 0 || p.opacity <= 0) {
          p.x = Math.random() * rect.width;
          p.y = Math.random() * rect.height;
          p.size = Math.random() * 3 + 1;
          p.speedX = Math.random() * 2 - 1;
          p.speedY = Math.random() * 2 - 1;
          p.life = Math.random() * 50 + 50;
          p.opacity = Math.random() * 0.5 + 0.5;
        }
        
        // 绘制粒子
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 208, 255, ${p.opacity})`;
        ctx.fill();
      }
      
      // 请求下一帧
      frame = requestAnimationFrame(animate);
    };
    
    // 开始动画
    animate();
    
    // 将动画帧ID添加到元素
    element.animationFrame = frame;
  }
  
  // 创建涟漪效果
  createRippleEffect(button) {
    // 确保按钮是相对定位的
    if (button.style.position !== 'relative' && button.style.position !== 'absolute') {
      button.style.position = 'relative';
    }
    
    // 创建涟漪容器
    let rippleContainer = button.querySelector('.ripple-container');
    if (!rippleContainer) {
      rippleContainer = document.createElement('div');
      rippleContainer.className = 'ripple-container';
      rippleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        border-radius: inherit;
        pointer-events: none;
      `;
      button.appendChild(rippleContainer);
    }
    
    // 创建悬停涟漪
    const ripple = document.createElement('div');
    ripple.className = 'button-ripple';
    ripple.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, 
        rgba(255, 255, 255, 0.2) 0%, 
        transparent 70%);
      opacity: 0;
      transform: scale(0);
      transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    `;
    
    rippleContainer.appendChild(ripple);
    
    // 显示涟漪
    setTimeout(() => {
      ripple.style.opacity = '1';
      ripple.style.transform = 'scale(1)';
    }, 10);
    
    // 移除涟漪
    button.addEventListener('mouseleave', () => {
      ripple.style.opacity = '0';
      
      // 清除涟漪元素
      setTimeout(() => {
        if (ripple.parentNode === rippleContainer) {
          rippleContainer.removeChild(ripple);
        }
      }, 600);
    }, { once: true });
  }
  
  // 创建点击涟漪
  createClickRipple(button, x, y) {
    // 确保按钮是相对定位的
    if (button.style.position !== 'relative' && button.style.position !== 'absolute') {
      button.style.position = 'relative';
    }
    
    // 创建涟漪容器
    let rippleContainer = button.querySelector('.ripple-container');
    if (!rippleContainer) {
      rippleContainer = document.createElement('div');
      rippleContainer.className = 'ripple-container';
      rippleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        border-radius: inherit;
        pointer-events: none;
      `;
      button.appendChild(rippleContainer);
    }
    
    // 计算涟漪大小
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    // 创建点击涟漪
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.cssText = `
      position: absolute;
      top: ${y - size / 2}px;
      left: ${x - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle at center, 
        rgba(255, 255, 255, 0.3) 0%, 
        transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      opacity: 1;
      animation: click-ripple 0.6s ease-out forwards;
    `;
    
    rippleContainer.appendChild(ripple);
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes click-ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // 移除涟漪
    setTimeout(() => {
      if (ripple.parentNode === rippleContainer) {
        rippleContainer.removeChild(ripple);
      }
    }, 600);
  }
  
  // 设置全局悬停跟踪
  setupGlobalHoverTracking() {
    // 跟踪可悬停元素
    const hoverElements = document.querySelectorAll('.card, button, .metric, .progress-bar, .metric-bar, .chart-container');
    
    hoverElements.forEach(element => {
      // 为元素添加统一的悬停类
      element.classList.add('hover-trackable');
      
      // 记录原始变换和阴影
      const computedStyle = window.getComputedStyle(element);
      const originalTransform = computedStyle.transform === 'none' ? '' : computedStyle.transform;
      const originalBoxShadow = computedStyle.boxShadow === 'none' ? '' : computedStyle.boxShadow;
      
      // 存储原始状态
      this.trackingElements.set(element, {
        originalTransform,
        originalBoxShadow
      });
    });
  }
  
  // 处理窗口大小改变
  handleResize() {
    // 重置Canvas元素
    document.querySelectorAll('.particle-canvas').forEach(canvas => {
      const element = canvas.parentElement;
      const rect = element.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
    });
  }
}

// 在文档加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 等待DOM完全加载
  setTimeout(() => {
    const hoverEffects = new HoverEffects();
    hoverEffects.init();
    
    // 将实例暴露给全局，以便调试
    window.hoverEffects = hoverEffects;
  }, 1000);
}); 