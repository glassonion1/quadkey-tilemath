"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadkeyToCentroidPoint = exports.quadkeyToPoint = exports.quadkeyToTile = void 0;
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
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @returns A point value(west, south).
 */
const quadkeyToPoint = (quadkey) => {
    const tile = (0, exports.quadkeyToTile)(quadkey);
    const bbox = (0, tile_1.tileToBoundingBox)(tile.tileX, tile.tileY, quadkey.length);
    return { lng: bbox.west, lat: bbox.south };
};
exports.quadkeyToPoint = quadkeyToPoint;
/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @returns A point value.
 */
const quadkeyToCentroidPoint = (quadkey) => {
    const tile = (0, exports.quadkeyToTile)(quadkey);
    const bbox = (0, tile_1.tileToBoundingBox)(tile.tileX, tile.tileY, quadkey.length);
    const x = (bbox.west + bbox.east) * 0.5;
    const y = (bbox.south + bbox.north) * 0.5;
    return { lng: x, lat: y };
};
exports.quadkeyToCentroidPoint = quadkeyToCentroidPoint;
