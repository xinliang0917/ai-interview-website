const mongoose = require('mongoose');
require('dotenv').config();

// 数据库连接URL，从环境变量读取或使用默认本地MongoDB链接
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-interview';

// 创建数据库连接函数
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB连接成功: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB连接失败: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 