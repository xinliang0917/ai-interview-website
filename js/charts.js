/**
 * AI智能面试系统 - 图表处理脚本
 * 基于ECharts实现超级科技感数据可视化
 */

// 全局图表对象
window.charts = {};

// 全局颜色变量
const CHART_COLORS = {
  // 主题色系
  primary: '#0052cc',
  primaryLight: '#4d94ff',
  accent: '#00d0ff',
  accentGlow: 'rgba(0, 208, 255, 0.5)',
  
  // 指标色系
  attention: {
    line: ['#3b82f6', '#2563eb'],
    area: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.05)']
  },
  nervousness: {
    line: ['#f59e0b', '#d97706'],
    area: ['rgba(245, 158, 11, 0.3)', 'rgba(245, 158, 11, 0.05)']
  },
  confidence: {
    line: ['#10b981', '#059669'],
    area: ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.05)']
  },
  emotions: {
    neutral: '#64748b',
    happy: '#22c55e', 
    sad: '#64748b',
    angry: '#ef4444',
    fearful: '#a855f7',
    disgusted: '#8b5cf6',
    surprised: '#eab308'
  },
  
  // 竞争力分析色系
  competitive: {
    candidate: '#00d0ff',
    candidateArea: 'rgba(0, 208, 255, 0.3)',
    average: '#ffb820',
    averageArea: 'rgba(255, 184, 32, 0.15)',
    ideal: '#9d00ff',
    idealArea: 'rgba(157, 0, 255, 0.15)'
  },
  
  // 背景色系
  bgDark: '#142047',
  bgDarker: '#0a1232',
  border: 'rgba(203, 213, 225, 0.15)',
  text: '#94a3b8',
  textLight: '#cbd5e1'
};

// 全局图表样式
const CHART_STYLES = {
  // 科技风格网格
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
    containLabel: true
  },
  
  // 坐标轴样式
  axisLine: {
    lineStyle: {
      color: 'rgba(203, 213, 225, 0.2)'
    }
  },
  
  // 分隔线样式
  splitLine: {
    show: true,
    lineStyle: {
      color: 'rgba(203, 213, 225, 0.1)',
      type: 'dashed'
    }
  },
  
  // 坐标轴文本
  axisLabel: {
    color: '#94a3b8',
    fontSize: 11
  },
  
  // 区域填充渐变
  areaGradient: (color1, color2) => {
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
          offset: 0, color: color1
      }, {
          offset: 1, color: color2
      }]
    };
  },
  
  // 线条渐变
  lineGradient: (color1, color2) => {
    return {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
          offset: 0, color: color1
      }, {
          offset: 1, color: color2
      }]
    };
  },
  
  // 图例样式
  legend: {
    textStyle: {
      color: '#94a3b8'
    },
    right: '5%',
    top: '2%',
    icon: 'roundRect'
  },
  
  // 提示框样式
  tooltip: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 0,
    textStyle: {
      color: '#fff'
    },
    axisPointer: {
      lineStyle: {
        color: 'rgba(59, 130, 246, 0.3)'
      }
    }
  }
};

// 初始化所有图表
function initCharts() {
  // 初始化情绪趋势图
  initEmotionChart();
  
  // 初始化语音分析图
  initSpeechChart();
  
  // 初始化雷达图
  initRadarChart();
  
  // 初始化竞争力分析雷达图
  initCompetitiveRadarChart();
  
  // 调整图表自适应
  window.addEventListener('resize', () => {
    Object.values(window.charts).forEach(chart => {
      if (chart && chart.resize) {
        chart.resize();
      }
    });
  });
  
  console.log('所有图表已初始化，采用科技风格');
}

