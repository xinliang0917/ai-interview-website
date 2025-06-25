/**
 * AI智能面试系统 - 动态科幻效果生成
 * 用于创建粒子、数字雨和其他科幻元素
 */

document.addEventListener('DOMContentLoaded', function() {
  // 等待页面完全加载后初始化科幻效果
  setTimeout(initSciFiEffects, 1500);
});

// 科幻效果主初始化函数
function initSciFiEffects() {
  console.log('正在初始化科幻视觉效果...');
  
  createParticlesBackground();
  createHolographicScan();
  createDataStream();
  createLightBeams();
  createGridPulse();
  createDigitalRain();
  
  console.log('科幻视觉效果初始化完成');
}

// 创建粒子背景
function createParticlesBackground() {
  // 创建粒子容器
  const particles = document.createElement('div');
  particles.className = 'particles-background';
  document.body.appendChild(particles);
  
  // 创建粒子
  const particleCount = isMobileDevice() ? 20 : 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机位置和大小
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 20 + 10;
    
    // 设置样式
    particle.style.left = posX + 'vw';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    particles.appendChild(particle);
  }
}

// 创建全息扫描线
function createHolographicScan() {
  const scanContainer = document.createElement('div');
  scanContainer.className = 'holographic-scan';
  document.body.appendChild(scanContainer);
  
  // 创建扫描线
  const scanLine = document.createElement('div');
  scanLine.className = 'scan-line';
  scanContainer.appendChild(scanLine);
}

// 创建数据流效果
function createDataStream() {
  const dataStream = document.createElement('div');
  dataStream.className = 'data-stream';
  document.body.appendChild(dataStream);
  
  // 创建数据线
  const lineCount = isMobileDevice() ? 10 : 25;
  
  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'data-line';
    
    // 随机属性
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;
    const width = Math.random() * 20 + 5;
    
    // 设置样式
    line.style.animationDelay = delay + 's';
    line.style.animationDuration = duration + 's';
    line.style.width = width + 'px';
    
    dataStream.appendChild(line);
  }
}

// 创建光束效果
function createLightBeams() {
  const beamsContainer = document.createElement('div');
  beamsContainer.className = 'light-beams';
  document.body.appendChild(beamsContainer);
  
  // 添加光束
  const beamCount = isMobileDevice() ? 3 : 8;
  
  for (let i = 0; i < beamCount; i++) {
    const beam = document.createElement('div');
    beam.className = 'light-beam';
    
    // 随机属性
    const height = Math.random() * 80 + 20;
    const posX = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 20 + 20;
    
    // 设置样式
    beam.style.height = height + 'vh';
    beam.style.left = posX + 'vw';
    beam.style.animationDelay = delay + 's';
    beam.style.animationDuration = duration + 's';
    
    beamsContainer.appendChild(beam);
  }
}

// 创建网格脉冲
function createGridPulse() {
  const pulseContainer = document.createElement('div');
  pulseContainer.className = 'grid-pulse';
  document.body.appendChild(pulseContainer);
  
  // 脉冲点击效果
  document.addEventListener('click', function(e) {
    createPulseAtPosition(e.clientX, e.clientY);
  });
  
  // 初始脉冲
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const x = Math.random() * screenWidth;
      const y = Math.random() * screenHeight;
      createPulseAtPosition(x, y);
    }, i * 2000);
  }
}

// 在指定位置创建脉冲
function createPulseAtPosition(x, y) {
  const pulse = document.createElement('div');
  pulse.className = 'pulse-circle';
  
  // 设置位置
  pulse.style.left = x + 'px';
  pulse.style.top = y + 'px';
  pulse.style.animationDuration = Math.random() * 2 + 3 + 's';
  
  // 添加到容器
  const container = document.querySelector('.grid-pulse');
  container.appendChild(pulse);
  
  // 动画结束后移除
  setTimeout(() => {
    container.removeChild(pulse);
  }, 5000);
}

// 创建数字雨效果
function createDigitalRain() {
  if (isMobileDevice()) return; // 在移动设备上省略此效果
  
  const rainContainer = document.createElement('div');
  rainContainer.className = 'digital-rain';
  document.body.appendChild(rainContainer);
  
  // 创建数字雨列
  const columnCount = Math.floor(window.innerWidth / 20);
  
  for (let i = 0; i < columnCount; i++) {
    createRainColumn(rainContainer, i * 20);
  }
}

// 创建单个数字雨列
function createRainColumn(container, xPos) {
  const column = document.createElement('div');
  column.className = 'rain-column';
  
  // 随机属性
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ';
  const length = Math.floor(Math.random() * 20) + 10;
  const text = generateRandomText(chars, length);
  const delay = Math.random() * 10;
  const duration = Math.random() * 10 + 10;
  
  // 设置内容和样式
  column.textContent = text;
  column.style.left = xPos + 'px';
  column.style.animationDuration = duration + 's';
  column.style.animationDelay = delay + 's';
  
  container.appendChild(column);
}

// 生成随机文本
function generateRandomText(chars, length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 为卡片添加全息效果类
function addHologramEffects() {
  const cards = document.querySelectorAll('.video-container, .emotion-trend, .speech-analysis');
  
  cards.forEach(card => {
    card.classList.add('hologram-effect');
  });
  
  const techBorders = document.querySelectorAll('.competitive-analysis .card, .interview-summary .card');
  
  techBorders.forEach(border => {
    border.classList.add('tech-border');
  });
}

// 检测是否为移动设备
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// 窗口大小变化时调整效果
window.addEventListener('resize', function() {
  const existingContainer = document.querySelector('.particles-background');
  if (existingContainer) {
    document.body.removeChild(existingContainer);
    createParticlesBackground();
  }
  
  const existingRain = document.querySelector('.digital-rain');
  if (existingRain) {
    document.body.removeChild(existingRain);
    createDigitalRain();
  }
}); 