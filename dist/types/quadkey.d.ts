import { Bbox, Point, Tile } from './types';
/**
 * Converts a quadkey into tile XY coordinates.
 * @param quadkey Quadkey of the tile.
 * @returns Tile XY cocorindates for the specified quadkey.
 */
export declare const quadkeyToTile: (quadkey: string) => Tile;
/**
 * Calculates the bounding box of a quadkey.
 * @param quadkey Quadkey of the tile.
 * @returns A bounding box of the tile.
 */
export declare const quadkeyToBoundingBox: (quadkey: string) => Bbox;
/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @param anchorX - anchor point of longitude
 * @param anchorY - anchor point of latitude
 * @returns A point value(west, south).
 */
export declare const quadkeyToPoint: (quadkey: string, anchorX?: number, anchorY?: number) => Point;
//# sourceMappingURL=quadkey.d.ts.map