import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createCylinder } from '@/components/B3Map/BasicShape/Cylinder'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = ({
  Objects,
  device,
  world,
  RAPIER,
  TableAttribute = {
    position: { x: 0, y: 4, z: 0 },
    length: 10,
    width: 10,
    height: 7,
    topTextureIndex: 105,
    legTextureIndex: 103,
  },
} = {}) => {
  if (!Objects || !device || !world || !RAPIER) return

  const position = TableAttribute.position || { x: 0, y: 4, z: 0 }
  const length = TableAttribute.length ?? 10
  const width = TableAttribute.width ?? 10
  const height = TableAttribute.height ?? 7
  const topTextureIndex = TableAttribute.topTextureIndex ?? 105
  const legTextureIndex = TableAttribute.legTextureIndex ?? 103

  const tabletopThickness = 0.8
  const legHeight = height
  const legRadius = 0.45
  const legOffsetX = width / 2 - legRadius
  const legOffsetZ = length / 2 - legRadius
  const tabletopBottomY = position.y - tabletopThickness / 2
  const legCenterY = tabletopBottomY - legHeight / 2

  {
    const TableTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 10, repeat: { x: 1, y: 1, z: 1 } })
    const tableTop = createGeometry(device, TableTop.vertices, TableTop.indices)
    TableTop.positionArray = [{ x: position.x, y: position.y, z: position.z }]
    TableTop.rotationArray = [{ x: 0, y: 0, z: 0 }]
    TableTop.scaleArray = [{ x: width / 2, y: tabletopThickness / 2, z: length / 2 }]
    TableTop.textureIndex = [topTextureIndex]
    createRigidBodies(TableTop.vertices, TableTop.indices, TableTop.positionArray, TableTop.scaleArray, TableTop.rotationArray, world, RAPIER)
    Objects.push({ Object: TableTop, object: tableTop })
  }

  {
    const TableLeg = createCylinder({ radiusTop: 1, radiusBottom: 1, height: 1, radialSegments: 16 })
    const tableLeg = createGeometry(device, TableLeg.vertices, TableLeg.indices)
    TableLeg.positionArray = [
      { x: position.x - legOffsetX, y: legCenterY, z: position.z - legOffsetZ },
      { x: position.x + legOffsetX, y: legCenterY, z: position.z - legOffsetZ },
      { x: position.x - legOffsetX, y: legCenterY, z: position.z + legOffsetZ },
      { x: position.x + legOffsetX, y: legCenterY, z: position.z + legOffsetZ },
    ]
    TableLeg.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    TableLeg.scaleArray = new Array(4).fill({ x: legRadius, y: legHeight, z: legRadius })
    TableLeg.textureIndex = new Array(4).fill(legTextureIndex)
    createRigidBodies(TableLeg.vertices, TableLeg.indices, TableLeg.positionArray, TableLeg.scaleArray, TableLeg.rotationArray, world, RAPIER)
    Objects.push({ Object: TableLeg, object: tableLeg })
  }
}

export default create
