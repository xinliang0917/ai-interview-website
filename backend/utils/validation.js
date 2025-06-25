const { check, validationResult } = require('express-validator');

// 请求数据验证中间件
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '数据验证失败',
      errors: errors.array()
    });
  }
  next();
};

// 注册表单验证规则
const registerValidation = [
  check('username')
    .notEmpty().withMessage('用户名不能为空')
    .isLength({ min: 3, max: 30 }).withMessage('用户名长度应为3-30个字符')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('用户名只能包含字母、数字和下划线'),
  
  check('email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('请提供有效的邮箱地址'),
  
  check('password')
    .notEmpty().withMessage('密码不能为空')
    .isLength({ min: 6 }).withMessage('密码至少需要6个字符')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)
    .withMessage('密码至少需要包含一个大写字母、一个小写字母和一个数字')
];

// 登录表单验证规则
const loginValidation = [
  check('email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('请提供有效的邮箱地址'),
  
  check('password')
    .notEmpty().withMessage('密码不能为空')
];

// 个人资料更新验证规则
const profileValidation = [
  check('profileInfo.name')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('姓名长度应为2-50个字符'),
    
  check('profileInfo.phone')
    .optional()
    .matches(/^1[3-9]\d{9}$/).withMessage('请提供有效的手机号码'),
  
  check('profileInfo.jobPreferences.salary')
    .optional()
    .isString().withMessage('薪资期望应为字符串格式'),
  
  check('profileInfo.skills.*.level')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('技能水平应为1-5的整数')
];

// 密码更新验证规则
const passwordUpdateValidation = [
  check('currentPassword')
    .notEmpty().withMessage('当前密码不能为空'),
    
  check('newPassword')
    .notEmpty().withMessage('新密码不能为空')
    .isLength({ min: 6 }).withMessage('新密码至少需要6个字符')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/)
    .withMessage('新密码至少需要包含一个大写字母、一个小写字母和一个数字')
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  profileValidation,
  passwordUpdateValidation
}; 