/**
 * AI智能面试系统 - 增强图表效果
 * 为系统图表添加更具科技感和未来感的视觉效果
 */

// 图表增强函数
function enhanceCharts() {
  // 确保已加载原始图表
  if (window.charts) {
    console.log('正在应用图表视觉增强...');
    
    // 应用增强效果到所有图表
    applyChartEnhancements();
    
    // 添加背景闪烁效果
    addBackgroundPulse();
    
    // 增强雷达图效果
    enhanceRadarCharts();
    
    // 添加动态数据点效果
    addDynamicDataPoints();
    
    console.log('图表视觉增强已完成');
  } else {
    console.warn('基础图表尚未初始化，请先确保图表已加载');
    // 等待图表加载完成
    setTimeout(enhanceCharts, 500);
  }
}

// 应用通用图表增强
function applyChartEnhancements() {
  // 为所有图表应用科技感主题
  const techTheme = {
    // 背景渐变
    backgroundColor: {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [{
        offset: 0, color: 'rgba(26, 43, 99, 0.3)'
      }, {
        offset: 1, color: 'rgba(10, 18, 50, 0.3)'
      }]
    },
    
    // 全局文字样式
    textStyle: {
      fontFamily: 'var(--font-family)',
      color: '#94a3b8',
      fontSize: 12
    },
    
    // 标题样式
    title: {
      textStyle: {
        color: '#d2e2ff',
        fontSize: 14,
        fontWeight: 'normal',
        textShadow: '0 0 5px rgba(0, 208, 255, 0.5)'
      }
    },
    
    // 工具提示增强
    tooltip: {
      backgroundColor: 'rgba(10, 18, 50, 0.85)',
      borderColor: 'rgba(0, 208, 255, 0.3)',
      borderWidth: 1,
      textStyle: {
        color: '#d2e2ff'
      },
      extraCssText: 'backdrop-filter: blur(5px); box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);'
    },
    
    // 轴线样式
    axisLine: {
      lineStyle: {
        color: 'rgba(203, 213, 225, 0.2)',
        width: 1
      }
    },
    
    // 分隔线样式
    splitLine: {
      lineStyle: {
        color: 'rgba(203, 213, 225, 0.1)',
        width: 1,
        type: 'dashed'
      }
    }
  };
  
  // 应用主题到每个图表
  for (const chartName in window.charts) {
    if (window.charts[chartName] && typeof window.charts[chartName].setOption === 'function') {
      // 获取当前配置
      const currentOption = window.charts[chartName].getOption();
      
      // 增强背景效果
      currentOption.backgroundColor = techTheme.backgroundColor;
      
      // 增强文字样式
      if (currentOption.textStyle) {
        Object.assign(currentOption.textStyle, techTheme.textStyle);
      } else {
        currentOption.textStyle = techTheme.textStyle;
      }
      
      // 增强提示框样式
      if (currentOption.tooltip) {
        Object.assign(currentOption.tooltip, techTheme.tooltip);
      }
      
      // 增强轴线样式
      if (currentOption.xAxis && currentOption.xAxis.length > 0) {
        currentOption.xAxis.forEach(axis => {
          if (axis.axisLine) {
            Object.assign(axis.axisLine, { lineStyle: techTheme.axisLine.lineStyle });
          }
          if (axis.splitLine) {
            Object.assign(axis.splitLine, { lineStyle: techTheme.splitLine.lineStyle });
          }
        });
      }
      
      if (currentOption.yAxis && currentOption.yAxis.length > 0) {
        currentOption.yAxis.forEach(axis => {
          if (axis.axisLine) {
            Object.assign(axis.axisLine, { lineStyle: techTheme.axisLine.lineStyle });
          }
          if (axis.splitLine) {
            Object.assign(axis.splitLine, { lineStyle: techTheme.splitLine.lineStyle });
          }
        });
      }
      
      // 为线条增加特效
      enhanceLineSeries(currentOption);
      
      // 应用增强选项
      window.charts[chartName].setOption(currentOption);
    }
  }
}

// 增强线图系列
function enhanceLineSeries(option) {
  if (option.series && option.series.length > 0) {
    option.series.forEach(series => {
      if (series.type === 'line') {
        // 增强线条样式
        series.lineStyle = series.lineStyle || {};
        series.lineStyle.width = 3;
        series.lineStyle.shadowColor = 'rgba(0, 208, 255, 0.5)';
        series.lineStyle.shadowBlur = 10;
        
        // 增强面积样式（如果有）
        if (series.areaStyle) {
          series.areaStyle.opacity = 0.3;
          series.areaStyle.shadowColor = 'rgba(0, 208, 255, 0.2)';
          series.areaStyle.shadowBlur = 15;
        }
        
        // 增加点样式
        series.symbol = 'circle';
        series.symbolSize = 6;
        series.itemStyle = series.itemStyle || {};
        series.itemStyle.borderColor = '#ffffff';
        series.itemStyle.borderWidth = 2;
        series.itemStyle.shadowColor = 'rgba(0, 208, 255, 0.8)';
        series.itemStyle.shadowBlur = 10;
      }
    });
  }
}

