/**
 * AI智能面试系统 - 人脸检测脚本
 * 基于face-api.js实现人脸检测、表情识别
 */

// 人脸检测初始化状态
window.faceDetectionInitialized = false;

// 情绪映射
const EMOTIONS = {
  neutral: '平静',
  happy: '愉快', 
  sad: '悲伤',
  angry: '愤怒',
  fearful: '恐惧',
  disgusted: '厌恶',
  surprised: '惊讶'
};

// 情绪颜色映射
const EMOTION_COLORS = {
  neutral: '#64748b',
  happy: '#22c55e', 
  sad: '#64748b',
  angry: '#ef4444',
  fearful: '#a855f7',
  disgusted: '#8b5cf6',
  surprised: '#eab308'
};

// 检测参数
const DETECTION_PARAMS = {
  interval: 200,    // 检测间隔(毫秒)
  scoreThreshold: 0.5, // 置信度阈值
  boxColor: '#00d0ff',  // 边框颜色
  boxWidth: 2,      // 边框宽度
  glowEffect: '0 0 10px rgba(0, 208, 255, 0.7)',  // 发光效果
  landmarkColor: 'rgba(0, 208, 255, 0.7)', // 特征点颜色
  showLandmarks: false, // 是否显示特征点
  showDetectionBox: false // 是否显示检测框
};

// 初始化检测
async function initFaceDetection() {
  try {
    // 检查视频元素
    const videoEl = document.getElementById('webcam');
    if (!videoEl) {
      throw new Error('未找到视频元素');
    }
    
    // 不再初始化检测框UI
    // initDetectionBoxUI();
    
    // 显示加载状态
    showNotification('正在初始化人脸检测模型...', 'info');
    
    // 加载模型
    await loadModels();
    
    // 开始定期检测
    startFaceDetection(videoEl);
    
    // 记录初始化状态
    window.faceDetectionInitialized = true;
    console.log('人脸检测已初始化');
    
    // 显示成功通知
    showNotification('人脸检测成功初始化', 'success');
    
    return true;
  } catch (error) {
    console.error('人脸检测初始化失败:', error);
    showNotification('人脸检测初始化失败: ' + error.message, 'error');
    return false;
  }
}

// 初始化检测框UI元素
function initDetectionBoxUI() {
  // 获取或创建检测框
  let detectionBox = document.querySelector('.detection-box');
  
  // 如果不存在就创建一个
  if (!detectionBox) {
    const videoWrapper = document.querySelector('.video-wrapper');
    if (!videoWrapper) return;
    
    detectionBox = document.createElement('div');
    detectionBox.className = 'detection-box';
    videoWrapper.appendChild(detectionBox);
  }
  
  // 清除已有内容
  detectionBox.innerHTML = '';
  
  // 添加四个角标记
  const cornerTR = document.createElement('div');
  cornerTR.className = 'corner-tr';
  detectionBox.appendChild(cornerTR);
  
  const cornerBL = document.createElement('div');
  cornerBL.className = 'corner-bl';
  detectionBox.appendChild(cornerBL);
  
  // 添加扫描线效果
  const scanLine = document.createElement('div');
  scanLine.className = 'scan-line';
  detectionBox.appendChild(scanLine);
}

// 加载模型
async function loadModels() {
  try {
    console.log('开始加载人脸检测模型...');
    
    // 创建加载进度指示器
    createLoadingIndicator();
    
    // 直接加载内联模型
    try {
      console.log('开始加载 tinyFaceDetector 模型...');
      await faceapi.nets.tinyFaceDetector.load();
      updateLoadingProgress(25);
      console.log('tinyFaceDetector 模型加载完成');
      
      console.log('开始加载 faceLandmark68Net 模型...');
      await faceapi.nets.faceLandmark68Net.load();
      updateLoadingProgress(50);
      console.log('faceLandmark68Net 模型加载完成');
      
      console.log('开始加载 faceRecognitionNet 模型...');
      await faceapi.nets.faceRecognitionNet.load();
      updateLoadingProgress(75);
      console.log('faceRecognitionNet 模型加载完成');
      
      console.log('开始加载 faceExpressionNet 模型...');
      await faceapi.nets.faceExpressionNet.load();
      updateLoadingProgress(100);
      console.log('faceExpressionNet 模型加载完成');
      
      // 移除加载指示器
      removeLoadingIndicator();
      console.log('所有人脸识别模型加载完成');
    } catch (error) {
      console.error('内联模型加载失败，尝试使用本地模型:', error);
      
      // 尝试本地模型
      try {
        const modelPath = './models';
        console.log('尝试从本地路径加载模型:', modelPath);
        
        await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
        updateLoadingProgress(25);
        
        await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
        updateLoadingProgress(50);
        
        await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
        updateLoadingProgress(75);
        
        await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
        updateLoadingProgress(100);
        
        // 移除加载指示器
        removeLoadingIndicator();
        console.log('本地模型加载完成');
      } catch (localError) {
        console.error('本地模型加载失败:', localError);
        
        // 尝试CDN模型
        try {
          const cdnPath = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';
          console.log('尝试从CDN路径加载模型:', cdnPath);
          
          await faceapi.nets.tinyFaceDetector.loadFromUri(cdnPath);
          updateLoadingProgress(25);
          
          await faceapi.nets.faceLandmark68Net.loadFromUri(cdnPath);
          updateLoadingProgress(50);
          
          await faceapi.nets.faceRecognitionNet.loadFromUri(cdnPath);
          updateLoadingProgress(75);
          
          await faceapi.nets.faceExpressionNet.loadFromUri(cdnPath);
          updateLoadingProgress(100);
          
          // 移除加载指示器
          removeLoadingIndicator();
          console.log('CDN模型加载完成');
        } catch (cdnError) {
          console.error('CDN模型加载失败:', cdnError);
          removeLoadingIndicator();
          throw new Error('所有模型加载方式都失败');
        }
      }
    }
  } catch (error) {
    console.error('模型加载失败:', error);
    console.error('模型加载错误详情:', error.stack);
    removeLoadingIndicator();
    throw new Error('无法加载人脸识别模型');
  }
}

