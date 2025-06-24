/**
 * AI智能面试系统 - 主应用脚本
 * 负责页面交互、视图切换和模态框控制
 */

// 应用程序状态管理
const AppState = {
  currentView: 'dashboard', // 当前视图: dashboard, history, settings
  isInterviewing: false,    // 是否正在面试
  interviewStartTime: null, // 面试开始时间
  interviewData: null,
  settings: {
    showLandmarks: false,
    analysisLevel: 7,
    enableEmotionDetection: true,
    enableSpeechAnalysis: true,
    enableGestureAnalysis: true
  }
};

// DOM元素缓存
const DOM = {
  // 导航元素
  navItems: document.querySelectorAll('.navigation li'),
  views: document.querySelectorAll('.dashboard, .history, .settings'),
  
  // 面试控制
  startInterviewBtn: document.querySelector('.start-interview'),
  endInterviewBtn: document.querySelector('.end-interview'),
  
  // 模态框
  modal: document.getElementById('start-interview-modal'),
  closeModalBtn: document.querySelector('.close-modal'),
  cancelBtn: document.querySelector('.cancel-btn'),
  confirmBtn: document.querySelector('.confirm-btn'),
  
  // 表单元素
  interviewNameInput: document.getElementById('interview-name'),
  positionNameInput: document.getElementById('position-name'),
  interviewModeSelect: document.getElementById('interview-mode'),
  
  // 视频元素
  webcamVideo: document.getElementById('webcam'),
  
  // 实时指标元素
  attentionScore: document.getElementById('attention-score'),
  nervousnessScore: document.getElementById('nervousness-score'),
  confidenceScore: document.getElementById('confidence-score'),
  emotionLabel: document.getElementById('emotion'),
  
  // 设置元素
  cameraSelect: document.getElementById('camera-select'),
  microphoneSelect: document.getElementById('microphone-select')
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// 初始化应用程序
function initApp() {
  // 绑定导航事件
  bindNavigation();
  
  // 绑定按钮事件
  bindButtonEvents();
  
  // 绑定模态框事件
  bindModalEvents();
  
  // 初始化通知系统
  initNotifications();
  
  // 添加科技感动画效果
  addTechEffects();
  
  // 显示欢迎通知
  showNotification('AI智能面试系统已就绪', 'info');
  
  console.log('应用程序初始化完成');
}

// 绑定导航事件
function bindNavigation() {
  const navLinks = document.querySelectorAll('.navigation a');
  const views = document.querySelectorAll('.main-content > div');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      
      // 更新导航激活状态
      navLinks.forEach(item => {
        item.parentElement.classList.remove('active');
      });
      link.parentElement.classList.add('active');
      
      // 更新视图显示
      views.forEach(view => {
        view.classList.remove('active');
      });
      document.getElementById(targetId).classList.add('active');
      
      // 添加过渡动画
      document.getElementById(targetId).style.animation = 'none';
      setTimeout(() => {
        document.getElementById(targetId).style.animation = 'fade-in 0.3s ease-out';
      }, 10);
    });
  });
}
  
// 绑定按钮事件
function bindButtonEvents() {
  // 开始面试按钮
  const startButton = document.querySelector('.start-interview');
  if (startButton) {
    startButton.addEventListener('click', () => {
      showStartInterviewModal();
    });
  }
  
  // 结束面试按钮
  const endButton = document.querySelector('.end-interview');
  if (endButton) {
    endButton.addEventListener('click', () => {
      endInterview();
    });
  }
  
  // 设置面板中的复选框
  const checkboxes = document.querySelectorAll('.setting-item.checkbox input');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const id = e.target.id;
      const isChecked = e.target.checked;
      
      switch (id) {
        case 'emotion-detection':
          AppState.settings.enableEmotionDetection = isChecked;
          break;
        case 'speech-analysis':
          AppState.settings.enableSpeechAnalysis = isChecked;
          break;
        case 'gesture-analysis':
          AppState.settings.enableGestureAnalysis = isChecked;
          break;
      }
      
      showNotification(`${e.target.nextElementSibling.textContent}已${isChecked ? '启用' : '禁用'}`, 'info');
    });
  });
  
  // 分析敏感度滑块
  const sensitivitySlider = document.getElementById('analysis-sensitivity');
  if (sensitivitySlider) {
    sensitivitySlider.addEventListener('change', (e) => {
      AppState.settings.analysisLevel = parseInt(e.target.value);
      showNotification(`分析敏感度已设置为 ${e.target.value}`, 'info');
    });
  }
}

