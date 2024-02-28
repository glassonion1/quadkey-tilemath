export type { Point, Bbox, Tile, WebMercator } from './types';
export { quadkeyToPoint, quadkeyToBoundingBox } from './quadkey';
export { pointToQuadkey, pointToBoundingBox } from './point';
export { getQuadkeysInBoundingBox } from './bbox';
export { pointToWebMercator, webMercatorToPoint } from './web_mercator';
export declare const tileMath: {
    readonly pointToQuadkey: (lng: number, lat: number, zoom: number) => string;
    readonly pointToBoundingBox: (lng: number, lat: number, zoom: number) => import("./types").Bbox;
    readonly quadkeyToPoint: (quadkey: string, anchorX?: number, anchorY?: number) => import("./types").Point;
    readonly quadkeyToBoundingBox: (quadkey: string) => import("./types").Bbox;
    readonly getQuadkeysInBoundingBox: (west: number, south: number, east: number, north: number, zoom: number) => string[];
    readonly pointToWebMercator: (lng: number, lat: number) => import("./types").WebMercator;
    readonly webMercatorToPoint: (x: number, y: number) => import("./types").Point;
};
//# sourceMappingURL=index.d.ts.map