// 创建加载进度指示器
function createLoadingIndicator() {
  const container = document.querySelector('.video-wrapper');
  if (!container) return;
  
  const indicator = document.createElement('div');
  indicator.className = 'model-loading-indicator';
  indicator.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">加载人脸检测模型 <span id="loading-progress">0</span>%</div>
  `;
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .model-loading-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(10, 18, 50, 0.8);
      z-index: 100;
      color: #d2e2ff;
      font-size: 14px;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      margin-bottom: 15px;
      border: 3px solid rgba(0, 208, 255, 0.3);
      border-radius: 50%;
      border-top-color: #00d0ff;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .loading-text {
      font-family: var(--font-family);
    }
  `;
  
  document.head.appendChild(style);
  container.appendChild(indicator);
}

// 更新加载进度
function updateLoadingProgress(progress) {
  const progressEl = document.getElementById('loading-progress');
  if (progressEl) {
    progressEl.textContent = progress;
  }
}

// 移除加载指示器
function removeLoadingIndicator() {
  const indicator = document.querySelector('.model-loading-indicator');
  if (indicator) {
    indicator.classList.add('fade-out');
    setTimeout(() => {
      indicator.remove();
    }, 500);
  }
}

// 开始人脸检测
function startFaceDetection(videoEl) {
  if (!videoEl) return;
  
  // 检测定时器
  window.faceDetection = {
    timer: setInterval(() => detectFace(videoEl), DETECTION_PARAMS.interval),
    active: true
  };
}

// 停止人脸检测
function stopFaceDetection() {
  if (window.faceDetection && window.faceDetection.timer) {
    clearInterval(window.faceDetection.timer);
    window.faceDetection.timer = null;
    window.faceDetection.active = false;
    
    // 隐藏检测框
    const detectionBox = document.querySelector('.detection-box');
    if (detectionBox) {
      detectionBox.style.display = 'none';
    }
  }
}

// 检测人脸
async function detectFace(videoEl) {
  if (!AppState.isInterviewing || !videoEl || !videoEl.readyState || videoEl.readyState < 2) {
    return;
  }
  
  try {
    // 使用TinyFaceDetector进行检测
    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: DETECTION_PARAMS.scoreThreshold
    });
    
    // 执行检测
    const results = await faceapi.detectAllFaces(videoEl, options)
      .withFaceLandmarks()
      .withFaceExpressions();
    
    // 处理检测结果
    processDetectionResults(results, videoEl);
  } catch (error) {
    console.error('人脸检测出错:', error);
  }
}

// 处理检测结果
function processDetectionResults(results, videoEl) {
  // 获取检测框元素
  const detectionBox = document.querySelector('.detection-box');
  const emotionEl = document.getElementById('emotion');
  
  // 始终隐藏检测框
  if (detectionBox) {
    detectionBox.style.display = 'none';
  }
  
  // 如果没有检测到人脸
  if (!results || !results.length) {
    if (emotionEl) {
      emotionEl.textContent = '未检测到人脸';
      emotionEl.style.color = '#d2e2ff';
    }
    return;
  }
  
  // 处理第一个检测到的人脸
  const detection = results[0];
  const expressions = detection.expressions;
  const landmarks = detection.landmarks;
  
  // 获取视频容器尺寸
  const videoContainer = videoEl.parentElement;
  const videoWidth = videoEl.videoWidth;
  const videoHeight = videoEl.videoHeight;
  const containerWidth = videoContainer.clientWidth;
  const containerHeight = videoContainer.clientHeight;
  
  // 计算缩放比例
  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;
  
  // 如果启用了特征点显示，绘制面部特征点
  if (DETECTION_PARAMS.showLandmarks) {
    drawFaceLandmarks(landmarks, videoEl, scaleX, scaleY);
  }
  
  // 分析情绪
  const dominantEmotion = getDominantEmotion(expressions);
  const emotionName = EMOTIONS[dominantEmotion] || dominantEmotion;
  
  if (emotionEl) {
    emotionEl.textContent = emotionName;
    
    // 根据情绪设置颜色
    const emotionColor = EMOTION_COLORS[dominantEmotion] || '#d2e2ff';
    emotionEl.style.color = emotionColor;
  }
  
  // 基于情绪估算其他指标
  estimateMetricsFromEmotion(dominantEmotion, expressions);
  
  // 存储当前情绪数据
  if (AppState.interviewData && AppState.interviewData.metrics) {
    AppState.interviewData.metrics.emotions.push({
      time: new Date() - AppState.interviewStartTime,
      emotion: dominantEmotion,
      probability: expressions[dominantEmotion]
    });
    
    // 更新情绪图表
    collectEmotionData(dominantEmotion);
  }
}