// 初始化情绪趋势图
function initEmotionChart() {
  // 获取DOM容器
  const chartContainer = document.getElementById('emotion-chart');
  if (!chartContainer) return;
  
  // 初始化ECharts实例
  const chart = echarts.init(chartContainer);
  
  // 设置图表配置
  const option = {
    backgroundColor: 'transparent',
    title: {
      show: false
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        let result = `${Math.floor(params[0].data[0] / 60)}:${(params[0].data[0] % 60).toString().padStart(2, '0')}`;
        params.forEach(param => {
          result += `<br/>${param.marker} ${param.seriesName}: ${param.data[1].toFixed(0)}`;
        });
        return result;
      },
      ...CHART_STYLES.tooltip
    },
    legend: {
      data: ['注意力', '紧张程度', '自信心'],
      ...CHART_STYLES.legend
    },
    grid: CHART_STYLES.grid,
    xAxis: {
      type: 'value',
      name: '时间（秒）',
      nameTextStyle: {
        color: CHART_COLORS.text
      },
      splitLine: CHART_STYLES.splitLine,
      axisLine: CHART_STYLES.axisLine,
      axisTick: {
        show: false
      },
      axisLabel: {
        ...CHART_STYLES.axisLabel,
        formatter: function(value) {
          const minutes = Math.floor(value / 60);
          const seconds = value % 60;
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '指数',
      min: 0,
      max: 100,
      nameTextStyle: {
        color: CHART_COLORS.text
      },
      splitLine: CHART_STYLES.splitLine,
      axisLine: CHART_STYLES.axisLine,
      axisTick: {
        show: false
      },
      axisLabel: CHART_STYLES.axisLabel
    },
    series: [
      {
        name: '注意力',
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: 3,
          color: CHART_STYLES.lineGradient(
            CHART_COLORS.attention.line[0], 
            CHART_COLORS.attention.line[1]
          ),
          shadowColor: 'rgba(59, 130, 246, 0.3)',
          shadowBlur: 10
        },
        itemStyle: {
          color: CHART_COLORS.attention.line[0]
        },
        areaStyle: {
          color: CHART_STYLES.areaGradient(
            CHART_COLORS.attention.area[0],
            CHART_COLORS.attention.area[1]
          )
        },
        data: []
      },
      {
        name: '紧张程度',
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: 3,
          color: CHART_STYLES.lineGradient(
            CHART_COLORS.nervousness.line[0], 
            CHART_COLORS.nervousness.line[1]
          ),
          shadowColor: 'rgba(245, 158, 11, 0.3)',
          shadowBlur: 10
        },
        itemStyle: {
          color: CHART_COLORS.nervousness.line[0]
        },
        areaStyle: {
          color: CHART_STYLES.areaGradient(
            CHART_COLORS.nervousness.area[0],
            CHART_COLORS.nervousness.area[1]
          )
        },
        data: []
      },
      {
        name: '自信心',
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: 3,
          color: CHART_STYLES.lineGradient(
            CHART_COLORS.confidence.line[0], 
            CHART_COLORS.confidence.line[1]
          ),
          shadowColor: 'rgba(16, 185, 129, 0.3)',
          shadowBlur: 10
        },
        itemStyle: {
          color: CHART_COLORS.confidence.line[0]
        },
        areaStyle: {
          color: CHART_STYLES.areaGradient(
            CHART_COLORS.confidence.area[0],
            CHART_COLORS.confidence.area[1]
          )
        },
        data: []
      }
    ],
    // 科技感视觉元素
    graphic: [{
      type: 'group',
      bottom: 10,
      right: 10,
      children: [
        {
          type: 'text',
          z: 100,
          right: 0,
          bottom: 0,
          style: {
            text: 'AI智能面试',
            fontSize: 11,
            fontWeight: 'normal',
            fill: 'rgba(148, 163, 184, 0.3)',
            fontStyle: 'italic'
          }
        }
      ]
    }]
  };
  
  // 设置高亮区域样式
  option.series.forEach(series => {
    series.emphasis = {
      itemStyle: {
        borderWidth: 2,
        borderColor: '#fff',
        shadowBlur: 10,
        shadowColor: series.itemStyle.color
      },
      lineStyle: {
        width: 4
      }
    };
  });
  
  // 使用配置项显示图表
  chart.setOption(option);
  
  // 存储图表实例
  window.charts.emotion = chart;
}

