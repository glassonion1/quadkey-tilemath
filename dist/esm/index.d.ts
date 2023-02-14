export { pointToQuadKey, quadkeyToPoint, quadKeyToCentroidPoint, pointToBoundingBox } from './quadkey';
declare const tileMath: {
    readonly pointToQuadKey: (lng: number, lat: number, zoom: number) => string;
    readonly quadkeyToPoint: (quadkey: string) => import("./model").Point;
    readonly quadKeyToCentroidPoint: (quadKey: string) => import("./model").Point;
    readonly pointToBoundingBox: (lng: number, lat: number, zoom: number) => import("./model").Bbox;
};
export default tileMath;
//# sourceMappingURL=index.d.ts.map