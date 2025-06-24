/**
 * 个人主页功能模块
 * 负责简历信息的显示、编辑和保存
 */

document.addEventListener('DOMContentLoaded', () => {
  initProfilePage();
});

// 个人主页数据结构
let profileData = {
  basicInfo: {
    name: '',
    gender: '',
    phone: '',
    email: '',
    birthday: '',
    education: '',
    address: ''
  },
  jobIntention: {
    position: '',
    industry: '',
    salary: '',
    workType: '',
    location: ''
  },
  skills: [],
  certificates: [],
  internships: [],
  projects: [],
  workExperiences: []
};

// 初始化个人主页
function initProfilePage() {
  // 加载已保存的个人信息（从localStorage获取）
  loadProfileData();
  
  // 绑定技能、证书、经历等添加按钮事件
  bindAddExperienceEvents();
  
  // 绑定保存按钮事件
  document.getElementById('save-profile').addEventListener('click', saveProfileData);
  
  // 绑定滑块变化事件（技能熟练度）
  bindRangeInputEvents();
}

// 从本地存储加载个人信息
function loadProfileData() {
  const savedData = localStorage.getItem('profileData');
  if (savedData) {
    profileData = JSON.parse(savedData);
    
    // 填充基本信息
    fillBasicInfo();
    
    // 填充求职意向
    fillJobIntention();
    
    // 填充技能特长
    fillSkills();
    
    // 填充获奖证书
    fillCertificates();
    
    // 填充实习经历
    fillInternships();
    
    // 填充项目经历
    fillProjects();
    
    // 填充工作经历
    fillWorkExperiences();
  }
}

// 填充基本信息表单
function fillBasicInfo() {
  const info = profileData.basicInfo;
  document.getElementById('profile-name').value = info.name || '';
  document.getElementById('profile-gender').value = info.gender || '';
  document.getElementById('profile-phone').value = info.phone || '';
  document.getElementById('profile-email').value = info.email || '';
  document.getElementById('profile-birthday').value = info.birthday || '';
  document.getElementById('profile-education').value = info.education || '';
  document.getElementById('profile-address').value = info.address || '';
}

// 填充求职意向表单
function fillJobIntention() {
  const intention = profileData.jobIntention;
  document.getElementById('profile-position').value = intention.position || '';
  document.getElementById('profile-industry').value = intention.industry || '';
  document.getElementById('profile-salary').value = intention.salary || '';
  document.getElementById('profile-work-type').value = intention.workType || '';
  document.getElementById('profile-job-location').value = intention.location || '';
}

// 填充技能特长
function fillSkills() {
  const container = document.getElementById('skills-container');
  // 清除默认项
  clearExceptAddButton(container);
  
  if (profileData.skills.length === 0) {
    // 如果没有技能，添加一个空白项
    addSkillItem({
      name: '',
      level: 75,
      description: ''
    });
  } else {
    // 添加所有已有技能
    profileData.skills.forEach(skill => {
      addSkillItem(skill);
    });
  }
}

// 填充获奖证书
function fillCertificates() {
  const container = document.getElementById('certificates-container');
  clearExceptAddButton(container);
  
  if (profileData.certificates.length === 0) {
    addCertificateItem({
      name: '',
      date: '',
      description: ''
    });
  } else {
    profileData.certificates.forEach(cert => {
      addCertificateItem(cert);
    });
  }
}

