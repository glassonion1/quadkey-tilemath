import { quadkeyToPoint, quadkeyToBoundingBox } from './quadkey';
import { pointToQuadkey, pointToBoundingBox } from './point';
import { getQuadkeysInBoundingBox } from './bbox';
const tileMath = {
    pointToQuadkey: pointToQuadkey,
    pointToBoundingBox: pointToBoundingBox,
    quadkeyToPoint: quadkeyToPoint,
    quadkeyToBoundingBox: quadkeyToBoundingBox,
    getQuadkeysInBoundingBox: getQuadkeysInBoundingBox
};
export default tileMath;