// 更新注意力图表数据
function updateAttentionChart(value) {
  if (!window.charts.emotion) return;
  
  // 获取当前时间点（相对于面试开始的秒数）
  const now = Math.floor((new Date() - AppState.interviewStartTime) / 1000);
  
  // 获取当前数据
  const option = window.charts.emotion.getOption();
  const data = option.series[0].data;
  
  // 添加新数据点
  data.push([now, value]);
  
  // 限制数据点数量，保持图表性能
  if (data.length > 120) { // 保留两分钟数据
    data.shift();
  }
  
  // 更新图表
  window.charts.emotion.setOption({
    series: [{
      data: data
    }]
  });
}

// 更新紧张程度图表数据
function updateNervousnessChart(value) {
  if (!window.charts.emotion) return;
  
  // 获取当前时间点
  const now = Math.floor((new Date() - AppState.interviewStartTime) / 1000);
  
  // 获取当前数据
  const option = window.charts.emotion.getOption();
  const data = option.series[1].data;
  
  // 添加新数据点
  data.push([now, value]);
  
  // 限制数据点数量
  if (data.length > 120) {
    data.shift();
  }
  
  // 更新图表
  window.charts.emotion.setOption({
    series: [{}, {
      data: data
    }]
  });
}

// 更新自信心图表数据
function updateConfidenceChart(value) {
  if (!window.charts.emotion) return;
  
  // 获取当前时间点
  const now = Math.floor((new Date() - AppState.interviewStartTime) / 1000);
  
  // 获取当前数据
  const option = window.charts.emotion.getOption();
  const data = option.series[2].data;
  
  // 添加新数据点
  data.push([now, value]);
  
  // 限制数据点数量
  if (data.length > 120) {
    data.shift();
  }
  
  // 更新图表
  window.charts.emotion.setOption({
    series: [{}, {}, {
      data: data
    }]
  });
}

// 更新情绪图表数据
function updateEmotionChart(emotion) {
  // 这里可以实现情绪状态的可视化
  // 暂未实现，可以根据需要扩展
}

// 初始化语音分析图
function initSpeechChart() {
  // 获取DOM容器
  const chartContainer = document.getElementById('speech-chart');
  if (!chartContainer) return;
  
  // 初始化ECharts实例
  const chart = echarts.init(chartContainer);
  
  // 设置图表配置
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      ...CHART_STYLES.tooltip
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLine: CHART_STYLES.axisLine,
      axisLabel: {
        ...CHART_STYLES.axisLabel,
        formatter: function(value) {
          return value + 's';
        }
      },
      axisTick: {
        show: false
      },
      splitLine: CHART_STYLES.splitLine
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: CHART_STYLES.splitLine,
      axisLine: CHART_STYLES.axisLine,
      axisLabel: CHART_STYLES.axisLabel,
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '音量',
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: CHART_COLORS.accent},
            {offset: 1, color: 'rgba(0, 208, 255, 0.3)'}
          ]),
          borderRadius: [3, 3, 0, 0],
          shadowColor: CHART_COLORS.accentGlow,
          shadowBlur: 5
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#00d0ff'},
              {offset: 1, color: 'rgba(0, 208, 255, 0.5)'}
            ]),
            shadowBlur: 10,
            shadowColor: CHART_COLORS.accentGlow
          }
        },
        data: []
      }
    ],
    // 科技感视觉元素
    graphic: [
      {
        type: 'group',
        bottom: 0,
        right: 5,
        children: [
          {
            type: 'text',
            z: 100,
            style: {
              text: '语音波形分析',
              fontSize: 11,
              fontWeight: 'normal',
              fill: 'rgba(148, 163, 184, 0.3)',
              fontStyle: 'italic'
            }
          }
        ]
      }
    ]
  };
  
  // 应用配置
  chart.setOption(option);
  
  // 保存到全局对象
  window.charts.speech = chart;
  
  // 模拟数据
  simulateSpeechData();
}

