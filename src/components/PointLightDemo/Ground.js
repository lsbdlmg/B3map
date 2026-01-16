
// //Ground.js
// const hw = 25; // half width  (x)
// const hh = 1;  // half height (y)
// const hd = 25; // half depth  (z)
// const Ground = {
//   vertices: new Float32Array([
//     // ===== 前面 Front (z = +hd) normal (0,0,1) =====
//     -hw, -hh, hd, 0, 0, 1, 0, 0,
//     hw, -hh, hd, 0, 0, 1, 1, 0,
//     hw, -0, hd, 0, 0, 1, 1, 1,
//     -hw, -0, hd, 0, 0, 1, 0, 1,
//     // ===== 后面 Back (z = -hd) normal (0,0,-1) =====
//     hw, -hh, -hd, 0, 0, -1, 0, 0,
//     -hw, -hh, -hd, 0, 0, -1, 1, 0,
//     -hw, -0, -hd, 0, 0, -1, 1, 1,
//     hw, -0, -hd, 0, 0, -1, 0, 1,
//     // ===== 上面 Top (y = +hh) normal (0,1,0) =====
//     -hw, -0, hd, 0, 1, 0, 0, 0,
//     hw, -0, hd, 0, 1, 0, 1, 0,
//     hw, -0, -hd, 0, 1, 0, 1, 1,
//     -hw, -0, -hd, 0, 1, 0, 0, 1,
//     // ===== 下面 Bottom (y = -hh) normal (0,-1,0) =====
//     -hw, -hh, -hd, 0, -1, 0, 0, 0,
//     hw, -hh, -hd, 0, -1, 0, 1, 0,
//     hw, -hh, hd, 0, -1, 0, 1, 1,
//     -hw, -hh, hd, 0, -1, 0, 0, 1,
//     // ===== 右面 Right (x = +hw) normal (1,0,0) =====
//     hw, -hh, hd, 1, 0, 0, 0, 0,
//     hw, -hh, -hd, 1, 0, 0, 1, 0,
//     hw, -0, -hd, 1, 0, 0, 1, 1,
//     hw, -0, hd, 1, 0, 0, 0, 1,
//     // ===== 左面 Left (x = -hw) normal (-1,0,0) =====
//     -hw, -hh, -hd, -1, 0, 0, 0, 0,
//     -hw, -hh, hd, -1, 0, 0, 1, 0,
//     -hw, -0, hd, -1, 0, 0, 1, 1,
//     -hw, -0, -hd, -1, 0, 0, 0, 1,
//   ]),

//   indices: new Uint16Array([
//     // 前
//     0, 1, 2, 2, 3, 0,
//     // 后
//     4, 5, 6, 6, 7, 4,
//     // 上
//     8, 9, 10, 10, 11, 8,
//     // 下
//     12, 13, 14, 14, 15, 12,
//     // 右
//     16, 17, 18, 18, 19, 16,
//     // 左
//     20, 21, 22, 22, 23, 20,
//   ]),
//   positionArray: [
//     { x: 0, y: 1, z: 0 },
//     { x: 0, y: 90, z: 0 },

//     // { x: 0, y: 11, z: 0 },
//   ],
//     scaleArray: [
//       { x: 5, y: 2, z: 5 },
//       { x: 2, y: 1, z: 2 },
//       { x: 1 / 25, y: 40, z: 1 },
//       { x: 1 / 25, y: 40, z: 1 },
//       { x: 1, y: 40, z: 1 / 25 },
//       { x: 1 / 20, y: 25, z: 1 / 25 },
//     ],
// }
const createGround = ({ hw = 25, hh = 1, hd = 25 }) => {
  const vertices = new Float32Array([
    // ===== 前面 Front (z = +hd) normal (0,0,1) =====
    -hw, -hh, hd, 0, 0, 1, 0, 0,
    hw, -hh, hd, 0, 0, 1, 1, 0,
    hw, -0, hd, 0, 0, 1, 1, 1,
    -hw, -0, hd, 0, 0, 1, 0, 1,
    // ===== 后面 Back (z = -hd) normal (0,0,-1) =====
    hw, -hh, -hd, 0, 0, -1, 0, 0,
    -hw, -hh, -hd, 0, 0, -1, 1, 0,
    -hw, -0, -hd, 0, 0, -1, 1, 1,
    hw, -0, -hd, 0, 0, -1, 0, 1,
    // ===== 上面 Top (y = +hh) normal (0,1,0) =====
    -hw, -0, hd, 0, 1, 0, 0, 0,
    hw, -0, hd, 0, 1, 0, 1, 0,
    hw, -0, -hd, 0, 1, 0, 1, 1,
    -hw, -0, -hd, 0, 1, 0, 0, 1,
    // ===== 下面 Bottom (y = -hh) normal (0,-1,0) =====
    -hw, -hh, -hd, 0, -1, 0, 0, 0,
    hw, -hh, -hd, 0, -1, 0, 1, 0,
    hw, -hh, hd, 0, -1, 0, 1, 1,
    -hw, -hh, hd, 0, -1, 0, 0, 1,
    // ===== 右面 Right (x = +hw) normal (1,0,0) =====
    hw, -hh, hd, 1, 0, 0, 0, 0,
    hw, -hh, -hd, 1, 0, 0, 1, 0,
    hw, -0, -hd, 1, 0, 0, 1, 1,
    hw, -0, hd, 1, 0, 0, 0, 1,
    // ===== 左面 Left (x = -hw) normal (-1,0,0) =====
    -hw, -hh, -hd, -1, 0, 0, 0, 0,
    -hw, -hh, hd, -1, 0, 0, 1, 0,
    -hw, -0, hd, -1, 0, 0, 1, 1,
    -hw, -0, -hd, -1, 0, 0, 0, 1,
  ])
  const indices = new Uint16Array([
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
  ])
  return {
    vertices,
    indices,
  }
}

