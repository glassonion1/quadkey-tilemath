/**
 * Bounding Box
 */
export interface Bbox {
    west: number;
    south: number;
    east: number;
    north: number;
}
/**
 * Point
 */
export interface Point {
    lng: number;
    lat: number;
}
/**
 * Tile
 */
export interface Tile {
    tileX: number;
    tileY: number;
}
/**
 * Web Mercator
 */
export interface WebMercator {
    x: number;
    y: number;
}
export declare const degreesToRadians: (degrees: number) => number;
export declare const radiansToDegrees: (radians: number) => number;
//# sourceMappingURL=types.d.ts.map