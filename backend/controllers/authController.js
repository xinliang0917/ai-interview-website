const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

/**
 * 生成JWT令牌
 * @param {Object} user 用户对象
 * @returns {String} JWT令牌
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

/**
 * 生成刷新令牌
 * @param {Object} user 用户对象
 * @returns {String} 刷新令牌
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    jwtConfig.secret,
    { expiresIn: jwtConfig.refreshExpiresIn }
  );
};

/**
 * 注册新用户
 * @route POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查邮箱是否已经被注册
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: '此邮箱已被注册'
      });
    }

    // 检查用户名是否已经被使用
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: '此用户名已被使用'
      });
    }

    // 创建新用户
    const user = new User({
      username,
      email,
      password
    });

    // 保存用户到数据库
    await user.save();

    // 生成令牌
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('注册失败:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器错误，注册失败',
      error: error.message
    });
  }
};

/**
 * 用户登录
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码不正确'
      });
    }

    // 检查密码是否匹配
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码不正确'
      });
    }

    // 更新最后登录时间
    user.lastLogin = new Date();
    await user.save();

    // 生成令牌
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: '登录成功',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('登录失败:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器错误，登录失败',
      error: error.message
    });
  }
};

/**
 * 刷新令牌
 * @route POST /api/auth/refresh-token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: '刷新令牌不能为空'
      });
    }

    // 验证刷新令牌
    const decoded = jwt.verify(refreshToken, jwtConfig.secret);
    
    // 获取用户
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '无效的刷新令牌'
      });
    }

    // 生成新令牌
    const newToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(200).json({
      success: true,
      message: '令牌刷新成功',
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    console.error('令牌刷新失败:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '刷新令牌已过期，请重新登录'
      });
    }
    
    res.status(401).json({
      success: false,
      message: '无效的刷新令牌',
      error: error.message
    });
  }
};

/**
 * 获取当前登录用户的个人资料
 * @route GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    // req.user由auth中间件提供
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '未找到用户'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('获取个人资料失败:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器错误，获取个人资料失败',
      error: error.message
    });
  }
};

/**
 * 更新用户个人资料
 * @route PUT /api/auth/profile
 */
const updateProfile = async (req, res) => {
  try {
    const { profileInfo } = req.body;
    
    // 更新用户资料
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profileInfo } },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '未找到用户'
      });
    }

    res.status(200).json({
      success: true,
      message: '个人资料更新成功',
      data: user
    });
  } catch (error) {
    console.error('更新个人资料失败:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器错误，更新个人资料失败',
      error: error.message
    });
  }
};

/**
 * 修改密码
 * @route PUT /api/auth/change-password
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // 获取用户 (包含密码)
    const user = await User.findById(req.user._id);
    
    // 验证当前密码
    const isPasswordMatch = await user.matchPassword(currentPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: '当前密码不正确'
      });
    }
    
    // 设置新密码
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: '密码修改成功'
    });
  } catch (error) {
    console.error('密码修改失败:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器错误，密码修改失败',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword
}; 