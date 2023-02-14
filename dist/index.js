"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointToBoundingBox = exports.quadKeyToCentroidPoint = exports.quadkeyToPoint = exports.pointToQuadKey = void 0;
var quadkey_1 = require("./quadkey");
Object.defineProperty(exports, "pointToQuadKey", { enumerable: true, get: function () { return quadkey_1.pointToQuadKey; } });
Object.defineProperty(exports, "quadkeyToPoint", { enumerable: true, get: function () { return quadkey_1.quadkeyToPoint; } });
Object.defineProperty(exports, "quadKeyToCentroidPoint", { enumerable: true, get: function () { return quadkey_1.quadKeyToCentroidPoint; } });
Object.defineProperty(exports, "pointToBoundingBox", { enumerable: true, get: function () { return quadkey_1.pointToBoundingBox; } });
const quadkey_2 = require("./quadkey");
const tileMath = {
    pointToQuadKey: quadkey_2.pointToQuadKey,
    quadkeyToPoint: quadkey_2.quadkeyToPoint,
    quadKeyToCentroidPoint: quadkey_2.quadKeyToCentroidPoint,
    pointToBoundingBox: quadkey_2.pointToBoundingBox
};
exports.default = tileMath;
