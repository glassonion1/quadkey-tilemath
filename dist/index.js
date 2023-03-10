"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quadkey_1 = require("./quadkey");
const point_1 = require("./point");
const bbox_1 = require("./bbox");
const web_mercator_1 = require("./web_mercator");
const tileMath = {
    pointToQuadkey: point_1.pointToQuadkey,
    pointToBoundingBox: point_1.pointToBoundingBox,
    quadkeyToPoint: quadkey_1.quadkeyToPoint,
    quadkeyToBoundingBox: quadkey_1.quadkeyToBoundingBox,
    getQuadkeysInBoundingBox: bbox_1.getQuadkeysInBoundingBox,
    pointToWebMercator: web_mercator_1.pointToWebMercator,
    webMercatorToPoint: web_mercator_1.webMercatorToPoint
};
exports.default = tileMath;