// 填充实习经历
function fillInternships() {
  const container = document.getElementById('internships-container');
  clearExceptAddButton(container);
  
  if (profileData.internships.length === 0) {
    addInternshipItem({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  } else {
    profileData.internships.forEach(intern => {
      addInternshipItem(intern);
    });
  }
}

// 填充项目经历
function fillProjects() {
  const container = document.getElementById('projects-container');
  clearExceptAddButton(container);
  
  if (profileData.projects.length === 0) {
    addProjectItem({
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  } else {
    profileData.projects.forEach(project => {
      addProjectItem(project);
    });
  }
}

// 填充工作经历
function fillWorkExperiences() {
  const container = document.getElementById('work-container');
  clearExceptAddButton(container);
  
  if (profileData.workExperiences.length === 0) {
    addWorkItem({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  } else {
    profileData.workExperiences.forEach(work => {
      addWorkItem(work);
    });
  }
}

// 清除容器中除了添加按钮外的所有内容
function clearExceptAddButton(container) {
  const addButton = container.querySelector('[id^="add-"]');
  container.innerHTML = '';
  if (addButton) {
    container.appendChild(addButton);
  }
}

// 保存个人主页数据
function saveProfileData() {
  // 收集基本信息
  collectBasicInfo();
  
  // 收集求职意向
  collectJobIntention();
  
  // 收集技能特长
  collectSkills();
  
  // 收集获奖证书
  collectCertificates();
  
  // 收集实习经历
  collectInternships();
  
  // 收集项目经历
  collectProjects();
  
  // 收集工作经历
  collectWorkExperiences();
  
  // 保存到本地存储
  localStorage.setItem('profileData', JSON.stringify(profileData));
  
  // 显示保存成功通知
  showNotification('个人信息保存成功', 'success');
}

// 收集基本信息
function collectBasicInfo() {
  profileData.basicInfo = {
    name: document.getElementById('profile-name').value,
    gender: document.getElementById('profile-gender').value,
    phone: document.getElementById('profile-phone').value,
    email: document.getElementById('profile-email').value,
    birthday: document.getElementById('profile-birthday').value,
    education: document.getElementById('profile-education').value,
    address: document.getElementById('profile-address').value
  };
}

// 收集求职意向
function collectJobIntention() {
  profileData.jobIntention = {
    position: document.getElementById('profile-position').value,
    industry: document.getElementById('profile-industry').value,
    salary: document.getElementById('profile-salary').value,
    workType: document.getElementById('profile-work-type').value,
    location: document.getElementById('profile-job-location').value
  };
}

// 收集技能特长
function collectSkills() {
  profileData.skills = [];
  const skillItems = document.querySelectorAll('#skills-container .skill-item');
  
  skillItems.forEach((item, index) => {
    const nameId = `skill-name-${index + 1}`;
    const levelId = `skill-level-${index + 1}`;
    const descId = `skill-desc-${index + 1}`;
    
    if (document.getElementById(nameId)) {
      profileData.skills.push({
        name: document.getElementById(nameId).value,
        level: document.getElementById(levelId).value,
        description: document.getElementById(descId).value
      });
    }
  });
}

// 收集获奖证书
function collectCertificates() {
  profileData.certificates = [];
  const certItems = document.querySelectorAll('#certificates-container .experience-item');
  
  certItems.forEach((item, index) => {
    const nameId = `cert-name-${index + 1}`;
    const dateId = `cert-date-${index + 1}`;
    const descId = `cert-desc-${index + 1}`;
    
    if (document.getElementById(nameId)) {
      profileData.certificates.push({
        name: document.getElementById(nameId).value,
        date: document.getElementById(dateId).value,
        description: document.getElementById(descId).value
      });
    }
  });
}

// 收集实习经历
function collectInternships() {
  profileData.internships = [];
  const internItems = document.querySelectorAll('#internships-container .experience-item');
  
  internItems.forEach((item, index) => {
    const companyId = `intern-company-${index + 1}`;
    const positionId = `intern-position-${index + 1}`;
    const startId = `intern-start-${index + 1}`;
    const endId = `intern-end-${index + 1}`;
    const descId = `intern-desc-${index + 1}`;
    
    if (document.getElementById(companyId)) {
      profileData.internships.push({
        company: document.getElementById(companyId).value,
        position: document.getElementById(positionId).value,
        startDate: document.getElementById(startId).value,
        endDate: document.getElementById(endId).value,
        description: document.getElementById(descId).value
      });
    }
  });
}

// 收集项目经历
function collectProjects() {
  profileData.projects = [];
  const projectItems = document.querySelectorAll('#projects-container .experience-item');
  
  projectItems.forEach((item, index) => {
    const nameId = `project-name-${index + 1}`;
    const roleId = `project-role-${index + 1}`;
    const startId = `project-start-${index + 1}`;
    const endId = `project-end-${index + 1}`;
    const descId = `project-desc-${index + 1}`;
    
    if (document.getElementById(nameId)) {
      profileData.projects.push({
        name: document.getElementById(nameId).value,
        role: document.getElementById(roleId).value,
        startDate: document.getElementById(startId).value,
        endDate: document.getElementById(endId).value,
        description: document.getElementById(descId).value
      });
    }
  });
}

// 收集工作经历
function collectWorkExperiences() {
  profileData.workExperiences = [];
  const workItems = document.querySelectorAll('#work-container .experience-item');
  
  workItems.forEach((item, index) => {
    const companyId = `work-company-${index + 1}`;
    const positionId = `work-position-${index + 1}`;
    const startId = `work-start-${index + 1}`;
    const endId = `work-end-${index + 1}`;
    const descId = `work-desc-${index + 1}`;
    
    if (document.getElementById(companyId)) {
      profileData.workExperiences.push({
        company: document.getElementById(companyId).value,
        position: document.getElementById(positionId).value,
        startDate: document.getElementById(startId).value,
        endDate: document.getElementById(endId).value,
        description: document.getElementById(descId).value
      });
    }
  });
}

// 绑定添加经历按钮事件
function bindAddExperienceEvents() {
  // 添加技能
  document.getElementById('add-skill').addEventListener('click', () => {
    addSkillItem({
      name: '',
      level: 75,
      description: ''
    });
  });
  
  // 添加证书
  document.getElementById('add-certificate').addEventListener('click', () => {
    addCertificateItem({
      name: '',
      date: '',
      description: ''
    });
  });
  
  // 添加实习经历
  document.getElementById('add-internship').addEventListener('click', () => {
    addInternshipItem({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  });
  
  // 添加项目经历
  document.getElementById('add-project').addEventListener('click', () => {
    addProjectItem({
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  });
  
  // 添加工作经历
  document.getElementById('add-work').addEventListener('click', () => {
    addWorkItem({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  });
}

// 绑定滑块变化事件
function bindRangeInputEvents() {
  document.addEventListener('input', e => {
    if (e.target.classList.contains('range-input')) {
      // 更新滑块旁边的百分比显示
      const percent = e.target.nextElementSibling;
      if (percent && percent.classList.contains('skill-percent')) {
        percent.textContent = e.target.value + '%';
      }
    }
  });
}

// 添加技能项
function addSkillItem(skill) {
  const container = document.getElementById('skills-container');
  const addButton = document.getElementById('add-skill');
  const skillCount = container.querySelectorAll('.skill-item').length + 1;
  
  const skillItem = document.createElement('div');
  skillItem.classList.add('skill-item');
  
  skillItem.innerHTML = `
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="skill-name-${skillCount}">技能名称</label>
        <input type="text" id="skill-name-${skillCount}" placeholder="如：Java编程" value="${skill.name}">
      </div>
      <div class="profile-form-group half-width">
        <label for="skill-level-${skillCount}">熟练度</label>
        <div class="skill-level">
          <input type="range" id="skill-level-${skillCount}" class="range-input" min="0" max="100" value="${skill.level}">
          <span class="skill-percent">${skill.level}%</span>
        </div>
      </div>
    </div>
    <div class="profile-form-group">
      <label for="skill-desc-${skillCount}">技能描述</label>
      <textarea id="skill-desc-${skillCount}" placeholder="请描述该技能的具体情况和掌握程度">${skill.description}</textarea>
    </div>
    <button class="delete-experience" data-delete="skill-${skillCount}">删除该技能</button>
  `;
  
  // 插入到添加按钮前面
  container.insertBefore(skillItem, addButton);
  
  // 绑定删除按钮事件
  const deleteBtn = skillItem.querySelector('.delete-experience');
  deleteBtn.addEventListener('click', () => {
    container.removeChild(skillItem);
    renumberItems('skill', 'skills-container');
  });
}

// 添加证书项
function addCertificateItem(certificate) {
  const container = document.getElementById('certificates-container');
  const addButton = document.getElementById('add-certificate');
  const certCount = container.querySelectorAll('.experience-item').length + 1;
  
  const certItem = document.createElement('div');
  certItem.classList.add('experience-item');
  
  certItem.innerHTML = `
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="cert-name-${certCount}">证书名称</label>
        <input type="text" id="cert-name-${certCount}" placeholder="如：英语四级证书" value="${certificate.name}">
      </div>
      <div class="profile-form-group half-width">
        <label for="cert-date-${certCount}">获得日期</label>
        <input type="date" id="cert-date-${certCount}" value="${certificate.date}">
      </div>
    </div>
    <div class="profile-form-group">
      <label for="cert-desc-${certCount}">证书描述</label>
      <textarea id="cert-desc-${certCount}" placeholder="请描述获得该证书的背景和含义">${certificate.description}</textarea>
    </div>
    <button class="delete-experience" data-delete="cert-${certCount}">删除此证书</button>
  `;
  
  container.insertBefore(certItem, addButton);
  
  const deleteBtn = certItem.querySelector('.delete-experience');
  deleteBtn.addEventListener('click', () => {
    container.removeChild(certItem);
    renumberItems('cert', 'certificates-container');
  });
}

// 添加实习经历项
function addInternshipItem(internship) {
  const container = document.getElementById('internships-container');
  const addButton = document.getElementById('add-internship');
  const internCount = container.querySelectorAll('.experience-item').length + 1;
  
  const internItem = document.createElement('div');
  internItem.classList.add('experience-item');
  
  internItem.innerHTML = `
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="intern-company-${internCount}">公司名称</label>
        <input type="text" id="intern-company-${internCount}" placeholder="如：XX科技有限公司" value="${internship.company}">
      </div>
      <div class="profile-form-group half-width">
        <label for="intern-position-${internCount}">职位</label>
        <input type="text" id="intern-position-${internCount}" placeholder="如：前端开发实习生" value="${internship.position}">
      </div>
    </div>
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="intern-start-${internCount}">开始日期</label>
        <input type="date" id="intern-start-${internCount}" value="${internship.startDate}">
      </div>
      <div class="profile-form-group half-width">
        <label for="intern-end-${internCount}">结束日期</label>
        <input type="date" id="intern-end-${internCount}" value="${internship.endDate}">
      </div>
    </div>
    <div class="profile-form-group">
      <label for="intern-desc-${internCount}">工作描述</label>
      <textarea id="intern-desc-${internCount}" placeholder="请描述你的主要工作内容和成就">${internship.description}</textarea>
    </div>
    <button class="delete-experience" data-delete="intern-${internCount}">删除此经历</button>
  `;
  
  container.insertBefore(internItem, addButton);
  
  const deleteBtn = internItem.querySelector('.delete-experience');
  deleteBtn.addEventListener('click', () => {
    container.removeChild(internItem);
    renumberItems('intern', 'internships-container');
  });
}

// 添加项目经历项
function addProjectItem(project) {
  const container = document.getElementById('projects-container');
  const addButton = document.getElementById('add-project');
  const projectCount = container.querySelectorAll('.experience-item').length + 1;
  
  const projectItem = document.createElement('div');
  projectItem.classList.add('experience-item');
  
  projectItem.innerHTML = `
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="project-name-${projectCount}">项目名称</label>
        <input type="text" id="project-name-${projectCount}" placeholder="如：电商平台开发" value="${project.name}">
      </div>
      <div class="profile-form-group half-width">
        <label for="project-role-${projectCount}">担任角色</label>
        <input type="text" id="project-role-${projectCount}" placeholder="如：前端开发工程师" value="${project.role}">
      </div>
    </div>
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="project-start-${projectCount}">开始日期</label>
        <input type="date" id="project-start-${projectCount}" value="${project.startDate}">
      </div>
      <div class="profile-form-group half-width">
        <label for="project-end-${projectCount}">结束日期</label>
        <input type="date" id="project-end-${projectCount}" value="${project.endDate}">
      </div>
    </div>
    <div class="profile-form-group">
      <label for="project-desc-${projectCount}">项目描述</label>
      <textarea id="project-desc-${projectCount}" placeholder="请描述项目的背景、你的职责和成就">${project.description}</textarea>
    </div>
    <button class="delete-experience" data-delete="project-${projectCount}">删除此项目</button>
  `;
  
  container.insertBefore(projectItem, addButton);
  
  const deleteBtn = projectItem.querySelector('.delete-experience');
  deleteBtn.addEventListener('click', () => {
    container.removeChild(projectItem);
    renumberItems('project', 'projects-container');
  });
}

// 添加工作经历项
function addWorkItem(work) {
  const container = document.getElementById('work-container');
  const addButton = document.getElementById('add-work');
  const workCount = container.querySelectorAll('.experience-item').length + 1;
  
  const workItem = document.createElement('div');
  workItem.classList.add('experience-item');
  
  workItem.innerHTML = `
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="work-company-${workCount}">公司名称</label>
        <input type="text" id="work-company-${workCount}" placeholder="如：XX科技有限公司" value="${work.company}">
      </div>
      <div class="profile-form-group half-width">
        <label for="work-position-${workCount}">职位</label>
        <input type="text" id="work-position-${workCount}" placeholder="如：前端开发工程师" value="${work.position}">
      </div>
    </div>
    <div class="profile-form-row">
      <div class="profile-form-group half-width">
        <label for="work-start-${workCount}">开始日期</label>
        <input type="date" id="work-start-${workCount}" value="${work.startDate}">
      </div>
      <div class="profile-form-group half-width">
        <label for="work-end-${workCount}">结束日期</label>
        <input type="date" id="work-end-${workCount}" value="${work.endDate}">
      </div>
    </div>
    <div class="profile-form-group">
      <label for="work-desc-${workCount}">工作描述</label>
      <textarea id="work-desc-${workCount}" placeholder="请描述你的主要工作内容和成就">${work.description}</textarea>
    </div>
    <button class="delete-experience" data-delete="work-${workCount}">删除此工作</button>
  `;
  
  container.insertBefore(workItem, addButton);
  
  const deleteBtn = workItem.querySelector('.delete-experience');
  deleteBtn.addEventListener('click', () => {
    container.removeChild(workItem);
    renumberItems('work', 'work-container');
  });
}

// 重新编号项目
function renumberItems(prefix, containerId) {
  const container = document.getElementById(containerId);
  const items = container.querySelectorAll(prefix === 'skill' ? '.skill-item' : '.experience-item');
  
  items.forEach((item, index) => {
    const count = index + 1;
    
    // 更新ID和标签for属性
    item.querySelectorAll('[id^="' + prefix + '-"]').forEach(element => {
      const oldId = element.id;
      const parts = oldId.split('-');
      const type = parts[0];
      const field = parts[1];
      
      // 创建新的ID
      const newId = `${type}-${field}-${count}`;
      
      // 更新元素ID
      element.id = newId;
      
      // 找到对应的label并更新for属性
      const labels = item.querySelectorAll('label');
      labels.forEach(label => {
        if (label.getAttribute('for') === oldId) {
          label.setAttribute('for', newId);
        }
      });
    });
    
    // 更新删除按钮的data-delete属性
    const deleteBtn = item.querySelector('.delete-experience');
    if (deleteBtn) {
      deleteBtn.setAttribute('data-delete', `${prefix}-${count}`);
    }
  });
} 