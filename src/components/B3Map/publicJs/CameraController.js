//CameraController.js
// 相机参数
let yaw = 0; // 水平角 初始镜头看向的位置 0 看向x正半轴 -90 看向z正半轴
let pitch = 0; // 垂直角
const sensitivity = 0.1;// 鼠标灵敏度
let moveSpeed = 8.0;// 移动速度
let verticalSpeed = 0.4;// 垂直移动速度
const keys = {};// 按键状态
let isJumping = false;//判断是否在跳跃
let jumpKeyPressedLastFrame = false;//禁止长按空格连跳
// let freeCamera = false; // F2 切换自由视角
let savedPlayerEye = { x: 0, y: 0, z: 0 }; // 保存第一人称位置
// let airVx = 0;
// let airVz = 0;

// const STEP_HEIGHT = 3.0;     // 最大可踩高度
// const STEP_FORWARD = 0.1;   // 前向检测距离

// 初始化事件监听
const initControls = (canvas, window, eye, center, freeCamera) => {
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
  // 监听 F2 切换
  window.addEventListener('keydown', (e) => {
    freeCamera.value ? moveSpeed = 0.4 : moveSpeed = 16.0
    if (e.key === 'F2') {
      freeCamera.value = !freeCamera.value;

      if (!freeCamera.value) {
        // 切换回第一人称 → 恢复保存位置
        eye.x = savedPlayerEye.x;
        eye.y = savedPlayerEye.y;
        eye.z = savedPlayerEye.z;
      } else {
        // 切换自由视角 → 保存第一人称当前位置
        savedPlayerEye.x = eye.x;
        savedPlayerEye.y = eye.y;
        savedPlayerEye.z = eye.z;
      }
    }
  });

};

const updateCamera = (eye, center, freeCamera, playerBody, world, RAPIER) => {
  const radYaw = (yaw * Math.PI) / 180;
  const radPitch = (pitch * Math.PI) / 180;

  const frontX = Math.cos(radYaw) * Math.cos(radPitch);
  const frontY = Math.sin(radPitch);
  const frontZ = Math.sin(radYaw) * Math.cos(radPitch);

  const len = Math.sqrt(frontX ** 2 + frontY ** 2 + frontZ ** 2);
  const fx = frontX / len;
  const fy = frontY / len;
  const fz = frontZ / len;

  const rightX = Math.cos(radYaw - Math.PI / 2);
  const rightZ = Math.sin(radYaw - Math.PI / 2);

  if (freeCamera.value) {
    // === 自由视角（不受物理碰撞） ===
    if (keys['w']) { eye.x += fx * moveSpeed; eye.y += fx * moveSpeed * 0; eye.z += fz * moveSpeed; }
    if (keys['s']) { eye.x -= fx * moveSpeed; eye.z -= fz * moveSpeed; }
    if (keys['a']) { eye.x += rightX * moveSpeed; eye.z += rightZ * moveSpeed; }
    if (keys['d']) { eye.x -= rightX * moveSpeed; eye.z -= rightZ * moveSpeed; }
    if (keys[' ']) eye.y += verticalSpeed;
    if (keys['shift']) eye.y -= verticalSpeed;

    center.x = eye.x + fx;
    center.y = eye.y + fy;
    center.z = eye.z + fz;

  } else {
    // === 第一人称（受物理碰撞） ===
    let vx = 0, vz = 0;
    if (keys['w']) { vx += fx * moveSpeed; vz += fz * moveSpeed; }
    if (keys['s']) { vx -= fx * moveSpeed; vz -= fz * moveSpeed; }
    if (keys['a']) { vx += rightX * moveSpeed; vz += rightZ * moveSpeed; }
    if (keys['d']) { vx -= rightX * moveSpeed; vz -= rightZ * moveSpeed; }

    const curVel = playerBody.linvel();
    const onGround = Math.abs(curVel.y) < 0.05;
    let vy = curVel.y;
    if (onGround) {
      isJumping = false;
    }
    const jumpKeyPressed = keys[' '];
    if (jumpKeyPressed && !jumpKeyPressedLastFrame && !isJumping && onGround) {
      vy = 8;
      isJumping = true;
    }
    jumpKeyPressedLastFrame = jumpKeyPressed;

    // 应用速度
    playerBody.setLinvel({ x: vx, y: vy, z: vz }, true);


    world.step();

    const p = playerBody.translation();
    eye.x = p.x;
    eye.y = p.y + 5; // 相机在胶囊中间
    eye.z = p.z;

    center.x = eye.x + fx;
    center.y = eye.y + fy;
    center.z = eye.z + fz;
  }
};
export { initControls, updateCamera };


