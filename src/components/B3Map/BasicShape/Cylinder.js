const createCylinder = ({
    radiusTop = 1,
    radiusBottom = 1,
    height = 1,
    radialSegments = 32,
    heightSegments = 1,
    openEnded = false,
    thetaStart = 0,
    thetaLength = Math.PI * 2,
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
                0, 0 // uv mapping for cap not detailed here
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

    return {
        vertices: new Float32Array(vertices),
        indices: new Uint16Array(indices),
    }
}

export { createCylinder }
