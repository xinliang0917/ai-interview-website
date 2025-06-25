const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const User = require('../models/User');

/**
 * 鉴权中间件，用于验证请求中的JWT令牌
 */
const auth = async (req, res, next) => {
  try {
    // 从请求头获取token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: '未提供认证令牌，拒绝访问' 
      });
    }
    
    // 验证token
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    // 根据token中的用户ID查找用户
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在或令牌无效'
      });
    }
    
    // 将用户信息添加到请求对象中
    req.user = user;
    next();
  } catch (error) {
    console.error('认证失败:', error.message);
    
    // 令牌过期错误处理
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '认证令牌已过期，请重新登录',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    // 其他令牌错误
    return res.status(401).json({
      success: false,
      message: '认证令牌无效',
      code: 'INVALID_TOKEN'
    });
  }
};

/**
 * 管理员权限中间件
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: '需要先进行身份认证'
    });
  }
  
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: '需要管理员权限'
    });
  }
};

module.exports = { auth, adminOnly }; 