import { Point, Tile } from './model';
/**
 * Converts a quadkey into tile XY coordinates.
 * @param quadkey Quadkey of the tile.
 * @returns Tile XY cocorindates for the specified quadkey.
 */
export declare const quadkeyToTile: (quadkey: string) => Tile;
/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @returns A point value(west, south).
 */
export declare const quadkeyToPoint: (quadkey: string, anchorX?: number, anchorY?: number) => Point;
/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @returns A point value.
 */
export declare const quadkeyToCentroidPoint: (quadkey: string) => Point;
//# sourceMappingURL=quadkey.d.ts.map