// 模拟语音数据
function simulateSpeechData() {
  if (!AppState.isInterviewing || !window.charts.speech) return;
  
  // 创建模拟数据
  const categories = [];
  const data = [];
  
  for (let i = 0; i < 10; i++) {
    categories.push(i * 5);
    data.push(30 + Math.random() * 40);
  }
  
  // 更新图表
  window.charts.speech.setOption({
    xAxis: {
      data: categories
    },
    series: [{
      data: data
    }]
  });
  
  // 持续更新
  setTimeout(simulateSpeechData, 5000);
}

// 初始化雷达图
function initRadarChart() {
  // 获取DOM容器
  const chartContainer = document.getElementById('radar-chart');
  if (!chartContainer) return;
  
  // 初始化ECharts实例
  const chart = echarts.init(chartContainer);
  
  // 雷达图指标
  const indicators = [
    { name: '专业能力', max: 100 },
    { name: '沟通表达', max: 100 },
    { name: '逻辑思维', max: 100 },
    { name: '应变能力', max: 100 },
    { name: '团队协作', max: 100 },
    { name: '学习能力', max: 100 }
  ];
  
  // 模拟数据
  const data = [
    {
      value: [85, 92, 88, 79, 86, 90],
      name: '能力评估'
    }
  ];
  
  // 设置图表配置
  const option = {
    backgroundColor: 'transparent',
    color: [CHART_COLORS.accent],
    tooltip: {
      ...CHART_STYLES.tooltip,
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      borderWidth: 0,
      textStyle: {
        color: '#fff'
      },
      position: function(pos, params, dom, rect, size) {
        // 计算tooltip的位置，确保不会超出容器
        const containerWidth = size.viewSize[0];
        const containerHeight = size.viewSize[1];
        const tooltipWidth = dom.offsetWidth;
        const tooltipHeight = dom.offsetHeight;
        
        // 基本位置在鼠标右下方
        let x = pos[0] + 10;
        let y = pos[1] + 10;
        
        // 如果tooltip会超出右边界，则将其放在左侧
        if (x + tooltipWidth > containerWidth) {
          x = pos[0] - tooltipWidth - 10;
        }
        
        // 如果tooltip会超出下边界，则将其放在上方
        if (y + tooltipHeight > containerHeight) {
          y = pos[1] - tooltipHeight - 10;
        }
        
        // 确保不会超出左边界和上边界
        x = Math.max(0, x);
        y = Math.max(0, y);
        
        return [x, y];
      },
      formatter: function(params) {
        const indicators = option.radar.indicator;
        const values = params.value;
        let result = `<div style="font-weight:bold;margin-bottom:3px;color:${params.color};font-size:11px;">${params.seriesName}</div>`;
        
        result += '<table style="width:100%;border-spacing:1px;">';
        for (let i = 0; i < indicators.length; i++) {
          result += `
            <tr>
              <td style="padding:1px 4px 1px 0;text-align:right;color:rgba(255,255,255,0.7);font-size:10px;">${indicators[i].name}:</td>
              <td style="padding:1px 0;font-weight:bold;color:#fff;font-size:10px;">${values[i]}</td>
            </tr>
          `;
        }
        result += '</table>';
        
        return result;
      }
    },
    radar: {
      // 雷达图中心点
      center: ['50%', '50%'],
      // 雷达图半径
      radius: '70%',
      // 雷达图指示器
      indicator: indicators,
      // 雷达图形状
      shape: 'circle',
      // 分割线样式
      splitLine: {
        lineStyle: {
          color: [
            'rgba(203, 213, 225, 0.05)',
            'rgba(203, 213, 225, 0.1)',
            'rgba(203, 213, 225, 0.15)',
            'rgba(203, 213, 225, 0.2)',
            'rgba(203, 213, 225, 0.25)'
          ].reverse()
        }
      },
      // 轴线样式
      axisLine: {
        lineStyle: {
          color: 'rgba(203, 213, 225, 0.15)'
        }
      },
      // 名称样式
      name: {
        textStyle: {
          color: CHART_COLORS.text,
          fontSize: 11,
          padding: [3, 5]
        }
      },
      // 刻度样式
      splitArea: {
        show: true,
        areaStyle: {
          color: [
            'rgba(0, 208, 255, 0.01)',
            'rgba(0, 208, 255, 0.03)',
            'rgba(0, 208, 255, 0.05)',
            'rgba(0, 208, 255, 0.07)',
            'rgba(0, 208, 255, 0.09)'
          ].reverse()
        }
      }
    },
    series: [{
      type: 'radar',
      name: '能力评估',
      data: data,
      symbol: 'circle', // 拐点形状
      symbolSize: 6,  // 拐点大小
      // 线条样式
      lineStyle: {
        width: 2,
        color: CHART_COLORS.accent,
        shadowColor: CHART_COLORS.accentGlow,
        shadowBlur: 10
      },
      // 填充区域样式
      areaStyle: {
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [{
            offset: 0, 
            color: 'rgba(0, 208, 255, 0.5)' 
          }, {
            offset: 1, 
            color: 'rgba(0, 208, 255, 0.1)'
          }]
        },
        opacity: 0.8
      },
      // 拐点样式
      itemStyle: {
        color: '#fff',
        borderColor: CHART_COLORS.accent,
        borderWidth: 2,
        shadowColor: CHART_COLORS.accentGlow,
        shadowBlur: 5
      }
    }],
    // 科技感视觉元素
    graphic: [
      {
        type: 'circle',
        z: -1,
        shape: {
          r: chartContainer.clientWidth * 0.2
        },
        style: {
          fill: 'rgba(0, 208, 255, 0.05)'
        },
        left: 'center',
        top: 'center',
        animation: 'breathe',
        keyframeAnimation: [{
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0,
              style: {
                opacity: 0.3,
                r: chartContainer.clientWidth * 0.2
              }
            },
            {
              percent: 50,
              style: {
                opacity: 0.5,
                r: chartContainer.clientWidth * 0.25
              }
            },
            {
              percent: 100,
              style: {
                opacity: 0.3,
                r: chartContainer.clientWidth * 0.2
              }
            }
          ]
        }]
      }
    ]
  };
  
  // 使用配置项显示图表
  chart.setOption(option);
  
  // 存储图表实例
  window.charts.radar = chart;
}

