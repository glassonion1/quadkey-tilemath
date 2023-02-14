import { Bbox, Point, Tile } from './model';
/**
 * Converts tile XY coordinates into a quadkey at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
export declare const tileToQuadKey: (tileX: number, tileY: number, zoom: number) => string;
/**
 * Converts a quadkey into tile XY coordinates.
 * @param quadKey Quadkey of the tile.
 * @returns Tile XY cocorindates for the specified quadkey.
 */
export declare const quadKeyToTile: (quadKey: string) => Tile;
/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadKey Quadkey of the tile.
 * @returns A point value.
 */
export declare const quadKeyToCentroidPoint: (quadKey: string) => Point;
/**
 * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns Tiel XY coordinates.
 */
export declare const pointToTile: (lng: number, lat: number, zoom: number) => Tile;
/**
 * Converts a geospatial coordinate coordinates into a quadkey at a specified level of detail.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
export declare const pointToQuadKey: (lng: number, lat: number, zoom: number) => string;
export declare const quadkeyToPoint: (quadkey: string) => Point;
/**
 * Calculates the bounding box of a geospatial coordinate coordinates.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box of the tile defined as an array of numbers in the format of [west, south, east, north].
 */
export declare const pointToBoundingBox: (lng: number, lat: number, zoom: number) => Bbox;
/**
 * Calculates the tile quadkey strings that are within a bounding box at a specific zoom level.
 * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
 * @param zoom Zoom level to calculate tiles for.
 * @returns A list of quadkey strings.
 */
export declare const getQuadkeysInBoundingBox: (west: number, south: number, east: number, north: number, zoom: number) => string[];
/**
 * Calculates the bounding box of a tile.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box.
 */
export declare const tileToBoundingBox: (tileX: number, tileY: number, zoom: number) => Bbox;
//# sourceMappingURL=quadkey.d.ts.map