// 绑定模态框事件
function bindModalEvents() {
  const modal = document.getElementById('start-interview-modal');
  const closeBtn = modal.querySelector('.close-modal');
  const cancelBtn = modal.querySelector('.cancel-btn');
  const confirmBtn = modal.querySelector('.confirm-btn');
  
  // 关闭按钮
  closeBtn.addEventListener('click', () => {
    hideModal(modal);
  });
  
  // 取消按钮
  cancelBtn.addEventListener('click', () => {
    hideModal(modal);
  });
  
  // 确认按钮
  confirmBtn.addEventListener('click', () => {
    const interviewName = document.getElementById('interview-name').value;
    const positionName = document.getElementById('position-name').value;
    const interviewMode = document.getElementById('interview-mode').value;
    
    if (!interviewName || !positionName) {
      showNotification('请填写完整信息', 'warning');
      return;
    }
    
    hideModal(modal);
    startInterview(interviewName, positionName, interviewMode);
  });
}

// 显示开始面试模态框
function showStartInterviewModal() {
  const modal = document.getElementById('start-interview-modal');
  modal.classList.add('active');
  
  // 重置表单
  document.getElementById('interview-name').value = '';
  document.getElementById('position-name').value = '';
  document.getElementById('interview-mode').value = 'technical';
  
  // 聚焦第一个输入框
  setTimeout(() => {
    document.getElementById('interview-name').focus();
  }, 300);
}

// 隐藏模态框
function hideModal(modal) {
  modal.classList.remove('active');
}

// 开始面试
async function startInterview(interviewName, positionName, interviewMode) {
  try {
    // 更新UI状态
    document.querySelector('.start-interview').disabled = true;
    document.querySelector('.end-interview').disabled = false;
    
    // 初始化面试数据
    AppState.isInterviewing = true;
    AppState.interviewStartTime = new Date();
    AppState.interviewData = {
      name: interviewName,
      position: positionName,
      mode: interviewMode,
      metrics: {
        emotions: [],
        attention: [],
        nervousness: [],
        confidence: []
      }
    };
    
    // 显示通知
    showNotification('面试已开始', 'success');
    
    // 初始化摄像头
    await initCamera();
    
    // 初始化图表
    initCharts();
    
    // 初始化人脸检测
    await initFaceDetection();
    
    // 开始数据收集
    startDataCollection();
    
    // 添加科技感动画效果
    addInterviewEffects();
    
  } catch (error) {
    console.error('开始面试失败:', error);
    showNotification('开始面试失败: ' + error.message, 'error');
    
    // 恢复UI状态
    document.querySelector('.start-interview').disabled = false;
    document.querySelector('.end-interview').disabled = true;
    AppState.isInterviewing = false;
  }
}

// 结束面试
function endInterview() {
  // 更新UI状态
  document.querySelector('.start-interview').disabled = false;
  document.querySelector('.end-interview').disabled = true;
  
  // 停止数据收集
  stopDataCollection();
  
  // 停止人脸检测
  if (window.faceDetection) {
    stopFaceDetection();
  }
  
  // 关闭摄像头
  stopCamera();
  
  // 生成面试报告
  generateInterviewReport();
  
  // 更新状态
  AppState.isInterviewing = false;
  
  // 显示通知
  showNotification('面试已结束，报告已生成', 'success');
  
  // 移除面试特效
  removeInterviewEffects();
}

