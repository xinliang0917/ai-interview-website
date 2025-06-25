require('dotenv').config();

// JWT密钥配置，从环境变量获取或使用默认值
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'ai-interview-super-secret-key-2024',
  // 令牌过期时间：默认7天
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  // 刷新令牌过期时间：默认30天
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
};

module.exports = jwtConfig; 