const mongoose = require('mongoose');

// 定义面试记录数据结构
const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  interviewMode: {
    type: String,
    enum: ['technical', 'hr', 'comprehensive'],
    default: 'comprehensive'
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  scores: {
    professionalSkills: {
      type: Number,
      min: 0,
      max: 100
    },
    communication: {
      type: Number,
      min: 0,
      max: 100
    },
    logicalThinking: {
      type: Number,
      min: 0,
      max: 100
    },
    adaptability: {
      type: Number,
      min: 0,
      max: 100
    },
    creativity: {
      type: Number,
      min: 0,
      max: 100
    },
    pressureHandling: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  emotionData: [{
    timestamp: Date,
    emotion: String,
    confidence: Number
  }],
  speechData: {
    rate: String, // 语速: 较慢, 适中, 较快
    pauseFrequency: String, // 停顿频率: 极少, 适中, 频繁
    clarity: String  // 清晰度: 较低, 良好, 极佳
  },
  metrics: {
    attention: Number,
    nervousness: Number,
    confidence: Number
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  duration: Number, // 单位：秒
  // 可以添加存储面试视频URL或其他媒体资源
  mediaResources: {
    videoUrl: String,
    audioUrl: String
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 创建并导出面试记录模型
const Interview = mongoose.model('Interview', InterviewSchema);
module.exports = Interview; 