// 为图表容器添加背景脉冲效果
function addBackgroundPulse() {
  const chartContainers = document.querySelectorAll('.chart-container');
  
  chartContainers.forEach(container => {
    // 创建脉冲元素
    const pulseElement = document.createElement('div');
    pulseElement.className = 'chart-pulse-effect';
    pulseElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(circle at 50% 50%, 
        rgba(0, 208, 255, 0.1) 0%, 
        transparent 70%);
      opacity: 0;
      animation: pulse-chart-bg 4s infinite ease-in-out;
    `;
    
    // 添加到容器
    container.style.position = 'relative';
    container.appendChild(pulseElement);
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-chart-bg {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  });
}

// 增强雷达图效果
function enhanceRadarCharts() {
  // 识别雷达图
  const radarCharts = ['radar-chart', 'competitive-radar-chart'];
  
  radarCharts.forEach(chartId => {
    const chartElement = document.getElementById(chartId);
    if (chartElement && window.charts[chartId]) {
      // 获取当前配置
      const currentOption = window.charts[chartId].getOption();
      
      // 增强雷达轴线
      if (currentOption.radar && currentOption.radar.length > 0) {
        currentOption.radar.forEach(radar => {
          // 轴线样式
          radar.axisLine = radar.axisLine || {};
          radar.axisLine.lineStyle = {
            color: 'rgba(0, 208, 255, 0.5)',
            width: 1,
            shadowColor: 'rgba(0, 208, 255, 0.3)',
            shadowBlur: 5
          };
          
          // 分割线样式
          radar.splitLine = radar.splitLine || {};
          radar.splitLine.lineStyle = {
            color: 'rgba(157, 0, 255, 0.2)',
            width: 1
          };
          
          // 区域样式
          radar.splitArea = radar.splitArea || {};
          radar.splitArea.show = true;
          radar.splitArea.areaStyle = {
            color: ['rgba(10, 18, 50, 0.3)', 'rgba(20, 32, 71, 0.3)']
          };
          
          // 名称样式
          radar.name = radar.name || {};
          radar.name.textStyle = {
            color: '#8ebbff',
            fontSize: 12,
            textShadow: '0 0 5px rgba(0, 208, 255, 0.5)'
          };
        });
      }
      
      // 增强雷达图系列
      if (currentOption.series && currentOption.series.length > 0) {
        currentOption.series.forEach(series => {
          if (series.type === 'radar') {
            // 区域样式
            series.areaStyle = series.areaStyle || {};
            series.areaStyle.opacity = 0.4;
            series.areaStyle.shadowColor = 'rgba(0, 208, 255, 0.3)';
            series.areaStyle.shadowBlur = 15;
            
            // 线条样式
            series.lineStyle = series.lineStyle || {};
            series.lineStyle.width = 2;
            series.lineStyle.shadowColor = 'rgba(0, 208, 255, 0.8)';
            series.lineStyle.shadowBlur = 10;
            
            // 数据点样式
            series.symbolSize = 6;
            series.itemStyle = series.itemStyle || {};
            series.itemStyle.borderColor = '#ffffff';
            series.itemStyle.borderWidth = 2;
            series.itemStyle.shadowColor = 'rgba(0, 208, 255, 0.8)';
            series.itemStyle.shadowBlur = 10;
          }
        });
      }
      
      // 应用增强选项
      window.charts[chartId].setOption(currentOption);
      
      // 添加外发光效果
      addRadarGlowEffect(chartElement);
    }
  });
}

// 添加雷达图外发光效果
function addRadarGlowEffect(chartElement) {
  // 创建外发光元素
  const glowElement = document.createElement('div');
  glowElement.className = 'radar-glow-effect';
  glowElement.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background: radial-gradient(circle, 
      rgba(0, 208, 255, 0.1) 0%, 
      transparent 70%);
    filter: blur(15px);
    opacity: 0.7;
    pointer-events: none;
    z-index: 0;
    animation: radar-pulse 3s infinite ease-in-out;
  `;
  
  // 将图表容器设置为相对定位
  chartElement.parentElement.style.position = 'relative';
  
  // 添加到容器
  chartElement.parentElement.appendChild(glowElement);
  
  // 添加动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes radar-pulse {
      0%, 100% { 
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(0.9);
      }
      50% { 
        opacity: 0.7;
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
  `;
  document.head.appendChild(style);
}

// 添加动态数据点效果
function addDynamicDataPoints() {
  // 获取线图
  const lineCharts = ['emotion-chart', 'speech-chart'];
  
  lineCharts.forEach(chartId => {
    const chartElement = document.getElementById(chartId);
    if (chartElement && window.charts[chartId]) {
      // 获取当前配置
      const currentOption = window.charts[chartId].getOption();
      
      // 增强线条上的数据点
      if (currentOption.series && currentOption.series.length > 0) {
        currentOption.series.forEach((series, index) => {
          if (series.type === 'line') {
            // 确保有数据点
            series.showSymbol = true;
            
            // 设置闪烁效果
            const symbolSize = series.symbolSize || 6;
            
            // 创建一个脉冲动画
            series.symbolSize = [symbolSize, symbolSize];
            series.symbolAnimation = true;
            
            // 为最后一个点添加特效
            if (series.data && series.data.length > 0) {
              const lastIndex = series.data.length - 1;
              
              // 创建特效散点图
              currentOption.series.push({
                type: 'effectScatter',
                coordinateSystem: 'cartesian2d',
                data: [series.data[lastIndex]],
                symbolSize: symbolSize * 1.5,
                showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'stroke',
                  scale: 3,
                  period: 3
                },
                hoverAnimation: true,
                itemStyle: {
                  color: series.itemStyle?.color || series.lineStyle?.color || '#00d0ff',
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 208, 255, 0.8)'
                },
                zlevel: 1
              });
            }
          }
        });
      }
      
      // 应用增强选项
      window.charts[chartId].setOption(currentOption);
    }
  });
}

// 在文档加载完成后执行增强
document.addEventListener('DOMContentLoaded', function() {
  // 等待原始图表初始化
  setTimeout(enhanceCharts, 1000);
}); 