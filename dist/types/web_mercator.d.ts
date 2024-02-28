import { Point, WebMercator } from './types';
/**
 * Convert longitude and latitude to web mercator x, y.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @returns A web mercator coordinates in meters.
 */
export declare const pointToWebMercator: (lng: number, lat: number) => WebMercator;
/**
 * Convert web mercator x, y to longitude and latitude.
 * @param x web mercator coordinates in meters.
 * @param y web mercator coordinates in meters.
 * @returns A point value.
 */
export declare const webMercatorToPoint: (x: number, y: number) => Point;
//# sourceMappingURL=web_mercator.d.ts.map