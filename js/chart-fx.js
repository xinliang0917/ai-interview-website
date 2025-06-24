/**
 * AI智能面试系统 - 高级图表视觉效果
 * 为图表增加更先进的动态特效
 */

// 图表特效增强控制器
class ChartFX {
  constructor() {
    // 配置
    this.config = {
      // 动画时长(ms)
      animationDuration: 1500,
      // 动画延迟(ms)
      animationDelay: 200,
      // 鼠标互动灵敏度
      interactionSensitivity: 0.8
    };
    
    // 状态
    this.initialized = false;
    this.charts = {};
    this.canvasOverlays = {};
  }
  
  // 初始化
  init() {
    if (this.initialized) return;
    
    console.log('🚀 初始化高级图表视觉效果...');
    
    // 等待图表实例加载完成
    if (typeof window.charts === 'undefined') {
      console.log('等待基础图表加载...');
      setTimeout(() => this.init(), 500);
      return;
    }
    
    this.charts = window.charts;
    
    // 应用高级视觉效果
    this.applyAdvancedThemes();
    this.enhanceChartAnimations();
    this.createParticleEffects();
    this.setupMouseInteractions();
    
    // 添加窗口大小改变事件监听
    window.addEventListener('resize', this.handleResize.bind(this));
    
    this.initialized = true;
    console.log('✨ 高级图表视觉效果初始化完成');
  }
  
  // 应用高级主题
  applyAdvancedThemes() {
    // 高级主题配置
    const advancedTheme = {
      // 全局色彩
      color: [
        'rgba(0, 208, 255, 0.9)',
        'rgba(157, 0, 255, 0.9)',
        'rgba(16, 185, 129, 0.9)',
        'rgba(245, 158, 11, 0.9)',
        'rgba(59, 130, 246, 0.9)',
        'rgba(217, 70, 239, 0.9)'
      ],
      
      // 全局动画配置
      animation: {
        duration: this.config.animationDuration,
        easing: 'cubicOut',
        delay: index => index * this.config.animationDelay
      },
      
      // 背景 - 透明以使用CSS控制
      backgroundColor: 'transparent',
      
      // 全局文字样式
      textStyle: {
        fontFamily: 'var(--font-family)',
        color: 'rgba(210, 226, 255, 0.9)',
        fontWeight: 500,
        textShadow: '0 0 5px rgba(0, 208, 255, 0.5)'
      },
      
      // 轴线样式
      axisLine: {
        lineStyle: {
          color: 'rgba(203, 213, 225, 0.2)',
          width: 1,
          shadowColor: 'rgba(0, 208, 255, 0.1)',
          shadowBlur: 3
        }
      },
      
      // 分隔线样式
      splitLine: {
        lineStyle: {
          color: 'rgba(203, 213, 225, 0.1)',
          width: 1,
          type: 'dashed'
        }
      },
      
      // 提示框配置
      tooltip: {
        backgroundColor: 'rgba(10, 18, 50, 0.8)',
        borderColor: 'rgba(0, 208, 255, 0.3)',
        borderWidth: 1,
        textStyle: {
          color: 'rgba(210, 226, 255, 0.9)',
          fontWeight: 500
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(0, 208, 255, 0.5)',
            width: 1.5,
            shadowColor: 'rgba(0, 208, 255, 0.3)',
            shadowBlur: 5
          },
          shadowStyle: {
            color: 'rgba(0, 208, 255, 0.05)',
            shadowColor: 'rgba(0, 208, 255, 0.2)',
            shadowBlur: 10
          }
        },
        extraCssText: 'backdrop-filter: blur(10px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);'
      }
    };
    
