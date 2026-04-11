//CameraController.js
// 相机参数
// let yaw = 130; // 水平角 初始镜头看向的位置 0 看向x正半轴 -90 看向z正半轴
// let pitch = -20; // 垂直角
let yaw = -90; // 水平角 初始镜头看向的位置 0 看向x正半轴 -90 看向z正半轴
let pitch = -40; // 垂直角
const sensitivity = 0.1;// 鼠标灵敏度
let moveSpeed = 8.0;// 移动速度
let verticalSpeed = 0.4;// 垂直移动速度
const keys = {};// 按键状态

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
    freeCamera.value ? moveSpeed = 1 : moveSpeed = 32
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

let jumpKeyPressedLastFrame = false;//禁止长按空格连跳
let verticalVel = 0;   // kinematic 竖直速度
let isGrounded = false;

const updateCamera = (eye, center, freeCamera, playerBody, playerCollider, characterController, world, RAPIER, dt) => {
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

  // 水平 forward（不受 pitch 影响）
  const flatFrontX = Math.cos(radYaw);
  const flatFrontZ = Math.sin(radYaw);

  if (freeCamera.value) {
    // === 自由视角（不受物理碰撞） ===
    // 你原本这里 moveSpeed 是“每帧位移”，我不改你的手感
    if (keys['w']) { eye.x += flatFrontX * moveSpeed; eye.z += flatFrontZ * moveSpeed; }
    if (keys['s']) { eye.x -= flatFrontX * moveSpeed; eye.z -= flatFrontZ * moveSpeed; }
    if (keys['a']) { eye.x += rightX * moveSpeed; eye.z += rightZ * moveSpeed; }
    if (keys['d']) { eye.x -= rightX * moveSpeed; eye.z -= rightZ * moveSpeed; }
    if (keys[' ']) eye.y += verticalSpeed;
    if (keys['shift']) eye.y -= verticalSpeed;

    center.x = eye.x + fx;
    center.y = eye.y + fy;
    center.z = eye.z + fz;
    return;
  }

  // === 第一人称（CharacterController + autostep）===

  // 1) 输入方向（只用 yaw）
  let dirX = 0, dirZ = 0;
  if (keys['w']) { dirX += flatFrontX; dirZ += flatFrontZ; }
  if (keys['s']) { dirX -= flatFrontX; dirZ -= flatFrontZ; }
  if (keys['a']) { dirX += rightX; dirZ += rightZ; }
  if (keys['d']) { dirX -= rightX; dirZ -= rightZ; }

  // 归一化，避免斜向更快
  const l = Math.hypot(dirX, dirZ);
  if (l > 1e-6) { dirX /= l; dirZ /= l; }

  // 2) 期望位移（注意：这里 moveSpeed 变成“每秒速度”更合理）
  // 如果你想保持和以前一样的速度体感，可以把 moveSpeed 调大一些
  const desired = {
    x: dirX * moveSpeed * dt,
    y: 0,
    z: dirZ * moveSpeed * dt,
  };

  // 3) 跳跃/重力（kinematic 需要自己算）
  verticalVel += world.gravity.y * dt;

  const jumpKeyPressed = keys[' '];
  if (jumpKeyPressed && !jumpKeyPressedLastFrame && isGrounded) {
    verticalVel = 20; // 跳跃初速度，调大跳得更高
    isGrounded = false;
  }
  jumpKeyPressedLastFrame = jumpKeyPressed;

  desired.y = verticalVel * dt;

  // 4) 计算带碰撞/滑动/爬台阶后的有效位移
  // 你这个 compat 版本 computeColliderMovement 不返回值
  characterController.computeColliderMovement(playerCollider, desired, world);

  const effective = characterController.computedMovement();
  isGrounded = characterController.computedGrounded();

  if (isGrounded && verticalVel < 0) {
    verticalVel = 0;
  }

  // 5) 应用到 kinematic 刚体
  const p0 = playerBody.translation();
  playerBody.setNextKinematicTranslation({
    x: p0.x + effective.x,
    y: p0.y + effective.y,
    z: p0.z + effective.z,
  });

  // 6) step
  world.step();

  // 7) 相机跟随
  const p = playerBody.translation();
  eye.x = p.x;
  eye.y = p.y + 5;
  eye.z = p.z;

  center.x = eye.x + fx;
  center.y = eye.y + fy;
  center.z = eye.z + fz;
};

export { initControls, updateCamera };
