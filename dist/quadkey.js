"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tileToBoundingBox = exports.getQuadkeysInBoundingBox = exports.pointToBoundingBox = exports.quadkeyToPoint = exports.pointToQuadKey = exports.pointToTile = exports.quadKeyToCentroidPoint = exports.quadKeyToTile = exports.tileToQuadKey = void 0;
const MIN_LATITUDE = -85.05112878;
const MAX_LATITUDE = 85.05112878;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;
const clip = (n, minValue, maxValue) => {
    return Math.min(Math.max(n, minValue), maxValue);
};
/**
 * Converts tile XY coordinates into a quadkey at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
const tileToQuadKey = (tileX, tileY, zoom) => {
    const quadKey = [];
    for (let i = zoom; i > 0; i--) {
        let digit = 0;
        const mask = 1 << (i - 1);
        if ((tileX & mask) != 0) {
            digit++;
        }
        if ((tileY & mask) != 0) {
            digit += 2;
        }
        quadKey.push(digit);
    }
    return quadKey.join('');
};
exports.tileToQuadKey = tileToQuadKey;
/**
 * Converts a quadkey into tile XY coordinates.
 * @param quadKey Quadkey of the tile.
 * @returns Tile XY cocorindates for the specified quadkey.
 */
const quadKeyToTile = (quadKey) => {
    let tileX = 0;
    let tileY = 0;
    const zoom = quadKey.length;
    for (let i = zoom; i > 0; i--) {
        const mask = 1 << (i - 1);
        switch (quadKey[zoom - i]) {
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
                throw 'Invalid QuadKey digit sequence.';
        }
    }
    return {
        tileX: tileX,
        tileY: tileY
    };
};
exports.quadKeyToTile = quadKeyToTile;
/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadKey Quadkey of the tile.
 * @returns A point value.
 */
const quadKeyToCentroidPoint = (quadKey) => {
    const tile = (0, exports.quadKeyToTile)(quadKey);
    const bbox = (0, exports.tileToBoundingBox)(tile.tileX, tile.tileY, quadKey.length);
    const x = (bbox.west + bbox.east) * 0.5;
    const y = (bbox.south + bbox.north) * 0.5;
    return { lng: x, lat: y };
};
exports.quadKeyToCentroidPoint = quadKeyToCentroidPoint;
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
/**
 * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns Tiel XY coordinates.
 */
const pointToTile = (lng, lat, zoom) => {
    const latitude = clip(lat, MIN_LATITUDE, MAX_LATITUDE);
    const longitude = clip(lng, MIN_LONGITUDE, MAX_LONGITUDE);
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
const pointToQuadKey = (lng, lat, zoom) => {
    const tile = (0, exports.pointToTile)(lng, lat, zoom);
    return (0, exports.tileToQuadKey)(tile.tileX, tile.tileY, zoom);
};
exports.pointToQuadKey = pointToQuadKey;
const quadkeyToPoint = (quadkey) => {
    const tile = (0, exports.quadKeyToTile)(quadkey);
    return tileToPoint(tile.tileX, tile.tileY, quadkey.length);
};
exports.quadkeyToPoint = quadkeyToPoint;
/**
 * Calculates the bounding box of a geospatial coordinate coordinates.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box of the tile defined as an array of numbers in the format of [west, south, east, north].
 */
const pointToBoundingBox = (lng, lat, zoom) => {
    const tile = (0, exports.pointToTile)(lng, lat, zoom);
    return (0, exports.tileToBoundingBox)(tile.tileX, tile.tileY, zoom);
};
exports.pointToBoundingBox = pointToBoundingBox;
/**
 * Calculates the tile quadkey strings that are within a bounding box at a specific zoom level.
 * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
 * @param zoom Zoom level to calculate tiles for.
 * @returns A list of quadkey strings.
 */
const getQuadkeysInBoundingBox = (west, south, east, north, zoom) => {
    const keys = [];
    const tl = (0, exports.pointToTile)(west, north, zoom);
    const br = (0, exports.pointToTile)(east, south, zoom);
    for (let x = tl.tileX; x <= br.tileX; x++) {
        for (let y = tl.tileY; y <= br.tileY; y++) {
            keys.push((0, exports.tileToQuadKey)(x, y, zoom));
        }
    }
    return keys;
};
exports.getQuadkeysInBoundingBox = getQuadkeysInBoundingBox;
const tileToPoint = (tileX, tileY, zoom) => {
    const z2 = Math.pow(2, zoom);
    const lng = (tileX / z2) * 360.0 - 180.0;
    const latRadian = Math.atan(Math.sinh(Math.PI * (1 - (2 * tileY) / z2)));
    const lat = latRadian * (180 / Math.PI);
    return { lng: lng, lat: lat };
};
/**
 * Calculates the bounding box of a tile.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box.
 */
const tileToBoundingBox = (tileX, tileY, zoom) => {
    const wn = tileToPoint(tileX, tileY, zoom);
    const es = tileToPoint(tileX + 1, tileY + 1, zoom);
    // Tile coordinates are top left, map coordinates are bottom left
    return { west: wn.lng, south: es.lat, east: es.lng, north: wn.lat };
};
exports.tileToBoundingBox = tileToBoundingBox;