    // 应用高级主题到每个图表
    for (const chartName in this.charts) {
      if (this.charts[chartName] && typeof this.charts[chartName].setOption === 'function') {
        try {
          // 获取当前配置
          const currentOption = this.charts[chartName].getOption();
          
          // 应用高级主题
          this.charts[chartName].setOption({
            textStyle: advancedTheme.textStyle,
            animation: advancedTheme.animation,
            tooltip: advancedTheme.tooltip
          });
          
          // 根据图表类型应用特定增强
          this.enhanceByChartType(chartName, this.charts[chartName]);
          
          console.log(`图表增强: ${chartName}`);
        } catch (err) {
          console.warn(`无法增强图表 ${chartName}:`, err);
        }
      }
    }
  }
  
  // 根据图表类型应用特定增强
  enhanceByChartType(chartName, chart) {
    const option = chart.getOption();
    
    // 识别图表类型
    if (chartName.includes('radar') || (option.series && option.series.some(s => s.type === 'radar'))) {
      // 雷达图增强
      this.enhanceRadarChart(chart);
    } else if (option.xAxis && option.yAxis) {
      // 坐标轴图表增强(折线图等)
      this.enhanceAxisChart(chart);
    }
  }
  
  // 增强雷达图
  enhanceRadarChart(chart) {
    const option = chart.getOption();
    
    // 雷达图特效配置
    const enhancedOption = {
      radar: option.radar && option.radar.map(radar => ({
        ...radar,
        // 名称设置
        name: {
          textStyle: {
            color: 'rgba(210, 226, 255, 0.9)',
            fontWeight: 500,
            fontSize: 12,
            textShadow: '0 0 5px rgba(0, 208, 255, 0.5)',
            padding: [3, 5]
          }
        },
        // 雷达图轴线
        axisLine: {
          lineStyle: {
            color: 'rgba(0, 208, 255, 0.4)',
            shadowColor: 'rgba(0, 208, 255, 0.2)',
            shadowBlur: 5
          }
        },
        // 雷达图分割线
        splitLine: {
          lineStyle: {
            color: 'rgba(157, 0, 255, 0.2)',
            shadowColor: 'rgba(157, 0, 255, 0.1)',
            shadowBlur: 5
          }
        },
        // 雷达图区域
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(10, 18, 50, 0.3)', 'rgba(20, 32, 71, 0.3)']
          }
        }
      })),
      
      // 系列增强
      series: option.series && option.series.map(series => {
        if (series.type === 'radar') {
          // 雷达图系列增强
          return {
            ...series,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              ...series.lineStyle,
              width: 2.5,
              shadowColor: 'rgba(0, 208, 255, 0.5)',
              shadowBlur: 10
            },
            areaStyle: {
              ...series.areaStyle,
              opacity: 0.5,
              shadowColor: 'rgba(0, 208, 255, 0.2)',
              shadowBlur: 15
            },
            itemStyle: {
              ...series.itemStyle,
              borderColor: '#ffffff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 208, 255, 0.8)',
              shadowBlur: 10
            }
          };
        }
        return series;
      })
    };
    
    // 应用增强选项
    chart.setOption(enhancedOption);
  }
  
  // 增强坐标轴图表(折线图等)
  enhanceAxisChart(chart) {
    const option = chart.getOption();
    
    // 坐标轴图表特效配置
    const enhancedOption = {
      // X轴增强
      xAxis: option.xAxis && option.xAxis.map(axis => ({
        ...axis,
        // 轴线设置
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(0, 208, 255, 0.3)',
            width: 1,
            shadowColor: 'rgba(0, 208, 255, 0.2)',
            shadowBlur: 5
          }
        },
        // 刻度设置
        axisTick: {
          show: true,
          lineStyle: {
            color: 'rgba(0, 208, 255, 0.3)',
            width: 1
          }
        },
        // 标签设置
        axisLabel: {
          show: true,
          color: 'rgba(210, 226, 255, 0.7)',
          fontWeight: 500,
          fontSize: 11,
          textShadow: '0 0 3px rgba(0, 208, 255, 0.3)'
        },
        // 分割线设置
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(203, 213, 225, 0.1)',
            width: 1,
            type: 'dashed'
          }
        }
      })),
      
      // Y轴增强
      yAxis: option.yAxis && option.yAxis.map(axis => ({
        ...axis,
        // 轴线设置
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(0, 208, 255, 0.3)',
            width: 1,
            shadowColor: 'rgba(0, 208, 255, 0.2)',
            shadowBlur: 5
          }
        },
        // 刻度设置
        axisTick: {
          show: true,
          lineStyle: {
            color: 'rgba(0, 208, 255, 0.3)',
            width: 1
          }
        },
        // 标签设置
        axisLabel: {
          show: true,
          color: 'rgba(210, 226, 255, 0.7)',
          fontWeight: 500,
          fontSize: 11,
          textShadow: '0 0 3px rgba(0, 208, 255, 0.3)'
        },
        // 分割线设置
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(203, 213, 225, 0.1)',
            width: 1,
            type: 'dashed'
          }
        }
      })),
      
      // 网格设置
      grid: {
        show: false,
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      
      // 系列增强
      series: option.series && option.series.map(series => {
        if (series.type === 'line') {
          // 折线图系列增强
          return {
            ...series,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              ...series.lineStyle,
              width: 3,
              shadowColor: 'rgba(0, 208, 255, 0.5)',
              shadowBlur: 10
            },
            itemStyle: {
              ...series.itemStyle,
              borderColor: '#ffffff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 208, 255, 0.8)',
              shadowBlur: 10
            },
            // 区域样式(如果有)
            areaStyle: series.areaStyle ? {
              ...series.areaStyle,
              opacity: 0.3,
              shadowColor: 'rgba(0, 208, 255, 0.2)',
              shadowBlur: 15
            } : undefined
          };
        }
        return series;
      })
    };
    
    // 应用增强选项
    chart.setOption(enhancedOption);
  }
  
  // 增强图表动画
  enhanceChartAnimations() {
    for (const chartName in this.charts) {
      if (this.charts[chartName]) {
        const chart = this.charts[chartName];
        
        // 设置动画时长和缓动函数
        chart.setOption({
          animationDuration: this.config.animationDuration,
          animationEasing: 'elasticOut',
          animationDelay: index => index * this.config.animationDelay
        });
      }
    }
  }
  
  // 创建粒子特效
  createParticleEffects() {
    // 为每个图表容器添加Canvas叠加层
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
      const containerId = container.id;
      if (!containerId) return;
      
      // 创建Canvas元素
      const canvas = document.createElement('canvas');
      canvas.className = 'chart-fx-canvas';
      canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
      `;
      
      // 添加到容器
      container.style.position = 'relative';
      container.appendChild(canvas);
      
      // 初始化Canvas
      this.initCanvas(canvas, containerId);
    });
  }
  
  // 初始化Canvas
  initCanvas(canvas, containerId) {
    // 设置Canvas尺寸
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    
    // 存储Canvas上下文
    const ctx = canvas.getContext('2d');
    this.canvasOverlays[containerId] = {
      canvas,
      ctx,
      particles: this.createParticles(30, canvas.width, canvas.height),
      lastTime: 0
    };
    
    // 开始动画
    this.animateParticles(containerId);
  }
  
  // 创建粒子
  createParticles(count, width, height) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.3 + 0.2})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        blinkSpeed: Math.random() * 0.01 + 0.005,
        opacity: Math.random() * 0.5 + 0.3,
        blinkDirection: 1
      });
    }
    
    return particles;
  }
  
  // 动画粒子效果
  animateParticles(containerId) {
    const overlay = this.canvasOverlays[containerId];
    if (!overlay) return;
    
    const { canvas, ctx, particles } = overlay;
    
    // 动画帧函数
    const animate = (time) => {
      if (!this.canvasOverlays[containerId]) return;
      
      // 清除Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新和绘制每个粒子
      particles.forEach(particle => {
        // 更新位置
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 更新闪烁效果
        particle.opacity += particle.blinkSpeed * particle.blinkDirection;
        if (particle.opacity > 0.7) {
          particle.blinkDirection = -1;
        } else if (particle.opacity < 0.2) {
          particle.blinkDirection = 1;
        }
        
        // 边界检查
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
        
        // 绘制粒子
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/, `${particle.opacity})`);
        ctx.fill();
      });
      
      // 请求下一帧
      requestAnimationFrame(animate);
    };
    
    // 开始动画
    requestAnimationFrame(animate);
  }
  
  // 设置鼠标交互
  setupMouseInteractions() {
    // 为每个图表容器添加鼠标事件
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
      const containerId = container.id;
      if (!containerId) return;
      
      // 鼠标移动事件
      container.addEventListener('mousemove', e => {
        const overlay = this.canvasOverlays[containerId];
        if (!overlay) return;
        
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 在鼠标周围创建光晕效果
        this.createGlowEffect(containerId, x, y);
      });
      
      // 鼠标离开事件
      container.addEventListener('mouseleave', () => {
        const overlay = this.canvasOverlays[containerId];
        if (!overlay) return;
        
        // 清除效果
        overlay.ctx.clearRect(0, 0, overlay.canvas.width, overlay.canvas.height);
      });
    });
  }
  
  // 创建光晕效果
  createGlowEffect(containerId, x, y) {
    const overlay = this.canvasOverlays[containerId];
    if (!overlay) return;
    
    const { ctx } = overlay;
    
    // 绘制光晕
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
    gradient.addColorStop(0, 'rgba(0, 208, 255, 0.3)');
    gradient.addColorStop(0.5, 'rgba(0, 208, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 208, 255, 0)');
    
    ctx.beginPath();
    ctx.arc(x, y, 80, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
  
  // 处理窗口大小改变
  handleResize() {
    // 调整所有Canvas尺寸
    for (const containerId in this.canvasOverlays) {
      const overlay = this.canvasOverlays[containerId];
      const canvas = overlay.canvas;
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    
    // 调整所有图表尺寸
    for (const chartName in this.charts) {
      if (this.charts[chartName] && typeof this.charts[chartName].resize === 'function') {
        this.charts[chartName].resize();
      }
    }
  }
}

// 在文档加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 等待原始图表初始化完成
  setTimeout(() => {
    const chartFX = new ChartFX();
    chartFX.init();
    
    // 将实例暴露给全局，以便调试
    window.chartFX = chartFX;
  }, 1500);
}); 