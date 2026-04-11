import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const createPart = (device, world, RAPIER, Objects, definition) => {
  const mesh = createCube({ hw: 1, hh: 1, hd: 1, slices: 10, repeat: { x: 1, y: 1, z: 1 } })
  const geometry = createGeometry(device, mesh.vertices, mesh.indices)

  mesh.positionArray = [definition.position]
  mesh.rotationArray = [definition.rotation]
  mesh.scaleArray = [definition.scale]
  mesh.textureIndex = [definition.textureIndex]

  createRigidBodies(mesh.vertices, mesh.indices, mesh.positionArray, mesh.scaleArray, mesh.rotationArray, world, RAPIER)
  Objects.push({ Object: mesh, object: geometry })
}

const create = ({
  Objects,
  device,
  world,
  RAPIER,
  ChairAttribute = {
    position: { x: 0, y: 3.4, z: 0 },
  },
} = {}) => {
  if (!Objects || !device || !world || !RAPIER) return

  const position = ChairAttribute.position || { x: 0, y: 3.4, z: 0 }
  const seatWidth = 5
  const seatDepth = 5
  const seatThickness = 0.8
  const legThickness = 0.5
  const legHeight = 5
  const barHeight = 3.6
  const barThickness = 0.35
  const legOffsetX = seatWidth / 2 - legThickness / 2
  const legOffsetZ = seatDepth / 2 - legThickness / 2

  createPart(device, world, RAPIER, Objects, {
    position: { x: position.x, y: position.y, z: position.z },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: seatWidth / 2, y: seatThickness / 2, z: seatDepth / 2 },
    textureIndex: 108,
  })

    ;[
      { x: -legOffsetX, z: -legOffsetZ },
      { x: legOffsetX, z: -legOffsetZ },
      { x: -legOffsetX, z: legOffsetZ },
      { x: legOffsetX, z: legOffsetZ },
    ].forEach(({ x, z }) => {
      createPart(device, world, RAPIER, Objects, {
        position: { x: position.x + x, y: position.y - seatThickness / 2 - legHeight / 2, z: position.z + z },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: legThickness / 2, y: legHeight / 2, z: legThickness / 2 },
        textureIndex: 108,
      })
    })

  createPart(device, world, RAPIER, Objects, {
    position: { x: position.x, y: position.y - seatThickness / 2 - barHeight, z: position.z - legOffsetZ },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: (seatWidth - legThickness) / 2, y: barThickness / 2, z: barThickness / 2 },
    textureIndex: 108,
  })

  createPart(device, world, RAPIER, Objects, {
    position: { x: position.x, y: position.y - seatThickness / 2 - barHeight, z: position.z + legOffsetZ },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: (seatWidth - legThickness) / 2, y: barThickness / 2, z: barThickness / 2 },
    textureIndex: 108,
  })

  createPart(device, world, RAPIER, Objects, {
    position: { x: position.x - legOffsetX, y: position.y - seatThickness / 2 - barHeight, z: position.z },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: barThickness / 2, y: barThickness / 2, z: (seatDepth - legThickness) / 2 },
    textureIndex: 108,
  })

  createPart(device, world, RAPIER, Objects, {
    position: { x: position.x + legOffsetX, y: position.y - seatThickness / 2 - barHeight, z: position.z },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: barThickness / 2, y: barThickness / 2, z: (seatDepth - legThickness) / 2 },
    textureIndex: 108,
  })
}

export default create