// 初始化摄像头
async function initCamera() {
  try {
    const videoElement = document.getElementById('webcam');
    
    if (!videoElement) {
      throw new Error('未找到视频元素');
    }
    
    // 获取摄像头权限
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      },
      audio: AppState.settings.enableSpeechAnalysis
    });
    
    // 设置视频源
    videoElement.srcObject = stream;
    
    // 等待视频加载
    await new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        resolve();
      };
    });
    
    // 播放视频
    await videoElement.play();
    
    console.log('摄像头初始化成功');
    return true;
  } catch (error) {
    console.error('摄像头初始化失败:', error);
    showNotification('无法访问摄像头: ' + error.message, 'error');
    throw error;
  }
}

// 停止摄像头
function stopCamera() {
  const videoElement = document.getElementById('webcam');
  
  if (videoElement && videoElement.srcObject) {
    const tracks = videoElement.srcObject.getTracks();
    
    tracks.forEach(track => {
      track.stop();
    });
    
    videoElement.srcObject = null;
  }
}

// 开始数据收集
function startDataCollection() {
  // 定期收集数据
  AppState.dataCollectionInterval = setInterval(() => {
    collectMetricsData();
  }, 1000);
}

// 停止数据收集
function stopDataCollection() {
  if (AppState.dataCollectionInterval) {
    clearInterval(AppState.dataCollectionInterval);
    AppState.dataCollectionInterval = null;
  }
}

// 收集指标数据
function collectMetricsData() {
  if (!AppState.isInterviewing) return;
  
  // 获取当前指标值
  const attentionScore = parseInt(document.getElementById('attention-score').textContent);
  const nervousnessScore = parseInt(document.getElementById('nervousness-score').textContent);
  const confidenceScore = parseInt(document.getElementById('confidence-score').textContent);
  
  // 记录数据
  AppState.interviewData.metrics.attention.push({
    time: new Date() - AppState.interviewStartTime,
    value: attentionScore
  });
  
  AppState.interviewData.metrics.nervousness.push({
    time: new Date() - AppState.interviewStartTime,
    value: nervousnessScore
  });
  
  AppState.interviewData.metrics.confidence.push({
    time: new Date() - AppState.interviewStartTime,
    value: confidenceScore
  });
  
  // 更新图表
  updateAttentionChart(attentionScore);
  updateNervousnessChart(nervousnessScore);
  updateConfidenceChart(confidenceScore);
  
  // 动态更新竞争力分析
  updateCompetitiveAnalysis();
}

// 更新竞争力分析
function updateCompetitiveAnalysis() {
  // 获取最新的指标数据
  const attentionScores = AppState.interviewData.metrics.attention;
  const nervousnessScores = AppState.interviewData.metrics.nervousness;
  const confidenceScores = AppState.interviewData.metrics.confidence;
  const emotionData = AppState.interviewData.metrics.emotions;
  
  if (attentionScores.length === 0) return;
  
  // 计算平均值
  const avgAttention = calculateAverage(attentionScores.map(item => item.value));
  const avgNervousness = calculateAverage(nervousnessScores.map(item => item.value));
  const avgConfidence = calculateAverage(confidenceScores.map(item => item.value));
  
  // 根据数据动态生成竞争力评分
  const professionalKnowledge = Math.min(100, Math.max(60, avgAttention * 0.7 + avgConfidence * 0.3 + Math.random() * 5));
  const skillMatch = Math.min(100, Math.max(60, avgAttention * 0.6 + avgConfidence * 0.4 - Math.random() * 10));
  const languageExpression = Math.min(100, Math.max(60, avgConfidence * 0.8 + (100 - avgNervousness) * 0.2 + Math.random() * 5));
  const logicalThinking = Math.min(100, Math.max(60, avgAttention * 0.8 + avgConfidence * 0.2 + Math.random() * 5));
  const innovativeThinking = Math.min(100, Math.max(60, avgConfidence * 0.6 + avgAttention * 0.4 + Math.random() * 10));
  const stressResistance = Math.min(100, Math.max(60, (100 - avgNervousness) * 0.8 + avgConfidence * 0.2 - Math.random() * 5));
  
  // 更新雷达图
  const candidateData = {
    value: [
      Math.round(professionalKnowledge), 
      Math.round(skillMatch),
      Math.round(languageExpression),
      Math.round(logicalThinking),
      Math.round(innovativeThinking),
      Math.round(stressResistance)
    ],
    name: '候选人'
  };
  
  // 更新图表
  updateCompetitiveRadarChart(candidateData);
  
  // 更新竞争力分析面板
  updateCompetitiveMetrics(candidateData.value);
}

