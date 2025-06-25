/**
 * AI智能面试系统 - 全局UI交互增强
 * 为界面添加微动画和交互效果，不改变原始功能
 */

document.addEventListener('DOMContentLoaded', function() {
  // 等待页面完全加载后应用增强效果
  setTimeout(enhanceGlobalUI, 1000);
});

// 全局UI增强主函数
function enhanceGlobalUI() {
  console.log('正在应用全局UI增强效果...');
  
  enhanceCardHovers();
  enhanceButtonEffects();
  addParallaxEffects();
  addSectionTransitions();
  addTypingEffects();
  enhanceFormElements();
  
  console.log('全局UI增强完成');
}

// 增强卡片悬停效果
function enhanceCardHovers() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // 添加3D倾斜效果
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // 计算倾斜角度
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / 20;
      const rotateX = (centerY - y) / 20;
      
      // 应用变换
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
    });
    
    // 鼠标离开时恢复
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'transform 0.5s ease-out';
    });
    
    // 防止冲突
    card.addEventListener('transitionend', function() {
      this.style.transition = '';
    });
  });
}

// 增强按钮效果
function enhanceButtonEffects() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    // 添加波纹效果
    button.addEventListener('click', function(e) {
      // 创建波纹元素
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      this.appendChild(ripple);
      
      // 设置波纹位置
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - (size / 2);
      const y = e.clientY - rect.top - (size / 2);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // 移除波纹
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // 添加波纹样式
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      button {
        position: relative;
        overflow: hidden;
      }
      .ripple-effect {
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to {
          transform: scale(1.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// 添加视差效果
function addParallaxEffects() {
  const techLines = document.querySelectorAll('.tech-line');
  
  // 随机设置初始位置和速度
  techLines.forEach((line, index) => {
    const speed = 0.5 + Math.random() * 2;
    line.dataset.speed = speed;
    line.style.transform = `translateX(${Math.random() * 100}%)`;
  });
  
  // 监听鼠标移动
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    techLines.forEach(line => {
      const speed = parseFloat(line.dataset.speed);
      const offsetX = (0.5 - mouseX) * 30 * speed;
      
      line.style.transform = `translateX(${offsetX}px)`;
    });
  });
}

// 为各部分添加过渡效果
function addSectionTransitions() {
  const sections = document.querySelectorAll('.card, .profile-section');
  
  // 添加淡入效果样式
  const fadeStyle = document.createElement('style');
  fadeStyle.textContent = `
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(fadeStyle);
  
  // 创建交集观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fade-in-up 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // 观察所有部分
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    // 错开动画时间
    setTimeout(() => {
      observer.observe(section);
    }, index * 100);
  });
}

// 添加打字机效果
function addTypingEffects() {
  const headings = document.querySelectorAll('h1, h2');
  
  headings.forEach(heading => {
    // 只为首屏标题添加效果
    if (isElementInViewport(heading)) {
      const text = heading.textContent;
      heading.textContent = '';
      heading.style.borderRight = '2px solid var(--accent-color)';
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          heading.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          heading.style.borderRight = 'none';
        }
      }, 50);
    }
  });
}

// 增强表单元素交互
function enhanceFormElements() {
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    // 聚焦效果
    input.addEventListener('focus', function() {
      this.parentNode.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentNode.classList.remove('input-focused');
    });
  });
  
  // 添加聚焦样式
  const focusStyle = document.createElement('style');
  focusStyle.textContent = `
    .input-focused label {
      color: var(--accent-color);
      text-shadow: 0 0 5px rgba(0, 208, 255, 0.3);
      transform: translateY(-5px);
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(focusStyle);
}

// 辅助函数: 检查元素是否在视口中
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
} 