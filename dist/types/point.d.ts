import { Bbox, Tile } from './types';
export declare const truncatePoint: (lng: number, lat: number) => number[];
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
export declare const pointToQuadkey: (lng: number, lat: number, zoom: number) => string;
/**
 * Calculates the bounding box of a geospatial coordinate coordinates.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box of the tile.
 */
export declare const pointToBoundingBox: (lng: number, lat: number, zoom: number) => Bbox;
//# sourceMappingURL=point.d.ts.map