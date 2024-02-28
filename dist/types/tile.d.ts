import { Bbox, Point } from './types';
/**
 * Converts tile XY coordinates into a point at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A point value(west, north).
 */
export declare const tileToPoint: (tileX: number, tileY: number, zoom: number) => Point;
/**
 * Converts tile XY coordinates into a quadkey at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
export declare const tileToQuadkey: (tileX: number, tileY: number, zoom: number) => string;
/**
 * Calculates the bounding box of a tile.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box.
 */
export declare const tileToBoundingBox: (tileX: number, tileY: number, zoom: number) => Bbox;
//# sourceMappingURL=tile.d.ts.map