const Ground = createGround({ hw: 25, hh: 1, hd: 25 })
Ground.positionArray = [
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 90, z: 0 },
]
Ground.scaleArray = [
  { x: 5, y: 2, z: 5 },
  { x: 2, y: 1, z: 2 },
  { x: 1 / 25, y: 40, z: 1 },
  { x: 1 / 25, y: 40, z: 1 },
  { x: 1, y: 40, z: 1 / 25 },
  { x: 1 / 20, y: 25, z: 1 / 25 },
]
export { Ground }

// // Ground.js
// const hw = 25;       // half width
// const hd = 25;       // half depth
// const H = 2;         // thickness (downwards)
// const slices = 40;   // ← X/Z 方向细分个数

// // 顶点数据容器
// const vertices = [];
// const indices = [];

// // push 顶点工具
// function pushVertex(x, y, z, nx, ny, nz, u, v) {
//   vertices.push(x, y, z, nx, ny, nz, u, v);
// }

// // 添加两个三角形
// function quad(a, b, c, d) {
//   indices.push(a, b, c, a, c, d);
// }

// // =======================
// // 1. 上表面：y = 0
// // =======================
// let indexTopStart = 0;

// for (let iz = 0; iz <= slices; iz++) {
//   const tz = iz / slices;
//   const z = -hd + tz * (2 * hd);

//   for (let ix = 0; ix <= slices; ix++) {
//     const tx = ix / slices;
//     const x = -hw + tx * (2 * hw);

//     pushVertex(
//       x, -H, z,
//       0, -1, 0,     // normal
//       tx, tz       // uv
//     );
//   }
// }

// // 生成上面 indices
// for (let iz = 0; iz < slices; iz++) {
//   for (let ix = 0; ix < slices; ix++) {
//     const a = indexTopStart + iz * (slices + 1) + ix;
//     const b = a + 1;
//     const c = a + (slices + 1) + 1;
//     const d = a + (slices + 1);
//     quad(a, b, c, d);
//   }
// }

// let indexBottomStart = vertices.length / 8;

// // =======================
// // 2. 下面：y = -H
// // =======================
// for (let iz = 0; iz <= slices; iz++) {
//   const tz = iz / slices;
//   const z = -hd + tz * (2 * hd);

//   for (let ix = 0; ix <= slices; ix++) {
//     const tx = ix / slices;
//     const x = -hw + tx * (2 * hw);

//     pushVertex(
//       x, 0, z,
//       0, 1, 0,    // bottom normal
//       tx, tz
//     );
//   }
// }

// // 生成下面 indices
// for (let iz = 0; iz < slices; iz++) {
//   for (let ix = 0; ix < slices; ix++) {
//     const a = indexBottomStart + iz * (slices + 1) + ix;
//     const b = a + 1;
//     const c = a + (slices + 1) + 1;
//     const d = a + (slices + 1);
//     quad(a, d, c, b); // 反向（法线向下）
//   }
// }

// // 当前顶点数
// let vtx = vertices.length / 8;

// // =======================
// // 3. 四个侧面（不细分）
// // =======================

// // Front
// pushVertex(-hw, -H, hd, 0, 0, 1, 0, 0);
// pushVertex(hw, -H, hd, 0, 0, 1, 1, 0);
// pushVertex(hw, 0, hd, 0, 0, 1, 1, 1);
// pushVertex(-hw, 0, hd, 0, 0, 1, 0, 1);
// quad(vtx, vtx + 1, vtx + 2, vtx + 3);
// vtx += 4;

// // Back
// pushVertex(hw, -H, -hd, 0, 0, -1, 0, 0);
// pushVertex(-hw, -H, -hd, 0, 0, -1, 1, 0);
// pushVertex(-hw, 0, -hd, 0, 0, -1, 1, 1);
// pushVertex(hw, 0, -hd, 0, 0, -1, 0, 1);
// quad(vtx, vtx + 1, vtx + 2, vtx + 3);
// vtx += 4;

// // Right
// pushVertex(hw, -H, hd, 1, 0, 0, 0, 0);
// pushVertex(hw, -H, -hd, 1, 0, 0, 1, 0);
// pushVertex(hw, 0, -hd, 1, 0, 0, 1, 1);
// pushVertex(hw, 0, hd, 1, 0, 0, 0, 1);
// quad(vtx, vtx + 1, vtx + 2, vtx + 3);
// vtx += 4;

// // Left
// pushVertex(-hw, -H, -hd, -1, 0, 0, 0, 0);
// pushVertex(-hw, -H, hd, -1, 0, 0, 1, 0);
// pushVertex(-hw, 0, hd, -1, 0, 0, 1, 1);
// pushVertex(-hw, 0, -hd, -1, 0, 0, 0, 1);
// quad(vtx, vtx + 1, vtx + 2, vtx + 3);
// vtx += 4;


// // =======================
// // 导出
// // =======================
// const Ground = {
//   vertices: new Float32Array(vertices),
//   indices: new Uint16Array(indices),

//   positionArray: [
//     { x: 0, y: 0, z: 0 },
//   ],

//   scaleArray: [
//     { x: 5, y: 1, z: 5 },
//   ]
// };

// export { Ground };
