import { quadkeyToPoint, quadkeyToCentroidPoint } from './quadkey';
import { pointToQuadkey, pointToBoundingBox } from './point';
import { getQuadkeysInBoundingBox } from './bbox';
const tileMath = {
    pointToQuadkey: pointToQuadkey,
    pointToBoundingBox: pointToBoundingBox,
    quadkeyToPoint: quadkeyToPoint,
    quadkeyToCentroidPoint: quadkeyToCentroidPoint,
    getQuadkeysInBoundingBox: getQuadkeysInBoundingBox
};
export default tileMath;
