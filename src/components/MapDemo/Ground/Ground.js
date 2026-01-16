//Ground.js
const hw = 25; // half width  (x)
const hh = 1;  // half height (y)
const hd = 25; // half depth  (z)
const Ground = {
  vertices: new Float32Array([
    // ===== 前面 Front (z = +hd) normal (0,0,1) =====
    -hw, -hh, hd, 0, 0, 1, 0, 0,
    hw, -hh, hd, 0, 0, 1, 1, 0,
    hw, hh, hd, 0, 0, 1, 1, 1,
    -hw, hh, hd, 0, 0, 1, 0, 1,
    // ===== 后面 Back (z = -hd) normal (0,0,-1) =====
    hw, -hh, -hd, 0, 0, -1, 0, 0,
    -hw, -hh, -hd, 0, 0, -1, 1, 0,
    -hw, hh, -hd, 0, 0, -1, 1, 1,
    hw, hh, -hd, 0, 0, -1, 0, 1,
    // ===== 上面 Top (y = +hh) normal (0,1,0) =====
    -hw, hh, hd, 0, 1, 0, 0, 0,
    hw, hh, hd, 0, 1, 0, 1, 0,
    hw, hh, -hd, 0, 1, 0, 1, 1,
    -hw, hh, -hd, 0, 1, 0, 0, 1,
    // ===== 下面 Bottom (y = -hh) normal (0,-1,0) =====
    -hw, -hh, -hd, 0, -1, 0, 0, 0,
    hw, -hh, -hd, 0, -1, 0, 1, 0,
    hw, -hh, hd, 0, -1, 0, 1, 1,
    -hw, -hh, hd, 0, -1, 0, 0, 1,
    // ===== 右面 Right (x = +hw) normal (1,0,0) =====
    hw, -hh, hd, 1, 0, 0, 0, 0,
    hw, -hh, -hd, 1, 0, 0, 1, 0,
    hw, hh, -hd, 1, 0, 0, 1, 1,
    hw, hh, hd, 1, 0, 0, 0, 1,
    // ===== 左面 Left (x = -hw) normal (-1,0,0) =====
    -hw, -hh, -hd, -1, 0, 0, 0, 0,
    -hw, -hh, hd, -1, 0, 0, 1, 0,
    -hw, hh, hd, -1, 0, 0, 1, 1,
    -hw, hh, -hd, -1, 0, 0, 0, 1,
  ]),

  indices: new Uint16Array([
    // 前
    0, 1, 2, 2, 3, 0,
    // 后
    4, 5, 6, 6, 7, 4,
    // 上
    8, 9, 10, 10, 11, 8,
    // 下
    12, 13, 14, 14, 15, 12,
    // 右
    16, 17, 18, 18, 19, 16,
    // 左
    20, 21, 22, 22, 23, 20,
  ]),
  positionArray: [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 22, z: 0 },
  ],
}
export { Ground }
