const createCube = ({
  hw = 1,
  hh = 1,
  hd = 1,
  slices = 20,
  repeat = { x: 1, y: 1, z: 1 }, // X/Y/Z 三个方向重复次数
}) => {
  slices = 3
  const vertices = []
  const indices = []
  function pushVertex(x, y, z, nx, ny, nz, u, v) {
    vertices.push(x, y, z, nx, ny, nz, u, v)
  }
  function quad(a, b, c, d) {
    indices.push(a, b, c, a, c, d)
  }
  let vertexCount = 0
  // 1. 四个侧面（UV 重复）
  const sideDefs = [
    { x1: -hw, z1: hd, x2: hw, z2: hd, nx: 0, ny: 0, nz: 1, repeatU: repeat.x }, // 前
    { x1: hw, z1: -hd, x2: -hw, z2: -hd, nx: 0, ny: 0, nz: -1, repeatU: repeat.x }, // 后
    { x1: hw, z1: hd, x2: hw, z2: -hd, nx: 1, ny: 0, nz: 0, repeatU: repeat.z }, // 右
    { x1: -hw, z1: -hd, x2: -hw, z2: hd, nx: -1, ny: 0, nz: 0, repeatU: repeat.z }, // 左
  ]
  for (const side of sideDefs) {
    const start = vertexCount
    for (let y = 0; y <= slices; y++) {
      const ty = y / slices
      const py = -hh + ty * hh * 2
      const v = ty * repeat.y
      for (let x = 0; x <= slices; x++) {
        const tx = x / slices
        const u = tx * side.repeatU
        const px = side.x1 + (side.x2 - side.x1) * tx
        const pz = side.z1 + (side.z2 - side.z1) * tx
        pushVertex(px, py, pz, side.nx, side.ny, side.nz, u, v)
      }
    }
    const row = slices + 1
    for (let y = 0; y < slices; y++) {
      for (let x = 0; x < slices; x++) {
        const a = start + y * row + x
        const b = a + 1
        const c = a + row + 1
        const d = a + row
        quad(a, b, c, d)
      }
    }
    vertexCount += row * row
  }
  // 2. 顶面 (Y = +hh)
  const topY = hh
  const topStart = vertexCount
  for (let z = 0; z <= slices; z++) {
    for (let x = 0; x <= slices; x++) {
      const u = (x / slices) * repeat.x
      const v = (z / slices) * repeat.z
      const px = -hw + (x / slices) * hw * 2
      const pz = hd - (z / slices) * hd * 2

      pushVertex(px, topY, pz, 0, 1, 0, u, v)
    }
  }
  for (let z = 0; z < slices; z++) {
    for (let x = 0; x < slices; x++) {
      const a = topStart + z * (slices + 1) + x
      const b = a + 1
      const c = a + slices + 2
      const d = a + slices + 1
      quad(a, b, c, d) // 顶面朝上
    }
  }
  vertexCount += (slices + 1) * (slices + 1)
  // 3. 底面 (Y = -hh)
  const botY = -hh
  const botStart = vertexCount
  for (let z = 0; z <= slices; z++) {
    for (let x = 0; x <= slices; x++) {
      const u = (x / slices) * repeat.x
      const v = (z / slices) * repeat.z
      const px = -hw + (x / slices) * hw * 2
      const pz = -hd + (z / slices) * hd * 2
      pushVertex(px, botY, pz, 0, -1, 0, u, v)
    }
  }
  for (let z = 0; z < slices; z++) {
    for (let x = 0; x < slices; x++) {
      const a = botStart + z * (slices + 1) + x
      const b = a + slices + 1
      const c = a + slices + 2
      const d = a + 1
      quad(a, d, c, b) // 朝 -Y
    }
  }
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  }
}
export { createCube }
