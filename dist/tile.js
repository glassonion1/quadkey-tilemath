"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tileToBoundingBox = exports.tileToQuadkey = exports.tileToPoint = void 0;
const model_1 = require("./model");
/**
 * Converts tile XY coordinates into a point at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A point value(west, north).
 */
const tileToPoint = (tileX, tileY, zoom) => {
    const z2 = Math.pow(2, zoom);
    const lng = (tileX / z2) * 360.0 - 180.0;
    const latRadian = Math.atan(Math.sinh(Math.PI * (1 - (2 * tileY) / z2)));
    const lat = (0, model_1.radiansToDegrees)(latRadian);
    return { lng: lng, lat: lat };
};
exports.tileToPoint = tileToPoint;
/**
 * Converts tile XY coordinates into a quadkey at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
const tileToQuadkey = (tileX, tileY, zoom) => {
    const quadkey = [];
    for (let i = zoom; i > 0; i--) {
        let digit = 0;
        const mask = 1 << (i - 1);
        if ((tileX & mask) != 0) {
            digit++;
        }
        if ((tileY & mask) != 0) {
            digit += 2;
        }
        quadkey.push(digit);
    }
    return quadkey.join('');
};
exports.tileToQuadkey = tileToQuadkey;
/**
 * Calculates the bounding box of a tile.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box.
 */
const tileToBoundingBox = (tileX, tileY, zoom) => {
    const wn = (0, exports.tileToPoint)(tileX, tileY, zoom);
    const es = (0, exports.tileToPoint)(tileX + 1, tileY + 1, zoom);
    // Tile coordinates are top left, map coordinates are bottom left
    return { west: wn.lng, south: es.lat, east: es.lng, north: wn.lat };
};
exports.tileToBoundingBox = tileToBoundingBox;
