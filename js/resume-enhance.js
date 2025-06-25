/**
 * 高级简历UI增强脚本
 * 为个人简历添加视觉效果和交互功能
 */

document.addEventListener('DOMContentLoaded', () => {
  initResumeEnhancement();
});

/**
 * 初始化简历增强功能
 */
function initResumeEnhancement() {
  // 初始化视觉效果
  initVisualEffects();
  
  // 初始化交互功能
  initInteractions();
  
  // 优化技能条动画
  enhanceSkillBars();
  
  // 平衡左右栏高度
  balanceColumns();
  
  // 创建滚动动画
  initScrollAnimations();
  
  // 添加打印优化
  setupPrintOptimization();
}

/**
 * 初始化视觉效果
 */
function initVisualEffects() {
  // 添加轻微的视差效果
  addParallaxEffect();
  
  // 增强区块悬停效果
  enhanceSectionHover();
  
  // 给头像添加特效
  enhanceAvatar();
  
  // 创建荧光边框效果
  createGlowingBorders();
}

/**
 * 添加轻微的视差效果
 */
function addParallaxEffect() {
  const profileContainer = document.querySelector('.profile-container');
  if (!profileContainer) return;
  
  // 添加移动时的微妙位移
  document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // 计算微妙位移
    const moveX = (x - 0.5) * 10;
    const moveY = (y - 0.5) * 10;
    
    // 分别为左右栏设置不同的移动效果
    const leftColumn = document.querySelector('.profile-left-column');
    const rightColumn = document.querySelector('.profile-right-column');
    
    if (leftColumn && rightColumn) {
      leftColumn.style.transform = `translate(${moveX * 0.4}px, ${moveY * 0.4}px)`;
      rightColumn.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
    }
  });
}

/**
 * 增强区块悬停效果
 */
function enhanceSectionHover() {
  const sections = document.querySelectorAll('.profile-section');
  
  sections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      // 让当前区块突出显示
      section.style.transform = 'translateY(-5px)';
      section.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 30px rgba(111, 203, 250, 0.12) inset';
      
      // 给其他区块添加模糊效果
      sections.forEach(otherSection => {
        if (otherSection !== section) {
          otherSection.style.filter = 'blur(1px)';
          otherSection.style.opacity = '0.8';
        }
      });
    });
    
    section.addEventListener('mouseleave', () => {
      // 恢复当前区块样式
      section.style.transform = '';
      section.style.boxShadow = '';
      
      // 恢复其他区块样式
      sections.forEach(otherSection => {
        if (otherSection !== section) {
          otherSection.style.filter = '';
          otherSection.style.opacity = '';
        }
      });
    });
  });
}

/**
 * 增强头像效果
 */
function enhanceAvatar() {
  const avatar = document.querySelector('.profile-avatar');
  if (!avatar) return;
  
  // 添加悬停旋转效果
  avatar.addEventListener('mouseenter', () => {
    avatar.style.transform = 'scale(1.05) rotate(5deg)';
    avatar.style.boxShadow = '0 0 35px rgba(111, 203, 250, 0.6), 0 0 0 12px rgba(111, 203, 250, 0.08)';
  });
  
  avatar.addEventListener('mouseleave', () => {
    avatar.style.transform = '';
    avatar.style.boxShadow = '';
  });
  
  // 点击功能 - 上传头像
  avatar.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          avatar.style.backgroundImage = `url(${e.target.result})`;
          avatar.style.backgroundSize = 'cover';
          avatar.style.backgroundPosition = 'center';
          avatar.textContent = '';
        };
        
        reader.readAsDataURL(e.target.files[0]);
      }
    });
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  });
}

/**
 * 创建荧光边框效果
 */
