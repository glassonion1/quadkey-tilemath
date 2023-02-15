import { quadkeyToPoint, quadkeyToCentroidPoint } from './quadkey'
import { pointToQuadkey, pointToBoundingBox } from './point'
import { getQuadkeysInBoundingBox } from './bbox'

const tileMath = {
  pointToQuadkey: pointToQuadkey,
  pointToBoundingBox: pointToBoundingBox,
  quadkeyToPoint: quadkeyToPoint,
  quadkeyToCentroidPoint: quadkeyToCentroidPoint,
  getQuadkeysInBoundingBox: getQuadkeysInBoundingBox
} as const

export default tileMath
