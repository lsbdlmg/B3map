const createRampTrapezoid = ({
  hl = 1,
  hw = 1,
  hh = 1,
  angleLeftDeg = 60,
  angleRightDeg = 30,
  slices = 20,
  repeat = { x: 1, y: 1, z: 1 },
  slopeAxis = "x",
} = {}) => {
  const vertices = [];
  const indices = [];
  const height = hh * 2;
  const angleLeftRad = (angleLeftDeg * Math.PI) / 180;
  const angleRightRad = (angleRightDeg * Math.PI) / 180;
  const shrinkLeft = height / Math.tan(angleLeftRad);
  const shrinkRight = height / Math.tan(angleRightRad);
  const minHalf = (shrinkLeft + shrinkRight) / 2;
  const yTop = hh;
  const yBottom = -hh;
  const pushVertex = (x, y, z, nx, ny, nz, u, v) => {
    vertices.push(x, y, z, nx, ny, nz, u, v);
  };
  const quad = (a, b, c, d) => {
    indices.push(a, b, c, a, c, d);
  };
  let vertexCount = 0;
  const buildSlopeX = () => {
    const fixedHl = hl < minHalf ? minHalf : hl;
    const topHalf = Math.max(0, fixedHl - (shrinkLeft + shrinkRight) / 2);
    const zFront = hw;
    const zBack = -hw;
    // 前面 (+Z)
    {
      const nx = 0, ny = 0, nz = 1;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const leftX = -fixedHl + shrinkLeft * ty;
        const rightX = fixedHl - shrinkRight * ty;
        const v = ty * repeat.y;
        for (let x = 0; x <= slices; x++) {
          const tx = x / slices;
          const px = leftX + (rightX - leftX) * tx;
          const u = tx * repeat.x;
          pushVertex(px, py, zFront, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let x = 0; x < slices; x++) {
          const a = start + y * row + x;
          const b = a + 1;
          const c = a + row + 1;
          const d = a + row;
          quad(a, b, c, d);
        }
      }
      vertexCount += row * row;
    }
    // 后面 (-Z)
    {
      const nx = 0, ny = 0, nz = -1;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const leftX = -fixedHl + shrinkLeft * ty;
        const rightX = fixedHl - shrinkRight * ty;
        const v = ty * repeat.y;
        for (let x = 0; x <= slices; x++) {
          const tx = x / slices;
          const px = leftX + (rightX - leftX) * tx;
          const u = tx * repeat.x;
          pushVertex(px, py, zBack, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let x = 0; x < slices; x++) {
          const a = start + y * row + x;
          const b = a + row;
          const c = a + row + 1;
          const d = a + 1;
          quad(a, b, c, d);
        }
      }
      vertexCount += row * row;
    }
    // 左右斜坡
    const leftSlopeLen = Math.hypot(height, shrinkLeft);
    const rightSlopeLen = Math.hypot(height, shrinkRight);
    const leftNx = -height / leftSlopeLen;
    const leftNy = shrinkLeft / leftSlopeLen;
    const rightNx = height / rightSlopeLen;
    const rightNy = shrinkRight / rightSlopeLen;
    // 右面 (+X)
    {
      const nx = rightNx, ny = rightNy, nz = 0;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const px = fixedHl - shrinkRight * ty;
        const v = ty * repeat.y;
        for (let z = 0; z <= slices; z++) {
          const tz = z / slices;
          const pz = zFront - tz * hw * 2;
          const u = tz * repeat.z;
          pushVertex(px, py, pz, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let z = 0; z < slices; z++) {
          const a = start + y * row + z;
          const b = a + 1;
          const c = a + row + 1;
          const d = a + row;
          quad(a, b, c, d);
        }
      }
      vertexCount += row * row;
    }
    // 左面 (-X)
    {
      const nx = leftNx, ny = leftNy, nz = 0;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const px = -fixedHl + shrinkLeft * ty;
        const v = ty * repeat.y;
        for (let z = 0; z <= slices; z++) {
          const tz = z / slices;
          const pz = zFront - tz * hw * 2;
          const u = tz * repeat.z;
          pushVertex(px, py, pz, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let z = 0; z < slices; z++) {
          const a = start + y * row + z;
          const b = a + row;
          const c = a + row + 1;
          const d = a + 1;
          quad(a, b, c, d);
        }
      }
      vertexCount += row * row;
    }
    // 顶面
    {
      const nx = 0, ny = 1, nz = 0;
      const start = vertexCount;
      const leftTop = -fixedHl + shrinkLeft;
      const rightTop = fixedHl - shrinkRight;
      for (let z = 0; z <= slices; z++) {
        for (let x = 0; x <= slices; x++) {
          const u = (x / slices) * repeat.x;
          const v = (z / slices) * repeat.z;
          const px = leftTop + ((rightTop - leftTop) * x) / slices;
          const pz = zFront - (z / slices) * hw * 2;
          pushVertex(px, yTop, pz, nx, ny, nz, u, v);
        }
      }
      for (let z = 0; z < slices; z++) {
        for (let x = 0; x < slices; x++) {
          const a = start + z * (slices + 1) + x;
          const b = a + 1;
          const c = a + slices + 2;
          const d = a + slices + 1;
          quad(a, b, c, d);
        }
      }
      vertexCount += (slices + 1) * (slices + 1);
    }
    // 底面
    {
      const nx = 0, ny = -1, nz = 0;
      const start = vertexCount;
      for (let z = 0; z <= slices; z++) {
        for (let x = 0; x <= slices; x++) {
          const u = (x / slices) * repeat.x;
          const v = (z / slices) * repeat.z;
          const px = -fixedHl + (x / slices) * fixedHl * 2;
          const pz = zBack + (z / slices) * hw * 2;
          pushVertex(px, yBottom, pz, nx, ny, nz, u, v);
        }
      }
      for (let z = 0; z < slices; z++) {
        for (let x = 0; x < slices; x++) {
          const a = start + z * (slices + 1) + x;
          const b = a + slices + 1;
          const c = a + slices + 2;
          const d = a + 1;
          quad(a, d, c, b);
        }
      }
      vertexCount += (slices + 1) * (slices + 1);
    }
    return {
      fixedHl,
      fixedHw: hw,
      topHalf,
    };
  };
  const buildSlopeZ = () => {
    const fixedHw = hw < minHalf ? minHalf : hw;
    const topHalf = Math.max(0, fixedHw - (shrinkLeft + shrinkRight) / 2);
    const xRight = hl;
    const xLeft = -hl;
    // 右面 (+X)
    {
      const nx = 1, ny = 0, nz = 0;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const backZ = -fixedHw + shrinkLeft * ty;
        const frontZ = fixedHw - shrinkRight * ty;
        const v = ty * repeat.y;
        for (let z = 0; z <= slices; z++) {
          const tz = z / slices;
          const pz = backZ + (frontZ - backZ) * tz;
          const u = tz * repeat.z;
          pushVertex(xRight, py, pz, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let z = 0; z < slices; z++) {
          const a = start + y * row + z;
          const b = a + row;
          const c = a + row + 1;
          const d = a + 1;
          quad(a, b, c, d);
        }
      }
      vertexCount += row * row;
    }
    // 左面 (-X)
    {
      const nx = -1, ny = 0, nz = 0;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const backZ = -fixedHw + shrinkLeft * ty;
        const frontZ = fixedHw - shrinkRight * ty;
        const v = ty * repeat.y;
        for (let z = 0; z <= slices; z++) {
          const tz = z / slices;
          const pz = backZ + (frontZ - backZ) * tz;
          const u = tz * repeat.z;
          pushVertex(xLeft, py, pz, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let z = 0; z < slices; z++) {
          const a = start + y * row + z;
          const b = a + 1;
          const c = a + row + 1;
          const d = a + row;
          quad(a, b, c, d);
        }
      }
      vertexCount += row * row;
    }
    // 前后斜坡
    const leftSlopeLen = Math.hypot(height, shrinkLeft);
    const rightSlopeLen = Math.hypot(height, shrinkRight);
    const backNz = -height / leftSlopeLen;
    const backNy = shrinkLeft / leftSlopeLen;
    const frontNz = height / rightSlopeLen;
    const frontNy = shrinkRight / rightSlopeLen;
    // 前面 (+Z)
    {
      const nx = 0, ny = frontNy, nz = frontNz;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const pz = fixedHw - shrinkRight * ty;
        const v = ty * repeat.y;
        for (let x = 0; x <= slices; x++) {
          const tx = x / slices;
          const px = xLeft + (xRight - xLeft) * tx;
          const u = tx * repeat.x;
          pushVertex(px, py, pz, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let x = 0; x < slices; x++) {
          const a = start + y * row + x;
          const b = a + row;
          const c = a + row + 1;
          const d = a + 1;
          quad(a, d, c, b);
        }
      }
      vertexCount += row * row;
    }
    // 后面 (-Z)
    {
      const nx = 0, ny = backNy, nz = backNz;
      const start = vertexCount;
      for (let y = 0; y <= slices; y++) {
        const ty = y / slices;
        const py = yBottom + ty * height;
        const pz = -fixedHw + shrinkLeft * ty;
        const v = ty * repeat.y;
        for (let x = 0; x <= slices; x++) {
          const tx = x / slices;
          const px = xLeft + (xRight - xLeft) * tx;
          const u = tx * repeat.x;
          pushVertex(px, py, pz, nx, ny, nz, u, v);
        }
      }
      const row = slices + 1;
      for (let y = 0; y < slices; y++) {
        for (let x = 0; x < slices; x++) {
          const a = start + y * row + x;
          const b = a + 1;
          const c = a + row + 1;
          const d = a + row;
          quad(a, d, c, b);
        }
      }
      vertexCount += row * row;
    }
    // 顶面
    {
      const nx = 0, ny = 1, nz = 0;
      const start = vertexCount;
      const backTop = -fixedHw + shrinkLeft;
      const frontTop = fixedHw - shrinkRight;
      for (let z = 0; z <= slices; z++) {
        for (let x = 0; x <= slices; x++) {
          const u = (x / slices) * repeat.x;
          const v = (z / slices) * repeat.z;
          const px = xLeft + ((xRight - xLeft) * x) / slices;
          const pz = backTop + ((frontTop - backTop) * z) / slices;
          pushVertex(px, yTop, pz, nx, ny, nz, u, v);
        }
      }
      for (let z = 0; z < slices; z++) {
        for (let x = 0; x < slices; x++) {
          const a = start + z * (slices + 1) + x;
          const b = a + 1;
          const c = a + slices + 2;
          const d = a + slices + 1;
          quad(a, d, c, b);
        }
      }
      vertexCount += (slices + 1) * (slices + 1);
    }
    // 底面
    {
      const nx = 0, ny = -1, nz = 0;
      const start = vertexCount;
      for (let z = 0; z <= slices; z++) {
        for (let x = 0; x <= slices; x++) {
          const u = (x / slices) * repeat.x;
          const v = (z / slices) * repeat.z;
          const px = xLeft + (x / slices) * (xRight - xLeft);
          const pz = -fixedHw + (z / slices) * fixedHw * 2;
          pushVertex(px, yBottom, pz, nx, ny, nz, u, v);
        }
      }
      for (let z = 0; z < slices; z++) {
        for (let x = 0; x < slices; x++) {
          const a = start + z * (slices + 1) + x;
          const b = a + slices + 1;
          const c = a + slices + 2;
          const d = a + 1;
          quad(a, d, c, b);
        }
      }
      vertexCount += (slices + 1) * (slices + 1);
    }
    return {
      fixedHl: hl,
      fixedHw,
      topHalf,
    };
  };
  const info = slopeAxis === "z" ? buildSlopeZ() : buildSlopeX();
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
    ...info,
  };
};
export { createRampTrapezoid };
