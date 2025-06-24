/**
 * 认证模块
 * 负责用户登录、注册和会话管理
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuthSystem();
});

// 用户数据结构
let userData = {
  currentUser: null,
  users: []
};

// 初始化认证系统
function initAuthSystem() {
  // 从本地存储加载用户数据
  loadUserData();
  
  // 检查用户登录状态并更新UI
  checkLoginStatus();
  
  // 绑定头像点击事件，显示登录框
  document.getElementById('user-avatar').addEventListener('click', showAuthModal);
  
  // 绑定登录表单提交
  document.getElementById('login-btn').addEventListener('click', handleLogin);
  
  // 绑定注册表单提交
  document.getElementById('register-btn').addEventListener('click', handleRegister);
  
  // 绑定关闭按钮
  document.getElementById('close-auth').addEventListener('click', hideAuthModal);
  
  // 绑定标签切换
  bindTabSwitching();
  
  // 绑定表单链接
  bindFormLinks();
}

// 加载用户数据
function loadUserData() {
  const savedData = localStorage.getItem('userData');
  if (savedData) {
    userData = JSON.parse(savedData);
  }
}

// 保存用户数据到本地存储
function saveUserData() {
  localStorage.setItem('userData', JSON.stringify(userData));
}

// 检查登录状态
function checkLoginStatus() {
  if (userData.currentUser) {
    // 用户已登录，更新UI显示
    document.getElementById('username').textContent = userData.currentUser.username;
    document.getElementById('user-avatar').classList.add('logged-in');
    
    // 如果有头像，可以在这里设置
    if (userData.currentUser.avatar) {
      document.getElementById('user-avatar').style.backgroundImage = `url(${userData.currentUser.avatar})`;
    }
  } else {
    // 用户未登录，显示默认状态
    document.getElementById('username').textContent = '未登录';
    document.getElementById('user-avatar').classList.remove('logged-in');
    document.getElementById('user-avatar').style.backgroundImage = '';
  }
}

// 显示登录/注册模态框
function showAuthModal() {
  // 如果已登录，显示登出选项
  if (userData.currentUser) {
    showLogoutConfirmation();
    return;
  }
  
  const authModal = document.getElementById('auth-modal');
  authModal.classList.add('active');
  
  // 默认显示登录表单
  showTab('login');
  
  // 重置表单
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('register-phone').value = '';
  document.getElementById('register-username').value = '';
  document.getElementById('register-password').value = '';
  document.getElementById('register-confirm').value = '';
}

// 隐藏登录/注册模态框
function hideAuthModal() {
  const authModal = document.getElementById('auth-modal');
  authModal.classList.remove('active');
}

// 显示登出确认
function showLogoutConfirmation() {
  // 创建临时确认框
  const confirmBox = document.createElement('div');
  confirmBox.classList.add('auth-modal');
  confirmBox.classList.add('active');
  
  confirmBox.innerHTML = `
    <div class="auth-container" style="width: 300px;">
      <button class="close-auth" id="close-logout">&times;</button>
      <div class="auth-header">
        <h2>用户操作</h2>
        <p>${userData.currentUser.username}</p>
      </div>
      <div style="margin: 20px 0; text-align: center;">
        <button class="auth-submit" id="logout-btn" style="margin-bottom: 10px;">退出登录</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(confirmBox);
  
  // 绑定关闭按钮
  document.getElementById('close-logout').addEventListener('click', () => {
    document.body.removeChild(confirmBox);
  });
  
  // 绑定登出按钮
  document.getElementById('logout-btn').addEventListener('click', () => {
    handleLogout();
    document.body.removeChild(confirmBox);
  });
}

// 处理登出
function handleLogout() {
  // 清除当前用户
  userData.currentUser = null;
  
  // 保存更新后的用户数据
  saveUserData();
  
  // 更新UI
  checkLoginStatus();
  
  // 显示通知
  showNotification('您已成功登出', 'info');
}

// 绑定标签切换
function bindTabSwitching() {
  const tabs = document.querySelectorAll('.auth-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabType = tab.getAttribute('data-tab');
      showTab(tabType);
    });
  });
}

// 显示指定的标签内容
function showTab(tabType) {
  // 更新标签状态
  document.querySelectorAll('.auth-tab').forEach(tab => {
    if (tab.getAttribute('data-tab') === tabType) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // 更新表单显示
  if (tabType === 'login') {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
  } else {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  }
}

// 绑定表单链接
function bindFormLinks() {
  // "立即登录"链接
  document.getElementById('to-login').addEventListener('click', (e) => {
    e.preventDefault();
    showTab('login');
  });
  
  // "忘记密码"链接
  document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    showForgotPasswordForm();
  });
}

// 显示忘记密码表单 (简单实现，实际应用中可能需要更复杂的流程)
function showForgotPasswordForm() {
  showNotification('密码找回功能暂未开放，请联系管理员', 'info');
}

// 处理登录
function handleLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  
  // 表单验证
  if (!username || !password) {
    showNotification('请填写完整的登录信息', 'warning');
    return;
  }
  
  // 查找用户
  const user = userData.users.find(u => 
    (u.username === username || u.phone === username) && u.password === password
  );
  
  if (user) {
    // 登录成功
    userData.currentUser = user;
    saveUserData();
    checkLoginStatus();
    hideAuthModal();
    showNotification(`欢迎回来，${user.username}`, 'success');
  } else {
    // 登录失败
    showNotification('用户名或密码错误', 'error');
  }
}

// 处理注册
function handleRegister() {
  const phone = document.getElementById('register-phone').value.trim();
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value;
  const confirm = document.getElementById('register-confirm').value;
  
  // 表单验证
  if (!phone || !username || !password || !confirm) {
    showNotification('请填写所有必填信息', 'warning');
    return;
  }
  
  // 验证手机号格式
  if (!isValidPhone(phone)) {
    showNotification('请输入有效的手机号', 'warning');
    return;
  }
  
  // 验证密码匹配
  if (password !== confirm) {
    showNotification('两次输入的密码不一致', 'warning');
    return;
  }
  
  // 检查用户是否已存在
  if (userData.users.some(u => u.username === username)) {
    showNotification('用户名已被使用', 'warning');
    return;
  }
  
  if (userData.users.some(u => u.phone === phone)) {
    showNotification('手机号已被注册', 'warning');
    return;
  }
  
  // 创建新用户
  const newUser = {
    id: generateUserId(),
    username,
    phone,
    password,
    created: new Date().toISOString()
  };
  
  // 添加到用户列表
  userData.users.push(newUser);
  
  // 设置为当前用户
  userData.currentUser = newUser;
  
  // 保存用户数据
  saveUserData();
  
  // 更新UI
  checkLoginStatus();
  
  // 关闭模态框
  hideAuthModal();
  
  // 显示注册成功通知
  showNotification(`注册成功，欢迎 ${username}`, 'success');
}

// 生成用户ID
function generateUserId() {
  return 'user_' + new Date().getTime() + Math.floor(Math.random() * 1000);
}

// 验证手机号格式
function isValidPhone(phone) {
  // 简单的手机号验证
  const phoneRegex = /^1[3456789]\d{9}$/;
  return phoneRegex.test(phone);
} 