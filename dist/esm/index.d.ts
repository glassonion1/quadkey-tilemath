declare const tileMath: {
    readonly pointToQuadkey: (lng: number, lat: number, zoom: number) => string;
    readonly pointToBoundingBox: (lng: number, lat: number, zoom: number) => import("./model").Bbox;
    readonly quadkeyToPoint: (quadkey: string) => import("./model").Point;
    readonly quadkeyToCentroidPoint: (quadkey: string) => import("./model").Point;
    readonly getQuadkeysInBoundingBox: (west: number, south: number, east: number, north: number, zoom: number) => string[];
};
export default tileMath;
//# sourceMappingURL=index.d.ts.map