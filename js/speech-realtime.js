/**
 * AI智能面试分析系统 - 语音分析实时指标
 * 实现语速、停顿频率和声音清晰度的实时动态变化
 */

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  console.log('初始化语音分析实时指标...');
  
  // 初始化实时更新功能
  initSpeechRealTimeIndicators();
});

/**
 * 初始化语音实时指标更新功能
 */
function initSpeechRealTimeIndicators() {
  // 获取指标元素
  const speechRateElement = document.getElementById('speech-rate');
  const pauseFrequencyElement = document.getElementById('pause-frequency');
  const voiceClarityElement = document.getElementById('voice-clarity');
  
  // 如果不在面试页面，则不执行
  if (!speechRateElement || !pauseFrequencyElement || !voiceClarityElement) {
    return;
  }
  
  // 语速可能值列表
  const speechRateValues = ['较慢', '缓慢', '适中', '较快', '快速'];
  // 停顿频率可能值列表
  const pauseFrequencyValues = ['极少', '较少', '适中', '较多', '频繁'];
  // 声音清晰度可能值列表
  const voiceClarityValues = ['较低', '一般', '良好', '优秀', '极佳'];
  
  // 为指标值添加变化效果
  speechRateElement.classList.add('animated-value');
  pauseFrequencyElement.classList.add('animated-value');
  voiceClarityElement.classList.add('animated-value');
  
  // 开始模拟实时数据更新
  startRealtimeUpdates(speechRateElement, speechRateValues);
  startRealtimeUpdates(pauseFrequencyElement, pauseFrequencyValues);
  startRealtimeUpdates(voiceClarityElement, voiceClarityValues);
  
  // 监听面试开始和结束
  listenForInterviewStateChanges();
}

/**
 * 开始实时更新指标值
 * @param {HTMLElement} element - 需要更新的DOM元素
 * @param {Array} possibleValues - 可能的值列表
 */
function startRealtimeUpdates(element, possibleValues) {
  let isActive = true;  // 控制是否继续更新
  
  // 更新函数
  const updateValue = () => {
    if (!isActive) return;
    
    // 生成带权重的随机值，偏向中间值
    const weightedRandom = () => {
      // 使用正态分布近似
      let sum = 0;
      for (let i = 0; i < 3; i++) {
        sum += Math.random();
      }
      return Math.floor((sum / 3) * possibleValues.length);
    };
    
    // 获取新值，避免连续两次相同
    let newIndex;
    do {
      newIndex = weightedRandom();
    } while (possibleValues[newIndex] === element.textContent && possibleValues.length > 1);
    
    const newValue = possibleValues[newIndex];
    
    // 设置值变化的过渡动画
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.textContent = newValue;
      element.style.opacity = '1';
      
      // 根据值类型添加不同的颜色效果
      updateValueStyle(element, newIndex, possibleValues.length);
    }, 300);
    
    // 设置下次更新时间，随机2-6秒
    const nextUpdateTime = 2000 + Math.random() * 4000;
    setTimeout(updateValue, nextUpdateTime);
  };
  
  // 首次更新延迟略有不同，错开各指标更新时间
  const initialDelay = 1000 + Math.random() * 2000;
  setTimeout(updateValue, initialDelay);
  
  // 提供停止更新的方法
  element.stopUpdates = () => {
    isActive = false;
  };
  
  // 提供重新开始更新的方法
  element.startUpdates = () => {
    if (isActive) return;
    isActive = true;
    updateValue();
  };
}

/**
 * 根据值的等级更新显示样式
 * @param {HTMLElement} element - DOM元素
 * @param {number} index - 当前值的索引
 * @param {number} totalValues - 总共可能的值数量
 */
function updateValueStyle(element, index, totalValues) {
  // 清除之前的所有颜色类
  element.classList.remove('value-low', 'value-medium', 'value-high', 'value-optimal');
  
  // 根据值的位置添加不同的颜色类
  const normalizedIndex = index / (totalValues - 1);  // 0-1范围
  
  if (normalizedIndex < 0.25) {
    element.classList.add('value-low');
  } else if (normalizedIndex < 0.5) {
    element.classList.add('value-medium');
  } else if (normalizedIndex < 0.75) {
    element.classList.add('value-high');
  } else {
    element.classList.add('value-optimal');
  }
}

/**
 * 监听面试开始和结束事件
 */
function listenForInterviewStateChanges() {
  // 获取开始和结束面试按钮
  const startButton = document.querySelector('.start-interview');
  const endButton = document.querySelector('.end-interview');
  
  if (startButton && endButton) {
    // 监听面试开始
    startButton.addEventListener('click', () => {
      // 重新开始所有实时指标更新
      const indicatorElements = [
        document.getElementById('speech-rate'),
        document.getElementById('pause-frequency'),
        document.getElementById('voice-clarity')
      ];
      
      indicatorElements.forEach(el => {
        if (el && el.startUpdates) {
          el.startUpdates();
        }
      });
    });
    
    // 监听面试结束
    endButton.addEventListener('click', () => {
      // 停止所有实时指标更新
      const indicatorElements = [
        document.getElementById('speech-rate'),
        document.getElementById('pause-frequency'),
        document.getElementById('voice-clarity')
      ];
      
      indicatorElements.forEach(el => {
        if (el && el.stopUpdates) {
          el.stopUpdates();
        }
      });
    });
  }
} 