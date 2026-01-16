//Pillar.js
const hw = 1; // half width  (x)
const hh = 10;  // half height (y)
const hd = 1; // half depth  (z)
const repeatV = 10;
export const Pillar = {
    vertices: new Float32Array([
        // ===== 前面 Front (z = +hd) =====
        - hw, -hh, hd, 0, 0, 1, 0, 0,
        hw, -hh, hd, 0, 0, 1, 1, 0,
        hw, hh, hd, 0, 0, 1, 1, repeatV,
        -hw, hh, hd, 0, 0, 1, 0, repeatV,
        // ===== 后面 Back (z = -hd) =====
        hw, -hh, -hd, 0, 0, -1, 0, 0,
        -hw, -hh, -hd, 0, 0, -1, 1, 0,
        -hw, hh, -hd, 0, 0, -1, 1, repeatV,
        hw, hh, -hd, 0, 0, -1, 0, repeatV,
        // ===== 右面 Right (x = +hw) =====
        hw, -hh, hd, 1, 0, 0, 0, 0,
        hw, -hh, -hd, 1, 0, 0, 1, 0,
        hw, hh, -hd, 1, 0, 0, 1, repeatV,
        hw, hh, hd, 1, 0, 0, 0, repeatV,
        // ===== 左面 Left (x = -hw) =====
        -hw, -hh, -hd, -1, 0, 0, 0, 0,
        -hw, -hh, hd, -1, 0, 0, 1, 0,
        -hw, hh, hd, -1, 0, 0, 1, repeatV,
        -hw, hh, -hd, -1, 0, 0, 0, repeatV,
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
        { x: -24, y: 11, z: -24 },
        { x: -24, y: 11, z: 0 },
        { x: 24, y: 11, z: -24 },
        { x: 24, y: 11, z: 0 },
        { x: -24, y: 11, z: 24 },
        { x: 24, y: 11, z: 24 },
        { x: 0, y: 11, z: 24 },
        { x: 0, y: 11, z: -24 },
    ],
}
