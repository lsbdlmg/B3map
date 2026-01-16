// Pillar.js
const createPillar = ({
  hw = 1,   // half width  (x)
  hh = 10,  // half height (y)   → 实际高度 = 2*hh
  hd = 1,   // half depth  (z)
  repeatV = 10,
  slices = 20,
}) => {

  const vertices = [];
  const indices = [];

  function pushVertex(x, y, z, nx, ny, nz, u, v) {
    vertices.push(x, y, z, nx, ny, nz, u, v);
  }

  function quad(a, b, c, d) {
    indices.push(a, b, c, a, c, d);
  }

  let vertexCount = 0;

  // ==========================
  // 1. 生成 4 个侧面（细分）
  // ==========================
  const sideDefs = [
    { baseX1: -hw, baseZ1: hd, baseX2: hw, baseZ2: hd, nx: 0, ny: 0, nz: 1 },
    { baseX1: hw, baseZ1: -hd, baseX2: -hw, baseZ2: -hd, nx: 0, ny: 0, nz: -1 },
    { baseX1: hw, baseZ1: hd, baseX2: hw, baseZ2: -hd, nx: 1, ny: 0, nz: 0 },
    { baseX1: -hw, baseZ1: -hd, baseX2: -hw, baseZ2: hd, nx: -1, ny: 0, nz: 0 },
  ];

  for (const side of sideDefs) {
    const startIndex = vertexCount;

    for (let i = 0; i <= slices; i++) {
      const t = i / slices;     // 0 → 1
      const y = t * (2 * hh);   // ⭐ 柱子从 y=0 → y=2hh
      const v = t * repeatV;

      pushVertex(side.baseX1, y, side.baseZ1, side.nx, side.ny, side.nz, 0, v);
      pushVertex(side.baseX2, y, side.baseZ2, side.nx, side.ny, side.nz, 1, v);
    }

    for (let i = 0; i < slices; i++) {
      const a = startIndex + i * 2;
      const b = a + 1;
      const c = a + 3;
      const d = a + 2;
      quad(a, b, c, d);
    }

    vertexCount += (slices + 1) * 2;
  }

  // ==========================
  // 2. 顶面（y = 2hh）
  // ==========================
  const topY = 2 * hh;
  const topStart = vertexCount;

  pushVertex(-hw, topY, hd, 0, 1, 0, 0, 0);
  pushVertex(hw, topY, hd, 0, 1, 0, 1, 0);
  pushVertex(hw, topY, -hd, 0, 1, 0, 1, 1);
  pushVertex(-hw, topY, -hd, 0, 1, 0, 0, 1);

  quad(topStart, topStart + 1, topStart + 2, topStart + 3);
  vertexCount += 4;

  // ==========================
  // 3. 底面（y = 0）
  // ==========================
  const botY = 0;
  const botStart = vertexCount;

  pushVertex(-hw, botY, -hd, 0, -1, 0, 0, 0);
  pushVertex(hw, botY, -hd, 0, -1, 0, 1, 0);
  pushVertex(hw, botY, hd, 0, -1, 0, 1, 1);
  pushVertex(-hw, botY, hd, 0, -1, 0, 0, 1);

  quad(botStart, botStart + 1, botStart + 2, botStart + 3);

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  };
}

// 默认细分 40 段
const Pillar = createPillar({
  hw: 1,
  hh: 20,     // 柱子总高度：40
  hd: 1,
  repeatV: 10,
  slices: 40,
});

Pillar.positionArray = [
  { x: 10, y: 0, z: 0 },
  { x: 30, y: 0, z: 15 },
  { x: -30, y: 0, z: 15 },
  { x: 15, y: 0, z: -35 },
];

Pillar.scaleArray = [
  { x: 11, y: 1, z: 11 },
  { x: 1, y: 2, z: 1 },
  { x: 1, y: 2, z: 1 },
  { x: 1, y: 2, z: 1 },
];

export { Pillar };