// 更新竞争力指标显示
function updateCompetitiveMetrics(values) {
  // 更新专业知识
  document.querySelector('.metric-row:nth-child(1) .metric-item:nth-child(1) .metric-score').textContent = values[0];
  document.querySelector('.metric-row:nth-child(1) .metric-item:nth-child(1) .metric-fill').style.width = `${values[0]}%`;
  
  // 更新技能匹配
  document.querySelector('.metric-row:nth-child(1) .metric-item:nth-child(2) .metric-score').textContent = values[1];
  document.querySelector('.metric-row:nth-child(1) .metric-item:nth-child(2) .metric-fill').style.width = `${values[1]}%`;
  
  // 更新语言表达
  document.querySelector('.metric-row:nth-child(2) .metric-item:nth-child(1) .metric-score').textContent = values[2];
  document.querySelector('.metric-row:nth-child(2) .metric-item:nth-child(1) .metric-fill').style.width = `${values[2]}%`;
  
  // 更新逻辑思考
  document.querySelector('.metric-row:nth-child(2) .metric-item:nth-child(2) .metric-score').textContent = values[3];
  document.querySelector('.metric-row:nth-child(2) .metric-item:nth-child(2) .metric-fill').style.width = `${values[3]}%`;
  
  // 更新创新思维
  document.querySelector('.metric-row:nth-child(3) .metric-item:nth-child(1) .metric-score').textContent = values[4];
  document.querySelector('.metric-row:nth-child(3) .metric-item:nth-child(1) .metric-fill').style.width = `${values[4]}%`;
  
  // 更新应变抗压
  document.querySelector('.metric-row:nth-child(3) .metric-item:nth-child(2) .metric-score').textContent = values[5];
  document.querySelector('.metric-row:nth-child(3) .metric-item:nth-child(2) .metric-fill').style.width = `${values[5]}%`;
  
  // 更新总分
  const totalScore = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  document.querySelector('.score-ring .score-value').textContent = totalScore;
  document.querySelector('.score-ring').style.setProperty('--score', totalScore);
}

// 计算平均值
function calculateAverage(array) {
  if (array.length === 0) return 0;
  return array.reduce((sum, value) => sum + value, 0) / array.length;
}

// 生成面试报告
function generateInterviewReport() {
  // 这里可以实现面试报告的生成逻辑
  console.log('生成面试报告', AppState.interviewData);
  
  // 示例：更新关键洞察和建议
  updateInsightsAndRecommendations();
}

// 更新关键洞察和建议
function updateInsightsAndRecommendations() {
  // 获取情绪数据
  const emotions = AppState.interviewData.metrics.emotions;
  const dominantEmotions = findDominantEmotions(emotions);
  
  // 获取其他指标平均值
  const avgAttention = calculateAverage(AppState.interviewData.metrics.attention.map(item => item.value));
  const avgNervousness = calculateAverage(AppState.interviewData.metrics.nervousness.map(item => item.value));
  const avgConfidence = calculateAverage(AppState.interviewData.metrics.confidence.map(item => item.value));
  
  // 生成洞察
  const insights = [];
  
  if (avgConfidence > 80) {
    insights.push('面试者表现出较高的自信度，维持良好的眼神接触');
  } else if (avgConfidence < 60) {
    insights.push('面试者自信心不足，需要加强自我展示能力');
  }
  
  if (avgAttention > 85) {
    insights.push('回答逻辑性强，思路清晰，能够有效传达核心观点');
  } else if (avgAttention < 70) {
    insights.push('回答时注意力不集中，有时偏离主题');
  }
  
  if (avgNervousness > 70) {
    insights.push('面试过程中表现出明显紧张情绪，特别是在讨论技术细节时');
  } else if (avgNervousness < 30) {
    insights.push('面对问题保持冷静，应对压力能力强');
  }
  
  if (dominantEmotions.includes('happy')) {
    insights.push('肢体语言开放积极，表明对话题有浓厚兴趣');
  }
  
  // 生成建议
  const recommendations = [];
  
  if (avgConfidence < 75) {
    recommendations.push('建议通过模拟面试练习提升自信心');
  }
  
  if (avgNervousness > 60) {
    recommendations.push('可以适当放慢语速，特别是在讲解复杂概念时');
  }
  
  if (avgAttention < 80) {
    recommendations.push('增加具体工作案例来支持能力陈述');
  }
  
  recommendations.push('注意减少"嗯"、"就是"等填充词的使用');
  
  // 更新UI
  updateListContent('key-insights', insights);
  updateListContent('recommendations', recommendations);
}

