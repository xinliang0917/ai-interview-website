const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  refreshToken, 
  getProfile, 
  updateProfile, 
  changePassword 
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { 
  registerValidation, 
  loginValidation, 
  profileValidation, 
  passwordUpdateValidation, 
  validate 
} = require('../utils/validation');

// 注册新用户
router.post('/register', registerValidation, validate, register);

// 用户登录
router.post('/login', loginValidation, validate, login);

// 刷新令牌
router.post('/refresh-token', refreshToken);

// 以下路由需要认证
router.use(auth);

// 获取当前用户个人资料
router.get('/profile', getProfile);

// 更新用户个人资料
router.put('/profile', profileValidation, validate, updateProfile);

// 修改密码
router.put('/change-password', passwordUpdateValidation, validate, changePassword);

module.exports = router; 