// 更新雷达图数据
function updateRadarChart(data) {
  if (!window.charts.radar) return;
  
  // 如果没有提供数据，使用模拟数据
  if (!data) {
    data = {
      value: [85, 92, 88, 79, 86, 90],
      name: '能力评估'
    };
  }
  
  // 更新图表数据
  window.charts.radar.setOption({
    series: [{
      data: [data]
    }]
  });
}

// 初始化竞争力分析雷达图
function initCompetitiveRadarChart() {
  // 获取DOM容器
  const chartContainer = document.getElementById('competitive-radar-chart');
  if (!chartContainer) return;
  
  // 初始化ECharts实例
  const chart = echarts.init(chartContainer);
  
  // 雷达图指标
  const indicators = [
    { name: '专业知识', max: 100 },
    { name: '技能匹配', max: 100 },
    { name: '语言表达', max: 100 },
    { name: '逻辑思考', max: 100 },
    { name: '创新思维', max: 100 },
    { name: '应变抗压', max: 100 }
  ];
  
  // 模拟数据
  const data = [
    {
      value: [85, 78, 92, 88, 82, 79],
      name: '候选人'
    },
    {
      value: [70, 65, 75, 72, 68, 70],
      name: '行业平均'
    },
    {
      value: [90, 85, 88, 90, 92, 85],
      name: '理想标准'
    }
  ];
  
  // 设置图表配置
  const option = {
    backgroundColor: 'transparent',
    color: [
      CHART_COLORS.competitive.candidate,
      CHART_COLORS.competitive.average,
      CHART_COLORS.competitive.ideal
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
        fontSize: 11 // 减小字体大小
      },
      position: function(pos, params, dom, rect, size) {
        // 计算tooltip的位置，确保不会超出容器
        const containerWidth = size.viewSize[0];
        const containerHeight = size.viewSize[1];
        const tooltipWidth = dom.offsetWidth;
        const tooltipHeight = dom.offsetHeight;
        
        // 基本位置在鼠标右下方
        let x = pos[0] + 10;
        let y = pos[1] + 10;
        
        // 如果tooltip会超出右边界，则将其放在左侧
        if (x + tooltipWidth > containerWidth) {
          x = pos[0] - tooltipWidth - 10;
        }
        
        // 如果tooltip会超出下边界，则将其放在上方
        if (y + tooltipHeight > containerHeight) {
          y = pos[1] - tooltipHeight - 10;
        }
        
        // 确保不会超出左边界和上边界
        x = Math.max(0, x);
        y = Math.max(0, y);
        
        return [x, y];
      },
      formatter: function(params) {
        const indicators = option.radar.indicator;
        const values = params.value;
        let result = `<div style="font-weight:bold;margin-bottom:3px;color:${params.color};font-size:11px;">${params.seriesName}</div>`;
        
        result += '<table style="width:100%;border-spacing:1px;">';
        for (let i = 0; i < indicators.length; i++) {
          result += `
            <tr>
              <td style="padding:1px 4px 1px 0;text-align:right;color:rgba(255,255,255,0.7);font-size:10px;">${indicators[i].name}:</td>
              <td style="padding:1px 0;font-weight:bold;color:#fff;font-size:10px;">${values[i]}</td>
            </tr>
          `;
        }
        result += '</table>';
        
        return result;
      }
    },
    legend: {
      show: false
    },
    radar: {
      // 雷达图中心点
      center: ['50%', '50%'],
      // 雷达图半径，改成内外半径，创建圆环形状
      radius: ['25%', '70%'],
      // 雷达图指示器
      indicator: indicators,
      // 雷达图形状
      shape: 'polygon',
      // 分割线样式
      splitLine: {
        lineStyle: {
          color: [
            'rgba(203, 213, 225, 0.05)',
            'rgba(203, 213, 225, 0.1)',
            'rgba(203, 213, 225, 0.15)',
            'rgba(203, 213, 225, 0.2)',
            'rgba(203, 213, 225, 0.25)'
          ].reverse()
        }
      },
      // 轴线样式
      axisLine: {
        lineStyle: {
          color: 'rgba(203, 213, 225, 0.15)'
        }
      },
      // 名称样式
      name: {
        textStyle: {
          color: CHART_COLORS.text,
          fontSize: 11,
          padding: [3, 5],
          backgroundColor: 'rgba(10, 18, 50, 0.6)',
          borderRadius: 3
        }
      },
      // 刻度样式
      splitArea: {
        show: true,
        areaStyle: {
          color: [
            'rgba(0, 208, 255, 0.01)',
            'rgba(0, 208, 255, 0.02)',
            'rgba(0, 208, 255, 0.03)',
            'rgba(0, 208, 255, 0.04)',
            'rgba(0, 208, 255, 0.05)'
          ].reverse()
        }
      }
    },
    series: [
      {
        type: 'radar',
        name: '候选人',
        data: [data[0]],
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          color: CHART_COLORS.competitive.candidate,
          shadowColor: CHART_COLORS.competitive.candidate,
          shadowBlur: 10
        },
        areaStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [{
              offset: 0, 
              color: 'rgba(0, 208, 255, 0.4)' 
            }, {
              offset: 1, 
              color: 'rgba(0, 208, 255, 0.1)'
            }]
          },
          opacity: 0.8
        },
        itemStyle: {
          color: '#fff',
          borderColor: CHART_COLORS.competitive.candidate,
          borderWidth: 2,
          shadowColor: CHART_COLORS.competitive.candidate,
          shadowBlur: 5
        }
      },
      {
        type: 'radar',
        name: '行业平均',
        data: [data[1]],
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          width: 1,
          color: CHART_COLORS.competitive.average,
          type: 'dashed'
        },
        areaStyle: {
          color: CHART_COLORS.competitive.averageArea,
          opacity: 0.5
        },
        itemStyle: {
          color: CHART_COLORS.competitive.average
        }
      },
      {
        type: 'radar',
        name: '理想标准',
        data: [data[2]],
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          width: 1,
          color: CHART_COLORS.competitive.ideal,
          type: 'dotted'
        },
        areaStyle: {
          color: CHART_COLORS.competitive.idealArea,
          opacity: 0.3
        },
        itemStyle: {
          color: CHART_COLORS.competitive.ideal
        }
      }
    ],
    // 科技感视觉元素 + 中心总分显示
    graphic: [
      // 分数文本
      {
        type: 'text',
        z: 101,
        style: {
          text: '86',
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          fill: '#fff',
          textAlign: 'center',
          textVerticalAlign: 'middle',
          textShadow: '0 0 10px rgba(0, 208, 255, 0.8)'
        },
        left: 'center',
        top: 'center'
      },
      // 脉动效果背景
      {
        type: 'circle',
        z: 99,
        shape: {
          r: chartContainer.clientWidth * 0.2
        },
        style: {
          fill: 'rgba(0, 208, 255, 0.05)'
        },
        left: 'center',
        top: 'center',
        keyframeAnimation: [{
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0,
              style: {
                opacity: 0.3,
                r: chartContainer.clientWidth * 0.12
              }
            },
            {
              percent: 50,
              style: {
                opacity: 0.5,
                r: chartContainer.clientWidth * 0.15
              }
            },
            {
              percent: 100,
              style: {
                opacity: 0.3,
                r: chartContainer.clientWidth * 0.12
              }
            }
          ]
        }]
      }
    ]
  };
  
  // 使用配置项显示图表
  chart.setOption(option);
  
  // 存储图表实例
  window.charts.competitiveRadar = chart;
  
  // 添加自定义标签DOM元素
  addCustomLabels(chartContainer, chart, data);
  
  // 添加动画效果
  addRadarPulseEffect(chart);
}