// 查找主要情绪
function findDominantEmotions(emotions) {
  if (!emotions || emotions.length === 0) return ['neutral'];
  
  // 统计各情绪出现次数
  const counts = {};
  emotions.forEach(item => {
    counts[item.emotion] = (counts[item.emotion] || 0) + 1;
  });
  
  // 按出现次数排序
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  
  // 返回前两种主要情绪
  return sorted.slice(0, 2).map(item => item[0]);
}

// 更新列表内容
function updateListContent(elementId, items) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  element.innerHTML = '';
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    element.appendChild(li);
  });
}

// 初始化通知系统
function initNotifications() {
  // 创建通知容器
  const container = document.querySelector('.notifications-container');
  
  if (!container) {
    console.error('未找到通知容器');
    return;
  }
  
  // 全局通知方法
  window.showNotification = (message, type = 'info', duration = 3000) => {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // 设置通知内容
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon"></div>
        <div class="notification-message">${message}</div>
        <button class="notification-close">&times;</button>
      </div>
      <div class="notification-progress"></div>
    `;
    
    // 添加到容器
    container.appendChild(notification);
    
    // 绑定关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      removeNotification(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
      removeNotification(notification);
    }, duration);
  };
}

// 移除通知
function removeNotification(notification) {
  notification.classList.add('removing');
  
  // 动画结束后删除元素
  setTimeout(() => {
    notification.remove();
  }, 400);
}

// 添加科技感动画效果
function addTechEffects() {
  // 添加科技线条动画
  const techLines = document.querySelectorAll('.tech-line');
  techLines.forEach((line, index) => {
    const delay = index * 200;
    line.style.animation = `tech-line-move 8s infinite ${delay}ms linear`;
  });
  
  // 添加页面元素的进入动画
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`;
  });
}

// 添加面试中的特效
function addInterviewEffects() {
  // 添加视频容器的呼吸灯效果
  const videoContainer = document.querySelector('.video-container');
  if (videoContainer) {
    videoContainer.classList.add('recording');
  }
  
  // 添加实时数据的脉冲效果
  const metricValues = document.querySelectorAll('.metric-value');
  metricValues.forEach(value => {
    value.classList.add('pulsing');
  });
  
  // 添加雷达图的旋转效果
  document.documentElement.style.setProperty('--radar-rotation', 'running');
}

// 移除面试特效
function removeInterviewEffects() {
  // 移除视频容器的呼吸灯效果
  const videoContainer = document.querySelector('.video-container');
  if (videoContainer) {
    videoContainer.classList.remove('recording');
  }
  
  // 移除实时数据的脉冲效果
  const metricValues = document.querySelectorAll('.metric-value');
  metricValues.forEach(value => {
    value.classList.remove('pulsing');
  });
  
  // 移除雷达图的旋转效果
  document.documentElement.style.setProperty('--radar-rotation', 'paused');
}

// 收集情绪数据
function collectEmotionData(emotion) {
  if (!AppState.isInterviewing || !AppState.interviewData) return;
  
  // 记录情绪数据
  AppState.interviewData.metrics.emotions.push({
    time: new Date() - AppState.interviewStartTime,
    emotion: emotion
  });
}

// 初始化应用
document.addEventListener('DOMContentLoaded', initApp); 