// 每帧更新相机位置
// const updateCamera = (eye, center) => {
//   const radYaw = (yaw * Math.PI) / 180;
//   const radPitch = (pitch * Math.PI) / 180;
//   // 前方向向量
//   const frontX = Math.cos(radYaw) * Math.cos(radPitch);
//   const frontY = Math.sin(radPitch);
//   const frontZ = Math.sin(radYaw) * Math.cos(radPitch);
//   // 单位化
//   const len = Math.sqrt(frontX ** 2 + frontY ** 2 + frontZ ** 2);
//   const fx = frontX / len;
//   const fy = frontY / len;
//   const fz = frontZ / len;
//   // 右方向（yaw + 90°）
//   const rightX = Math.cos(radYaw - Math.PI / 2);
//   const rightZ = Math.sin(radYaw - Math.PI / 2);
//   // WASD 移动
//   if (keys['w']) { eye.x += fx * moveSpeed; eye.z += fz * moveSpeed; }
//   if (keys['s']) { eye.x -= fx * moveSpeed; eye.z -= fz * moveSpeed; }
//   if (keys['a']) { eye.x += rightX * moveSpeed; eye.z += rightZ * moveSpeed; }
//   if (keys['d']) { eye.x -= rightX * moveSpeed; eye.z -= rightZ * moveSpeed; }
//   // 上下移动
//   if (keys[' ']) eye.y += verticalSpeed;
//   if (keys['shift']) eye.y -= verticalSpeed;
//   // 更新中心点
//   center.x = eye.x + fx;
//   center.y = eye.y + fy;
//   center.z = eye.z + fz;
// };


// const updateCamera = (eye, center, playerBody, world) => {
//   // 前方向
//   const radYaw = (yaw * Math.PI) / 180;
//   const radPitch = (pitch * Math.PI) / 180;

//   const frontX = Math.cos(radYaw) * Math.cos(radPitch);
//   const frontY = Math.sin(radPitch);
//   const frontZ = Math.sin(radYaw) * Math.cos(radPitch);

//   const len = Math.sqrt(frontX ** 2 + frontY ** 2 + frontZ ** 2);
//   const fx = frontX / len;
//   const fy = frontY / len;
//   const fz = frontZ / len;

//   // 右方向
//   const rightX = Math.cos(radYaw - Math.PI / 2);
//   const rightZ = Math.sin(radYaw - Math.PI / 2);

//   // WASD → 水平速度
//   let vx = 0, vz = 0;
//   if (keys['w']) { vx += fx * moveSpeed; vz += fz * moveSpeed; }
//   if (keys['s']) { vx -= fx * moveSpeed; vz -= fz * moveSpeed; }
//   if (keys['a']) { vx += rightX * moveSpeed; vz += rightZ * moveSpeed; }
//   if (keys['d']) { vx -= rightX * moveSpeed; vz -= rightZ * moveSpeed; }

//   const curVel = playerBody.linvel();

//   // === 跳跃逻辑（上升沿检测 + 空中限制）===
//   const onGround = Math.abs(curVel.y) < 0.05; // 地面判断
//   let vy = curVel.y;

//   if (onGround) {
//     isJumping = false; // 落地后重置
//   }

//   // 空格刚被按下 && 玩家在地面 && 未跳过
//   const jumpKeyPressed = keys[' '];
//   if (jumpKeyPressed && !jumpKeyPressedLastFrame && !isJumping && onGround) {
//     vy = 8;          // 跳跃速度
//     isJumping = true; // 标记空中禁止连跳
//   }
//   jumpKeyPressedLastFrame = jumpKeyPressed; // 保存本帧状态

//   // === 设置速度，保证跳跃不被覆盖 ===
//   playerBody.setLinvel({ x: vx, y: vy, z: vz }, true);

//   // 物理步进
//   world.step();

//   // 同步相机位置
//   const p = playerBody.translation();
//   eye.x = p.x;
//   eye.y = p.y; // 相机在胶囊中间
//   eye.z = p.z;

//   center.x = eye.x + fx;
//   center.y = eye.y + fy;
//   center.z = eye.z + fz;
// };
