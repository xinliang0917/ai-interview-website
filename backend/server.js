const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

// 导入路由
const authRoutes = require('./routes/authRoutes');

// 初始化Express应用
const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// API路由
app.use('/api/auth', authRoutes);

// 基础路由
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'AI面试系统API服务器运行中',
    status: 'online',
    version: '1.0.0'
  });
});

// 错误处理中间件
app.use((req, res, next) => {
  const error = new Error(`未找到 - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// 设置服务器端口
const PORT = process.env.PORT || 5000;

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口: ${PORT}`);
  console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
}); 