"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quadkey_1 = require("./quadkey");
const point_1 = require("./point");
const bbox_1 = require("./bbox");
const tileMath = {
    pointToQuadkey: point_1.pointToQuadkey,
    pointToBoundingBox: point_1.pointToBoundingBox,
    quadkeyToPoint: quadkey_1.quadkeyToPoint,
    quadkeyToCentroidPoint: quadkey_1.quadkeyToCentroidPoint,
    getQuadkeysInBoundingBox: bbox_1.getQuadkeysInBoundingBox
};
exports.default = tileMath;
