declare const tileMath: {
    readonly pointToQuadkey: (lng: number, lat: number, zoom: number) => string;
    readonly pointToBoundingBox: (lng: number, lat: number, zoom: number) => import("./model").Bbox;
    readonly quadkeyToPoint: (quadkey: string, anchorX?: number, anchorY?: number) => import("./model").Point;
    readonly quadkeyToBoundingBox: (quadkey: string) => import("./model").Bbox;
    readonly getQuadkeysInBoundingBox: (west: number, south: number, east: number, north: number, zoom: number) => string[];
    readonly pointToWebMercator: (lng: number, lat: number) => import("./model").WebMercator;
    readonly webMercatorToPoint: (x: number, y: number) => import("./model").Point;
};
export default tileMath;
//# sourceMappingURL=index.d.ts.map