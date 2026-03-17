const createSemiCylinder = ({
  radiusTop = 1,
  radiusBottom = 1,
  height = 1,
  radialSegments = 32,
  heightSegments = 1,
  openEnded = false,
  thetaStart = 0,
  thetaLength = Math.PI * 2,
  axis = 'y',
}) => {
  radialSegments = Math.floor(radialSegments)
  heightSegments = Math.floor(heightSegments)

  const indices = []
  const vertices = []

  let index = 0
  const indexArray = []
  const halfHeight = height / 2

  generateTorso()

  if (openEnded === false) {
    if (radiusTop > 0) generateCap(true)
    if (radiusBottom > 0) generateCap(false)
    if (thetaLength < Math.PI * 2) generateRadialPlanes()
  }

  function generateTorso() {
    const normal = { x: 0, y: 0, z: 0 }
    const vertex = { x: 0, y: 0, z: 0 }

    const slope = (radiusBottom - radiusTop) / height

    for (let y = 0; y <= heightSegments; y++) {
      const indexRow = []
      const v = y / heightSegments
      const radius = v * (radiusBottom - radiusTop) + radiusTop

      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments
        const theta = u * thetaLength + thetaStart
        const sinTheta = Math.sin(theta)
        const cosTheta = Math.cos(theta)

        vertex.x = radius * sinTheta
        vertex.y = -v * height + halfHeight
        vertex.z = radius * cosTheta

        normal.x = sinTheta
        normal.y = slope
        normal.z = cosTheta
        // normalize
        const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z)
        normal.x /= length
        normal.y /= length
        normal.z /= length

        vertices.push(
          vertex.x, vertex.y, vertex.z,
          normal.x, normal.y, normal.z,
          u, 1 - v
        )

        indexRow.push(index++)
      }
      indexArray.push(indexRow)
    }

    for (let x = 0; x < radialSegments; x++) {
      for (let y = 0; y < heightSegments; y++) {
        const a = indexArray[y][x]
        const b = indexArray[y + 1][x]
        const c = indexArray[y + 1][x + 1]
        const d = indexArray[y][x + 1]

        indices.push(a, b, d)
        indices.push(b, c, d)
      }
    }
  }

  function generateCap(top) {
    let centerIndexStart, centerIndexEnd
    const radius = top === true ? radiusTop : radiusBottom
    const sign = top === true ? 1 : -1

    centerIndexStart = index

    for (let x = 1; x <= radialSegments; x++) {
      vertices.push(0, halfHeight * sign, 0, 0, sign, 0, 0, 0) // center
      index++
    }
    centerIndexEnd = index

    for (let x = 0; x <= radialSegments; x++) {
      const u = x / radialSegments
      const theta = u * thetaLength + thetaStart
      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta)

      vertices.push(
        radius * sinTheta,
        halfHeight * sign,
        radius * cosTheta,
        0, sign, 0,
        0, 0
      )
      index++
    }

    for (let x = 0; x < radialSegments; x++) {
      const c = centerIndexStart + x
      const i = centerIndexEnd + x

      if (top === true) {
        indices.push(i, i + 1, c)
      } else {
        indices.push(i + 1, i, c)
      }
    }
  }

  function generateRadialPlanes() {
    // Generate two rectangular faces to close the cylinder segment
    // Face 1: At thetaStart
    generatePlane(thetaStart, true)
    // Face 2: At thetaStart + thetaLength
    generatePlane(thetaStart + thetaLength, false)
  }

  function generatePlane(theta, isStart) {
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    // Normal for the plane
    // Tangent follows circle. Start face normal opposes tangent. End face normal follows tangent?
    // Let's just calculate cross product or logical direction.
    // Start face normal points into -Tangent direction?
    // Vector from Center to Rim: (sin, 0, cos). Up: (0, 1, 0).
    // Cross(Up, R) = (cos, 0, -sin).
    // Start face is on the "left" of the arbitrary start line?
    // Let's rely on standard winding.

    let nx, nz
    if (isStart) {
      // Normal points "out" from the cut. At start, that is roughly -Tangent.
      nx = -cosTheta
      nz = sinTheta
    } else {
      // At end, normal points +Tangent.
      nx = cosTheta
      nz = -sinTheta
    }

    // 4 Vertices:
    // Top Center (0, h/2, 0)
    // Top Rim (rTop*sin, h/2, rTop*cos)
    // Bottom Rim (rBot*sin, -h/2, rBot*cos)
    // Bottom Center (0, -h/2, 0)

    // Indices need to be counter-clockwise relative to normal.

    const i1 = index
    const i2 = index + 1
    const i3 = index + 2
    const i4 = index + 3

    // Push vertices
    // 1. Top Center
    vertices.push(0, halfHeight, 0, nx, 0, nz, 0, 1) // UV dummy
    // 2. Top Rim
    vertices.push(radiusTop * sinTheta, halfHeight, radiusTop * cosTheta, nx, 0, nz, 1, 1)
    // 3. Bottom Rim
    vertices.push(radiusBottom * sinTheta, -halfHeight, radiusBottom * cosTheta, nx, 0, nz, 1, 0)
    // 4. Bottom Center
    vertices.push(0, -halfHeight, 0, nx, 0, nz, 0, 0)

    index += 4

    if (isStart) {
      // Winding order for visible face
      indices.push(i1, i4, i2)
      indices.push(i2, i4, i3)
    } else {
      indices.push(i1, i2, i4)
      indices.push(i2, i3, i4)
    }
  }

  if (axis === 'x' || axis === 'z') {
    const vCount = vertices.length / 8
    for (let i = 0; i < vCount; i++) {
      const x = vertices[i * 8]
      const y = vertices[i * 8 + 1]
      const z = vertices[i * 8 + 2]
      const nx = vertices[i * 8 + 3]
      const ny = vertices[i * 8 + 4]
      const nz = vertices[i * 8 + 5]

      if (axis === 'x') {
        // Rotate -90 around Z: x' = y, y' = -x, z' = z
        vertices[i * 8] = y
        vertices[i * 8 + 1] = -x
        vertices[i * 8 + 2] = z
        vertices[i * 8 + 3] = ny
        vertices[i * 8 + 4] = -nx
        vertices[i * 8 + 5] = nz
      } else if (axis === 'z') {
        // Rotate 90 around X: x' = x, y' = -z, z' = y
        vertices[i * 8] = x
        vertices[i * 8 + 1] = -z
        vertices[i * 8 + 2] = y
        vertices[i * 8 + 3] = nx
        vertices[i * 8 + 4] = -nz
        vertices[i * 8 + 5] = ny
      }
    }
  }

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  }
}

export { createSemiCylinder }