function createGlowingBorders() {
  const container = document.querySelector('.profile-container');
  if (!container) return;
  
  // 添加动态边框光效
  container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    
    // 计算鼠标在容器内的相对位置
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // 计算最近的边
    const dTop = y;
    const dRight = 1 - x;
    const dBottom = 1 - y;
    const dLeft = x;
    
    const min = Math.min(dTop, dRight, dBottom, dLeft);
    
    // 确定光效位置
    let borderSide = '0px solid transparent';
    if (min === dTop) {
      borderSide = `${Math.max(0, 20 * (0.3 - dTop))}px 0 15px -5px rgba(111, 203, 250, 0.7)`;
    } else if (min === dRight) {
      borderSide = `0 ${Math.max(0, 20 * (0.3 - dRight))}px 15px -5px rgba(111, 203, 250, 0.7)`;
    } else if (min === dBottom) {
      borderSide = `${Math.max(0, 20 * (0.3 - dBottom))}px 0 15px -5px rgba(111, 203, 250, 0.7)`;
    } else {
      borderSide = `0 ${Math.max(0, 20 * (0.3 - dLeft))}px 15px -5px rgba(111, 203, 250, 0.7)`;
    }
    
    container.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 80px rgba(111, 203, 250, 0.05) inset, ${borderSide}`;
  });
  
  container.addEventListener('mouseleave', () => {
    container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 80px rgba(111, 203, 250, 0.05) inset';
  });
}

/**
 * 初始化交互功能
 */
function initInteractions() {
  // 技能悬停交互效果
  addSkillInteraction();
  
  // 经历项交互效果
  addExperienceInteraction();
  
  // 为添加按钮添加特效
  enhanceAddButtons();
}

/**
 * 添加技能条交互效果
 */
function addSkillInteraction() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const fill = item.querySelector('.skill-fill');
      if (fill) {
        // 添加强调效果
        fill.style.height = '10px';
        fill.style.boxShadow = '0 0 12px rgba(111, 203, 250, 0.7)';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const fill = item.querySelector('.skill-fill');
      if (fill) {
        // 恢复默认效果
        fill.style.height = '8px';
        fill.style.boxShadow = '';
      }
    });
  });
}

/**
 * 添加经历项交互效果
 */
function addExperienceInteraction() {
  const expItems = document.querySelectorAll('.experience-item');
  
  expItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const node = item.querySelector('.experience-item::after');
      if (node) {
        // 添加强调效果
        node.style.transform = 'scale(1.2)';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const node = item.querySelector('.experience-item::after');
      if (node) {
        // 恢复默认效果
        node.style.transform = '';
      }
    });
  });
}

/**
 * 增强添加按钮效果
 */
function enhanceAddButtons() {
  const addButtons = document.querySelectorAll('.add-experience');
  
  addButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px) scale(1.02)';
      btn.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    });
  });
}

/**
 * 优化技能条动画
 */
function enhanceSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  
  skillFills.forEach(fill => {
    const width = fill.style.width || '0%';
    fill.style.setProperty('--skill-width', width);
    fill.style.width = '0%';
    
    // 观察元素可见性并触发动画
    observeElement(fill);
  });
}

/**
 * 观察元素可见性
 */
function observeElement(element) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 元素进入可视区域，设置动画
          setTimeout(() => {
            const width = element.style.getPropertyValue('--skill-width');
            element.style.width = width;
          }, 300);
          
          // 停止观察
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.2 });
    
    // 开始观察元素
    observer.observe(element);
  } else {
    // 不支持 IntersectionObserver 的浏览器回退方案
    setTimeout(() => {
      const width = element.style.getPropertyValue('--skill-width');
      element.style.width = width;
    }, 500);
  }
}

/**
 * 平衡左右栏高度确保末尾对齐
 */
function balanceColumns() {
  const leftColumn = document.querySelector('.profile-left-column');
  const rightColumn = document.querySelector('.profile-right-column');
  
  if (!leftColumn || !rightColumn) return;
  
  // 初次平衡
  adjustColumnHeights();
  
  // 监听窗口大小变化
  window.addEventListener('resize', debounce(adjustColumnHeights, 200));
  
  // 监听图片加载和字体加载，确保所有内容都加载完成后重新平衡
  window.addEventListener('load', adjustColumnHeights);
  
  // 每次内容变化后再次平衡
  const observer = new MutationObserver(debounce(adjustColumnHeights, 300));
  observer.observe(leftColumn, { childList: true, subtree: true });
  observer.observe(rightColumn, { childList: true, subtree: true });
}

/**
 * 调整列高度使其保持平衡
 */
function adjustColumnHeights() {
  const leftColumn = document.querySelector('.profile-left-column');
  const rightColumn = document.querySelector('.profile-right-column');
  
  if (!leftColumn || !rightColumn) return;
  
  // 重置高度
  leftColumn.style.minHeight = 'auto';
  rightColumn.style.minHeight = 'auto';
  
  // 获取当前高度
  const leftHeight = leftColumn.offsetHeight;
  const rightHeight = rightColumn.offsetHeight;
  
  // 设置为较高的那个高度
  if (leftHeight > rightHeight) {
    rightColumn.style.minHeight = leftHeight + 'px';
  } else if (rightHeight > leftHeight) {
    leftColumn.style.minHeight = rightHeight + 'px';
  }
  
  // 设置末尾对齐标记位置
  positionEndMarkers();
}

/**
 * 设置末尾对齐标记位置
 */
function positionEndMarkers() {
  const leftMarker = document.querySelector('.profile-left-column .profile-column-end-marker');
  const rightMarker = document.querySelector('.profile-right-column .profile-column-end-marker');
  
  if (!leftMarker || !rightMarker) return;
  
  // 激活动画
  leftMarker.style.animation = 'bounce-glow 3s infinite ease-in-out';
  rightMarker.style.animation = 'bounce-glow 3s infinite ease-in-out 1.5s';
}

/**
 * 初始化滚动动画效果
 */
function initScrollAnimations() {
  // 保存所有需要动画的元素
  const sections = [
    ...document.querySelectorAll('.profile-section'),
    ...document.querySelectorAll('.skill-item'),
    ...document.querySelectorAll('.experience-item'),
    ...document.querySelectorAll('.contact-item')
  ];
  
  // 如果浏览器支持 IntersectionObserver
  if ('IntersectionObserver' in window) {
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 元素进入视口，添加动画类
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // 为每个元素初始化
    sections.forEach((element, index) => {
      // 添加初始样式和动画类
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      
      // 添加动画触发监听
      observer.observe(element);
    });
    
    // 添加动画完成监听
    document.addEventListener('animationend', (e) => {
      if (sections.includes(e.target)) {
        e.target.style.opacity = '';
        e.target.style.transform = '';
      }
    }, { passive: true });
  } else {
    // 不支持时的备用方案
    sections.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 300 + index * 100);
    });
  }
  
  // 给动画元素添加CSS类
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .animated {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>
  `);
}

/**
 * 优化打印体验
 */
function setupPrintOptimization() {
  // 监听打印事件
  window.addEventListener('beforeprint', () => {
    // 保存原始样式
    const profileSections = document.querySelectorAll('.profile-section');
    profileSections.forEach(section => {
      section.dataset.originalStyle = section.getAttribute('style') || '';
      section.style = '';
    });
    
    // 优化技能条宽度
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
      const width = fill.style.getPropertyValue('--skill-width');
      fill.style.width = width;
    });
    
    // 隐藏视觉元素
    document.querySelectorAll('.column-connector, .profile-column-end-marker').forEach(el => {
      el.style.display = 'none';
    });
  });
  
  // 打印完成后恢复
  window.addEventListener('afterprint', () => {
    const profileSections = document.querySelectorAll('.profile-section');
    profileSections.forEach(section => {
      if (section.dataset.originalStyle) {
        section.setAttribute('style', section.dataset.originalStyle);
      }
    });
    
    document.querySelectorAll('.column-connector, .profile-column-end-marker').forEach(el => {
      el.style.display = '';
    });
  });
}

/**
 * 防抖函数，优化事件处理
 */
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
} 