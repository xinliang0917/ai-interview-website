// 可拖动聊天组件的JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('draggable-chat');
    const dragHandle = document.querySelector('.drag-handle');
    const minimizeBtn = document.getElementById('minimize-chat');
    const closeBtn = document.getElementById('close-chat');
    const chatTray = document.getElementById('chat-tray');
    
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    // 拖动功能
    dragHandle.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragOffsetX = e.clientX - chatBox.getBoundingClientRect().left;
        dragOffsetY = e.clientY - chatBox.getBoundingClientRect().top;
        
        // 添加拖动中的样式
        chatBox.classList.add('dragging');
        
        // 防止选中文本干扰拖动
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        // 计算新位置，确保不超出窗口
        let x = e.clientX - dragOffsetX;
        let y = e.clientY - dragOffsetY;
        
        // 边界检查
        x = Math.max(0, Math.min(x, window.innerWidth - chatBox.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - chatBox.offsetHeight));
        
        // 设置新位置
        chatBox.style.left = `${x}px`;
        chatBox.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;
        
        // 移除拖动中的样式
        chatBox.classList.remove('dragging');
        
        // 添加闪烁效果
        chatBox.classList.add('flash');
        setTimeout(() => {
            chatBox.classList.remove('flash');
        }, 300);
    });

    // 最小化功能
    minimizeBtn.addEventListener('click', function() {
        chatBox.classList.toggle('minimized');
        this.textContent = chatBox.classList.contains('minimized') ? '□' : '_';
    });

    // 关闭功能
    closeBtn.addEventListener('click', function() {
        chatBox.style.display = 'none';
        chatTray.classList.add('show');
    });
    
    // 托盘图标点击重新打开聊天
    chatTray.addEventListener('click', function() {
        chatBox.style.display = 'block';
        this.classList.remove('show');
        
        // 添加打开动画
        chatBox.style.transform = 'scale(0.9)';
        setTimeout(() => {
            chatBox.style.transform = 'scale(1)';
        }, 10);
    });

    // 避免调整大小时iframe捕获鼠标事件
    let resizing = false;
    chatBox.addEventListener('mousedown', function(e) {
        // 检查是否在右下角调整大小区域
        const box = chatBox.getBoundingClientRect();
        const isResizeArea = 
            e.clientX > box.right - 20 && 
            e.clientY > box.bottom - 20;
        
        if (isResizeArea) {
            resizing = true;
            // 防止iframe捕获鼠标事件
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '10000';
            overlay.id = 'resize-overlay';
            document.body.appendChild(overlay);
        }
    });

    document.addEventListener('mouseup', function() {
        if (resizing) {
            resizing = false;
            const overlay = document.getElementById('resize-overlay');
            if (overlay) {
                document.body.removeChild(overlay);
            }
        }
    });
    
    // 处理双击标题栏最大化/还原
    let originalSize = {
        width: chatBox.style.width,
        height: chatBox.style.height
    };
    let isMaximized = false;
    
    dragHandle.addEventListener('dblclick', function() {
        if (!isMaximized) {
            // 保存当前大小
            originalSize = {
                width: chatBox.offsetWidth + 'px',
                height: chatBox.offsetHeight + 'px',
                top: chatBox.style.top,
                left: chatBox.style.left
            };
            
            // 最大化
            chatBox.style.width = '80%';
            chatBox.style.height = '80%';
            chatBox.style.top = '10%';
            chatBox.style.left = '10%';
            isMaximized = true;
        } else {
            // 还原
            chatBox.style.width = originalSize.width;
            chatBox.style.height = originalSize.height;
            chatBox.style.top = originalSize.top;
            chatBox.style.left = originalSize.left;
            isMaximized = false;
        }
    });
    
    // 确保聊天组件始终在视口内
    function keepInViewport() {
        const box = chatBox.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (box.right > viewportWidth) {
            chatBox.style.left = (viewportWidth - box.width) + 'px';
        }
        
        if (box.bottom > viewportHeight) {
            chatBox.style.top = (viewportHeight - box.height) + 'px';
        }
        
        if (box.left < 0) {
            chatBox.style.left = '0px';
        }
        
        if (box.top < 0) {
            chatBox.style.top = '0px';
        }
    }
    
    window.addEventListener('resize', keepInViewport);
}); 