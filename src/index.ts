export {
  pointToQuadKey,
  quadkeyToPoint,
  quadKeyToCentroidPoint,
  pointToBoundingBox
} from './quadkey'

import {
  pointToQuadKey,
  quadkeyToPoint,
  quadKeyToCentroidPoint,
  pointToBoundingBox
} from './quadkey'

const tileMath = {
  pointToQuadKey: pointToQuadKey,
  quadkeyToPoint: quadkeyToPoint,
  quadKeyToCentroidPoint: quadKeyToCentroidPoint,
  pointToBoundingBox: pointToBoundingBox
} as const

export default tileMath