// 添加自定义标签DOM元素
function addCustomLabels(container, chart, data) {
  // 创建标签样式
  const style = document.createElement('style');
  style.textContent = `
    .radar-custom-label {
      position: absolute;
      padding: 3px 6px;
      background-color: rgba(10, 18, 50, 0.8);
      border-radius: 4px;
      font-size: 11px;
      font-family: sans-serif;
      text-align: center;
      cursor: pointer;
      z-index: 100;
      transition: transform 0.2s, box-shadow 0.2s;
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid rgba(0, 208, 255, 0.3);
      box-shadow: 0 0 5px rgba(0, 208, 255, 0.2);
    }
    .radar-custom-label:hover {
      transform: scale(1.1);
      box-shadow: 0 0 12px rgba(0, 208, 255, 0.4);
      z-index: 101;
    }
  `;
  document.head.appendChild(style);
  
  // 候选人标签
  const candidateLabel = document.createElement('div');
  candidateLabel.className = 'radar-custom-label';
  candidateLabel.style.color = CHART_COLORS.competitive.candidate;
  candidateLabel.style.top = '15%'; // 将标签移到雷达图上方
  candidateLabel.style.left = '5%'; // 将标签移到左侧边缘
  candidateLabel.style.fontWeight = 'bold';
  candidateLabel.textContent = '候选人';
  container.appendChild(candidateLabel);
  
  // 行业平均标签
  const averageLabel = document.createElement('div');
  averageLabel.className = 'radar-custom-label';
  averageLabel.style.color = CHART_COLORS.competitive.average;
  averageLabel.style.top = '15%'; // 将标签移到雷达图上方
  averageLabel.style.right = '5%'; // 将标签移到右侧边缘
  averageLabel.style.left = 'auto'; // 清除left属性，使right生效
  averageLabel.style.fontWeight = 'bold';
  averageLabel.textContent = '行业平均';
  container.appendChild(averageLabel);
  
  // 理想标准标签
  const idealLabel = document.createElement('div');
  idealLabel.className = 'radar-custom-label';
  idealLabel.style.color = CHART_COLORS.competitive.ideal;
  idealLabel.style.bottom = '15%'; // 将标签移到雷达图下方
  idealLabel.style.right = '5%'; // 将标签移到右侧边缘
  idealLabel.style.top = 'auto'; // 清除top属性，使bottom生效
  idealLabel.style.left = 'auto'; // 清除left属性，使right生效
  idealLabel.style.fontWeight = 'bold';
  idealLabel.textContent = '理想标准';
  container.appendChild(idealLabel);
  
  // 添加事件监听器 - 删除旧的事件监听器，重新实现
  container.querySelectorAll('.radar-custom-label').forEach(label => {
    label.removeEventListener('mouseover', () => {});
    label.removeEventListener('mouseout', () => {});
  });
  
  candidateLabel.addEventListener('mouseover', function() {
    setTimeout(() => {
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0
      });
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 0
      });
    }, 0);
  });
  
  candidateLabel.addEventListener('mouseout', function() {
    setTimeout(() => {
      chart.dispatchAction({
        type: 'hideTip'
      });
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      });
    }, 0);
  });
  
  averageLabel.addEventListener('mouseover', function() {
    setTimeout(() => {
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 1
      });
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 1,
        dataIndex: 0
      });
    }, 0);
  });
  
  averageLabel.addEventListener('mouseout', function() {
    setTimeout(() => {
      chart.dispatchAction({
        type: 'hideTip'
      });
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 1
      });
    }, 0);
  });
  
  idealLabel.addEventListener('mouseover', function() {
    setTimeout(() => {
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 2
      });
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 2,
        dataIndex: 0
      });
    }, 0);
  });
  
  idealLabel.addEventListener('mouseout', function() {
    setTimeout(() => {
      chart.dispatchAction({
        type: 'hideTip'
      });
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 2
      });
    }, 0);
  });
  
  // 确保容器是相对定位
  container.style.position = 'relative';
}

// 为雷达图添加脉冲动画效果
function addRadarPulseEffect(chart) {
  let angle = 0;
  
  setInterval(() => {
    // 创建旋转效果
    angle = (angle + 1) % 360;
    
    // 更新图表
    chart.setOption({
      radar: {
        axisLine: {
          lineStyle: {
            color: 'rgba(203, 213, 225, 0.15)',
            shadowColor: 'rgba(0, 208, 255, 0.5)',
            shadowBlur: Math.abs(Math.sin(angle / 180 * Math.PI)) * 10
          }
        }
      }
    });
  }, 100);
}

// 更新竞争力分析雷达图数据
function updateCompetitiveRadarChart(candidateData) {
  if (!window.charts.competitiveRadar) return;
  
  // 如果没有提供数据，使用默认数据
  if (!candidateData) {
    candidateData = {
      value: [85, 78, 92, 88, 82, 79],
      name: '候选人'
    };
  }
  
  // 更新图表数据
  window.charts.competitiveRadar.setOption({
    series: [{
      data: [candidateData]
    }]
  });
}

// 窗口加载完成初始化
window.addEventListener('load', () => {
  // 如果页面加载时已经在面试中，初始化图表
  if (AppState && AppState.isInterviewing) {
    initCharts();
  }
}); 