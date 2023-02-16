import { quadkeyToPoint } from './quadkey'
import { pointToQuadkey, pointToBoundingBox } from './point'
import { getQuadkeysInBoundingBox } from './bbox'

const tileMath = {
  pointToQuadkey: pointToQuadkey,
  pointToBoundingBox: pointToBoundingBox,
  quadkeyToPoint: quadkeyToPoint,
  getQuadkeysInBoundingBox: getQuadkeysInBoundingBox
} as const

export default tileMath
