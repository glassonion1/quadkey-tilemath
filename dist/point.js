"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointToBoundingBox = exports.pointToQuadkey = exports.pointToTile = exports.truncatePoint = void 0;
const tile_1 = require("./tile");
const MIN_LATITUDE = -85.05112878;
const MAX_LATITUDE = 85.05112878;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;
const clip = (n, minValue, maxValue) => {
    return Math.min(Math.max(n, minValue), maxValue);
};
const toTileNum = (val, zoom) => {
    const EPSILON = 1e-14;
    const z2 = Math.pow(2, zoom);
    if (val <= 0) {
        return 0;
    }
    if (val >= 1) {
        return Math.trunc(z2 - 1);
    }
    // 0 < val < 1
    // To address loss of precision in round-tripping between tile
    // and lng/lat, points within EPSILON of the right side of a tile
    // are counted in the next tile over.
    return Math.trunc(Math.floor((val + EPSILON) * z2));
};
const truncatePoint = (lng, lat) => {
    const longitude = clip(lng, MIN_LONGITUDE, MAX_LONGITUDE);
    const latitude = clip(lat, MIN_LATITUDE, MAX_LATITUDE);
    return [longitude, latitude];
};
exports.truncatePoint = truncatePoint;
/**
 * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns Tiel XY coordinates.
 */
const pointToTile = (lng, lat, zoom) => {
    const [longitude, latitude] = (0, exports.truncatePoint)(lng, lat);
    const x = (longitude + 180) / 360;
    const sinLatitude = Math.sin((latitude * Math.PI) / 180);
    const y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
    const tileX = toTileNum(x, zoom);
    const tileY = toTileNum(y, zoom);
    return { tileX: tileX, tileY: tileY };
};
exports.pointToTile = pointToTile;
/**
 * Converts a geospatial coordinate coordinates into a quadkey at a specified level of detail.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
const pointToQuadkey = (lng, lat, zoom) => {
    const tile = (0, exports.pointToTile)(lng, lat, zoom);
    return (0, tile_1.tileToQuadkey)(tile.tileX, tile.tileY, zoom);
};
exports.pointToQuadkey = pointToQuadkey;
/**
 * Calculates the bounding box of a geospatial coordinate coordinates.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box of the tile.
 */
const pointToBoundingBox = (lng, lat, zoom) => {
    const tile = (0, exports.pointToTile)(lng, lat, zoom);
    return (0, tile_1.tileToBoundingBox)(tile.tileX, tile.tileY, zoom);
};
exports.pointToBoundingBox = pointToBoundingBox;
