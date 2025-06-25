/**
 * AI智能面试系统 - 微交互和动态效果处理
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 初始化滚动指示器
  initScrollIndicator();
  
  // 初始化动态数据更新效果
  initDataUpdates();
  
  // 初始化页面切换动画
  initPageTransitions();
  
  // 初始化卡片互动效果
  initCardInteractions();
});

/**
 * 初始化滚动指示器功能
 */
function initScrollIndicator() {
  const scrollIndicator = document.getElementById('scroll-to-top');
  
  if (!scrollIndicator) return;
  
  // 监听滚动事件
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollIndicator.classList.add('visible');
    } else {
      scrollIndicator.classList.remove('visible');
    }
  });
  
  // 点击回到顶部
  scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 初始化动态数据更新效果
 */
function initDataUpdates() {
  // 获取所有需要动态更新的元素
  const metricValues = document.querySelectorAll('.metric-value');
  
  // 模拟数据更新 (实际应用中，这里会是实时数据)
  if (metricValues.length > 0) {
    setInterval(() => {
      // 随机选择一个指标进行更新
      const randomIndex = Math.floor(Math.random() * metricValues.length);
      const element = metricValues[randomIndex];
      
      // 添加更新动画
      element.classList.add('updating');
      
      // 动画结束后移除类
      setTimeout(() => {
        element.classList.remove('updating');
      }, 700);
    }, 3000);
  }
}

/**
 * 初始化页面切换动画
 */
function initPageTransitions() {
  const navigationLinks = document.querySelectorAll('.navigation a');
  const pages = document.querySelectorAll('.dashboard, .history, .settings, .profile');
  
  navigationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 获取目标页面
      const target = link.getAttribute('href').substring(1);
      
      // 更新导航活动状态
      navigationLinks.forEach(navLink => {
        navLink.parentElement.classList.remove('active');
      });
      link.parentElement.classList.add('active');
      
      // 页面切换动画
      pages.forEach(page => {
        if (page.id === target) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      });
    });
  });
}

/**
 * 初始化卡片互动效果
 */
function initCardInteractions() {
  // 获取所有卡片
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // 添加3D倾斜效果 (视差效果)
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return; // 移动设备不启用
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // 鼠标在卡片上的X坐标
      const y = e.clientY - rect.top;  // 鼠标在卡片上的Y坐标
      
      // 计算旋转角度（最大5度）
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -3; // 上下倾斜
      const rotateY = ((x - centerX) / centerX) * 3;  // 左右倾斜
      
      // 应用变换
      card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // 鼠标离开时重置
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
  // 为指标添加悬停特效
  const metrics = document.querySelectorAll('.realtime-metrics .metric');
  
  metrics.forEach(metric => {
    metric.addEventListener('mouseenter', () => {
      const value = metric.querySelector('.metric-value');
      if (value) {
        value.classList.add('highlight');
      }
    });
    
    metric.addEventListener('mouseleave', () => {
      const value = metric.querySelector('.metric-value');
      if (value) {
        value.classList.remove('highlight');
      }
    });
  });
}

/**
 * 添加波纹效果到按钮点击
 */
function addRippleEffect(elements) {
  elements.forEach(element => {
    element.addEventListener('click', function(e) {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// 全局事件委托处理
document.addEventListener('click', (e) => {
  // 检测点击的是否为按钮或导航链接
  if (e.target.closest('button') || e.target.closest('.navigation a')) {
    const element = e.target.closest('button') || e.target.closest('.navigation a');
    
    // 创建波纹特效
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}); 