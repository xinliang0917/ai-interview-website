const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 定义用户数据结构
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '请提供有效的电子邮箱']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profileInfo: {
    name: String,
    gender: String,
    phone: String,
    birthday: Date,
    education: String,
    address: String,
    jobPreferences: {
      position: String,
      industry: String,
      salary: String,
      workType: String,
      location: String
    },
    skills: [{
      name: String,
      level: Number,
      description: String
    }],
    certificates: [{
      name: String,
      date: Date,
      description: String
    }],
    internships: [{
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    projects: [{
      name: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    workExperience: [{
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String
    }]
  },
  interviewHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// 密码加密中间件
UserSchema.pre('save', async function(next) {
  // 只有在密码被修改或新用户注册时才进行加密
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    // 使用盐对密码加密
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 验证密码的方法
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 创建并导出用户模型
const User = mongoose.model('User', UserSchema);
module.exports = User; 