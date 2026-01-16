//CameraController.js
// 相机参数
let yaw = 0; // 水平角
let pitch = 0; // 垂直角
const sensitivity = 0.1;
const moveSpeed = 0.4;
const verticalSpeed = 0.4;
const keys = {};
// 初始化事件监听
const initControls = (canvas, window) => {
    // ===== 键盘监听 =====
    window.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
    window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });
    // ===== 鼠标点击进入 Pointer Lock =====
    canvas.value.addEventListener('click', () => {
        canvas.value.requestPointerLock?.();
    });
    // ===== 鼠标移动控制视角 =====
    const onMouseMove = (e) => {
        const dx = e.movementX * sensitivity;
        const dy = e.movementY * sensitivity;
        yaw += dx;
        pitch -= dy; // Y方向反向
        pitch = Math.max(Math.min(pitch, 89), -89);        // 限制 pitch 避免翻转
    };
    // 监听 Pointer Lock 状态变化
    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === canvas.value) {
            document.addEventListener('mousemove', onMouseMove);
            canvas.value.style.cursor = 'none'; // 隐藏光标
        } else {
            document.removeEventListener('mousemove', onMouseMove);
            canvas.value.style.cursor = 'default'; // 恢复光标
        }
    });
};

// 每帧更新相机位置
const updateCamera = (eye, center) => {
    const radYaw = (yaw * Math.PI) / 180;
    const radPitch = (pitch * Math.PI) / 180;
    // 前方向向量
    const frontX = Math.cos(radYaw) * Math.cos(radPitch);
    const frontY = Math.sin(radPitch);
    const frontZ = Math.sin(radYaw) * Math.cos(radPitch);
    // 单位化
    const len = Math.sqrt(frontX ** 2 + frontY ** 2 + frontZ ** 2);
    const fx = frontX / len;
    const fy = frontY / len;
    const fz = frontZ / len;
    // 右方向（yaw + 90°）
    const rightX = Math.cos(radYaw - Math.PI / 2);
    const rightZ = Math.sin(radYaw - Math.PI / 2);
    // WASD 移动
    if (keys['w']) { eye.x += fx * moveSpeed; eye.z += fz * moveSpeed; }
    if (keys['s']) { eye.x -= fx * moveSpeed; eye.z -= fz * moveSpeed; }
    if (keys['a']) { eye.x += rightX * moveSpeed; eye.z += rightZ * moveSpeed; }
    if (keys['d']) { eye.x -= rightX * moveSpeed; eye.z -= rightZ * moveSpeed; }
    // 上下移动
    if (keys[' ']) eye.y += verticalSpeed;
    if (keys['shift']) eye.y -= verticalSpeed;
    // 更新中心点
    center.x = eye.x + fx;
    center.y = eye.y + fy;
    center.z = eye.z + fz;
};
export { initControls, updateCamera };
