"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuadkeysInBoundingBox = void 0;
const point_1 = require("./point");
const tile_1 = require("./tile");
/**
 * Calculates the tile quadkey strings that are within a bounding box at a specific zoom level.
 * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
 * @param zoom Zoom level to calculate tiles for.
 * @returns A list of quadkey strings.
 */
const getQuadkeysInBoundingBox = (west, south, east, north, zoom) => {
    const keys = [];
    const tl = (0, point_1.pointToTile)(west, north, zoom);
    const br = (0, point_1.pointToTile)(east, south, zoom);
    for (let x = tl.tileX; x <= br.tileX; x++) {
        for (let y = tl.tileY; y <= br.tileY; y++) {
            keys.push((0, tile_1.tileToQuadkey)(x, y, zoom));
        }
    }
    return keys;
};
exports.getQuadkeysInBoundingBox = getQuadkeysInBoundingBox;