// 绘制面部特征点
function drawFaceLandmarks(landmarks, videoEl, scaleX, scaleY) {
  // 检查是否已有canvas元素，如果没有则创建一个
  let canvas = document.querySelector('.landmarks-canvas');
  
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'landmarks-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '15';
    
    const videoContainer = videoEl.parentElement;
    videoContainer.appendChild(canvas);
    
    // 设置canvas尺寸
    canvas.width = videoContainer.clientWidth;
    canvas.height = videoContainer.clientHeight;
  } else {
    // 清除之前的绘制内容
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  // 绘制点
  const positions = landmarks.positions;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = DETECTION_PARAMS.landmarkColor;
  
  for (let i = 0; i < positions.length; i++) {
    const x = positions[i].x * scaleX;
    const y = positions[i].y * scaleY;
    
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// 获取主要情绪
function getDominantEmotion(expressions) {
  let maxProb = 0;
  let dominantEmotion = 'neutral';
  
  for (const emotion in expressions) {
    const probability = expressions[emotion];
    if (probability > maxProb) {
      maxProb = probability;
      dominantEmotion = emotion;
    }
  }
  
  return dominantEmotion;
}

// 基于情绪估算其他指标
function estimateMetricsFromEmotion(emotion, expressions) {
  // 仅在未使用模拟数据的情况下才实际使用此函数
  // 当前我们使用模拟数据，所以这部分逻辑只是占位
  
  // 注意力估算逻辑
  let attentionEstimate = 0;
  switch (emotion) {
    case 'neutral':
      attentionEstimate = 85 + (Math.random() * 10);
      break;
    case 'happy':
      attentionEstimate = 80 + (Math.random() * 10);
      break;
    case 'sad':
      attentionEstimate = 60 + (Math.random() * 15);
      break;
    case 'angry':
      attentionEstimate = 75 + (Math.random() * 10);
      break;
    case 'fearful':
      attentionEstimate = 50 + (Math.random() * 15);
      break;
    case 'disgusted':
      attentionEstimate = 65 + (Math.random() * 15);
      break;
    case 'surprised':
      attentionEstimate = 90 + (Math.random() * 10);
      break;
    default:
      attentionEstimate = 75 + (Math.random() * 10);
  }
  
  // 紧张程度估算逻辑
  let nervousnessEstimate = 0;
  switch (emotion) {
    case 'neutral':
      nervousnessEstimate = 20 + (Math.random() * 20);
      break;
    case 'happy':
      nervousnessEstimate = 10 + (Math.random() * 15);
      break;
    case 'sad':
      nervousnessEstimate = 40 + (Math.random() * 30);
      break;
    case 'angry':
      nervousnessEstimate = 60 + (Math.random() * 30);
      break;
    case 'fearful':
      nervousnessEstimate = 70 + (Math.random() * 30);
      break;
    case 'disgusted':
      nervousnessEstimate = 50 + (Math.random() * 30);
      break;
    case 'surprised':
      nervousnessEstimate = 50 + (Math.random() * 40);
      break;
    default:
      nervousnessEstimate = 30 + (Math.random() * 30);
  }
  
  // 自信度估算逻辑
  let confidenceEstimate = 0;
  switch (emotion) {
    case 'neutral':
      confidenceEstimate = 65 + (Math.random() * 20);
      break;
    case 'happy':
      confidenceEstimate = 80 + (Math.random() * 20);
      break;
    case 'sad':
      confidenceEstimate = 40 + (Math.random() * 30);
      break;
    case 'angry':
      confidenceEstimate = 60 + (Math.random() * 30);
      break;
    case 'fearful':
      confidenceEstimate = 30 + (Math.random() * 20);
      break;
    case 'disgusted':
      confidenceEstimate = 50 + (Math.random() * 20);
      break;
    case 'surprised':
      confidenceEstimate = 60 + (Math.random() * 30);
      break;
    default:
      confidenceEstimate = 55 + (Math.random() * 25);
  }
  
  // 更新显示和数据收集
  // 这里仅更新显示，实际数据收集在app.js中通过定时器进行
  document.getElementById('attention-score').textContent = Math.round(attentionEstimate);
  document.getElementById('nervousness-score').textContent = Math.round(nervousnessEstimate);
  document.getElementById('confidence-score').textContent = Math.round(confidenceEstimate);
}

// 在页面卸载时清理资源
window.addEventListener('beforeunload', () => {
  stopFaceDetection();
}); 