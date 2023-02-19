"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webMercatorToPoint = exports.pointToWebMercator = void 0;
const model_1 = require("./model");
const point_1 = require("./point");
const EARTH_RADIUS = 6378137;
/**
 * Convert longitude and latitude to web mercator x, y.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @returns A web mercator coordinates in meters.
 */
const pointToWebMercator = (lng, lat) => {
    const [longitude, latitude] = (0, point_1.truncatePoint)(lng, lat);
    const x = EARTH_RADIUS * (0, model_1.degreesToRadians)(longitude);
    const y = EARTH_RADIUS *
        Math.log(Math.tan(Math.PI * 0.25 + 0.5 * (0, model_1.degreesToRadians)(latitude)));
    return { x: x, y: y };
};
exports.pointToWebMercator = pointToWebMercator;
/**
 * Convert web mercator x, y to longitude and latitude.
 * @param x web mercator coordinates in meters.
 * @param y web mercator coordinates in meters.
 * @returns A point value.
 */
const webMercatorToPoint = (x, y) => {
    const lng = (0, model_1.radiansToDegrees)(x) / EARTH_RADIUS;
    const lat = (0, model_1.radiansToDegrees)(Math.PI * 0.5 - 2.0 * Math.atan(Math.exp(-y / EARTH_RADIUS)));
    const [longitude, latitude] = (0, point_1.truncatePoint)(lng, lat);
    return { lng: longitude, lat: latitude };
};
exports.webMercatorToPoint = webMercatorToPoint;
