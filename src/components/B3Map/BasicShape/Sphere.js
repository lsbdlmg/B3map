const createSphere = (radius = 1, latSegments = 32, lonSegments = 32) => {
  //latSegments 纬线段数 lonSegments 经线段数
  const vertices = []
  const indices = []

  for (let y = 0; y <= latSegments; y++) {
    const v = y / latSegments
    const theta = v * Math.PI
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    for (let x = 0; x <= lonSegments; x++) {
      const u = x / lonSegments
      const phi = u * Math.PI * 2
      const sinPhi = Math.sin(phi)
      const cosPhi = Math.cos(phi)

      const vx = radius * sinTheta * cosPhi
      const vy = radius * cosTheta
      const vz = radius * sinTheta * sinPhi

      // pos + normal + uv
      vertices.push(
        vx,
        vy,
        vz, // position
        vx / radius,
        vy / radius,
        vz / radius, // normal (球心指向顶点)
        u,
        v, // uv
      )
    }
  }

  for (let y = 0; y < latSegments; y++) {
    for (let x = 0; x < lonSegments; x++) {
      const a = y * (lonSegments + 1) + x
      const b = a + lonSegments + 1
      indices.push(a, b, a + 1)
      indices.push(b, b + 1, a + 1)
    }
  }

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  }
}
export { createSphere }
