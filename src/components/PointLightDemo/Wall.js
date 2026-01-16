const createWall = (w = 20, h = 20, d = 1, segW = 40, segH = 40) => {
  const hw = w / 2;
  const hh = h / 2;       // 原本中点
  const hd = d / 2;

  const vertices = [];
  const indices = [];

  //============================
  // 工具：生成细分面（四个侧面）
  //============================
  const pushSubdividedFace = (p0, p1, p2, p3, normal, segX, segY) => {
    const baseIndex = vertices.length / 8;

    for (let y = 0; y <= segY; y++) {
      const ty = y / segY;
      for (let x = 0; x <= segX; x++) {
        const tx = x / segX;

        let px =
          p0[0] * (1 - tx) * (1 - ty) +
          p1[0] * tx * (1 - ty) +
          p3[0] * (1 - tx) * ty +
          p2[0] * tx * ty;

        let py =
          p0[1] * (1 - tx) * (1 - ty) +
          p1[1] * tx * (1 - ty) +
          p3[1] * (1 - tx) * ty +
          p2[1] * tx * ty;

        let pz =
          p0[2] * (1 - tx) * (1 - ty) +
          p1[2] * tx * (1 - ty) +
          p3[2] * (1 - tx) * ty +
          p2[2] * tx * ty;

        // *** Y 改为从 0 到 h ***
        py += hh;

        vertices.push(px, py, pz, normal[0], normal[1], normal[2], tx, ty);
      }
    }

    for (let y = 0; y < segY; y++) {
      for (let x = 0; x < segX; x++) {
        const i = baseIndex + y * (segX + 1) + x;

        indices.push(i, i + 1, i + segX + 1);
        indices.push(i + 1, i + segX + 2, i + segX + 1);
      }
    }
  };

  //============================
  // 工具：普通未细分面（上下）
  //============================
  const pushSimpleFace = (p0, p1, p2, p3, normal) => {
    const baseIndex = vertices.length / 8;

    // *** 每个顶点都 +hh，让面高度从 [0,h] ***
    const P = [
      [p0[0], p0[1] + hh, p0[2]],
      [p1[0], p1[1] + hh, p1[2]],
      [p2[0], p2[1] + hh, p2[2]],
      [p3[0], p3[1] + hh, p3[2]],
    ];

    const UV = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ];

    for (let i = 0; i < 4; i++) {
      vertices.push(
        P[i][0],
        P[i][1],
        P[i][2],
        normal[0],
        normal[1],
        normal[2],
        UV[i][0],
        UV[i][1]
      );
    }

    indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
    indices.push(baseIndex, baseIndex + 2, baseIndex + 3);
  };

  //============================
  // 四个侧面（全部细分）
  //============================

  pushSubdividedFace(
    [-hw, 0 - hh, hd],
    [hw, 0 - hh, hd],
    [hw, h - hh, hd],
    [-hw, h - hh, hd],
    [0, 0, 1],
    segW,
    segH
  );

  pushSubdividedFace(
    [hw, 0 - hh, -hd],
    [-hw, 0 - hh, -hd],
    [-hw, h - hh, -hd],
    [hw, h - hh, -hd],
    [0, 0, -1],
    segW,
    segH
  );

  pushSubdividedFace(
    [hw, 0 - hh, hd],
    [hw, 0 - hh, -hd],
    [hw, h - hh, -hd],
    [hw, h - hh, hd],
    [1, 0, 0],
    segW,
    segH
  );

  pushSubdividedFace(
    [-hw, 0 - hh, -hd],
    [-hw, 0 - hh, hd],
    [-hw, h - hh, hd],
    [-hw, h - hh, -hd],
    [-1, 0, 0],
    segW,
    segH
  );

  //============================
  // 上下面（不细分）
  //============================

  pushSimpleFace(
    [-hw, h - hh, hd],
    [hw, h - hh, hd],
    [hw, h - hh, -hd],
    [-hw, h - hh, -hd],
    [0, 1, 0]
  );

  pushSimpleFace(
    [-hw, 0 - hh, -hd],
    [hw, 0 - hh, -hd],
    [hw, 0 - hh, hd],
    [-hw, 0 - hh, hd],
    [0, -1, 0]
  );

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  };
};

const Wall = createWall(40, 100, 1, 40, 40);
Wall.positionArray = [
  { x: 0, y: 0, z: 40 },
  { x: 40, y: 0, z: 0 },
  { x: -40, y: 0, z: 0 },
  { x: 0, y: 0, z: -40 },
  // { x: 0, y: 0, z: -20 },
];
Wall.scaleArray = [
  { x: 2, y: 1, z: 4 },//厚度调厚一点不会漏光
  { x: 1 / 20, y: 1, z: 80 },
  { x: 1 / 20, y: 1 / 4, z: 80 },
  { x: 2, y: 1, z: 4 },
  { x: 2, y: 1, z: 4 },
];
export { Wall };
