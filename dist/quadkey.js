"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadkeyToPoint = exports.quadkeyToBoundingBox = exports.quadkeyToTile = void 0;
const tile_1 = require("./tile");
/**
 * Converts a quadkey into tile XY coordinates.
 * @param quadkey Quadkey of the tile.
 * @returns Tile XY cocorindates for the specified quadkey.
 */
const quadkeyToTile = (quadkey) => {
    let tileX = 0;
    let tileY = 0;
    const zoom = quadkey.length;
    for (let i = zoom; i > 0; i--) {
        const mask = 1 << (i - 1);
        switch (quadkey[zoom - i]) {
            case '0':
                break;
            case '1':
                tileX |= mask;
                break;
            case '2':
                tileY |= mask;
                break;
            case '3':
                tileX |= mask;
                tileY |= mask;
                break;
            default:
                throw new Error('Invalid Quadkey digit sequence.');
        }
    }
    return {
        tileX: tileX,
        tileY: tileY
    };
};
exports.quadkeyToTile = quadkeyToTile;
/**
 * Calculates the bounding box of a quadkey.
 * @param quadkey Quadkey of the tile.
 * @returns A bounding box of the tile.
 */
const quadkeyToBoundingBox = (quadkey) => {
    const tile = (0, exports.quadkeyToTile)(quadkey);
    return (0, tile_1.tileToBoundingBox)(tile.tileX, tile.tileY, quadkey.length);
};
exports.quadkeyToBoundingBox = quadkeyToBoundingBox;
/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @param anchorX - anchor point of longitude
 * @param anchorY - anchor point of latitude
 * @returns A point value(west, south).
 */
const quadkeyToPoint = (quadkey, anchorX = 0.0, anchorY = 0.0) => {
    const bbox = (0, exports.quadkeyToBoundingBox)(quadkey);
    const w = bbox.east - bbox.west;
    const h = bbox.north - bbox.south;
    return { lng: bbox.west + w * anchorX, lat: bbox.south + h * anchorY };
};
exports.quadkeyToPoint = quadkeyToPoint;
