import { quadkeyToPoint, quadkeyToBoundingBox } from './quadkey'
import { pointToQuadkey, pointToBoundingBox } from './point'
import { getQuadkeysInBoundingBox } from './bbox'
import { pointToWebMercator, webMercatorToPoint } from './web_mercator'

const tileMath = {
  pointToQuadkey: pointToQuadkey,
  pointToBoundingBox: pointToBoundingBox,
  quadkeyToPoint: quadkeyToPoint,
  quadkeyToBoundingBox: quadkeyToBoundingBox,
  getQuadkeysInBoundingBox: getQuadkeysInBoundingBox,
  pointToWebMercator: pointToWebMercator,
  webMercatorToPoint: webMercatorToPoint
} as const

export default tileMath
