export type { Point, Bbox, Tile, WebMercator } from './types'

export { quadkeyToPoint, quadkeyToBoundingBox } from './quadkey'
export { pointToQuadkey, pointToBoundingBox } from './point'
export { getQuadkeysInBoundingBox } from './bbox'
export { pointToWebMercator, webMercatorToPoint } from './web_mercator'

import { quadkeyToPoint, quadkeyToBoundingBox } from './quadkey'
import { pointToQuadkey, pointToBoundingBox } from './point'
import { getQuadkeysInBoundingBox } from './bbox'
import { pointToWebMercator, webMercatorToPoint } from './web_mercator'

export const tileMath = {
  pointToQuadkey: pointToQuadkey,
  pointToBoundingBox: pointToBoundingBox,
  quadkeyToPoint: quadkeyToPoint,
  quadkeyToBoundingBox: quadkeyToBoundingBox,
  getQuadkeysInBoundingBox: getQuadkeysInBoundingBox,
  pointToWebMercator: pointToWebMercator,
  webMercatorToPoint: webMercatorToPoint
} as const
