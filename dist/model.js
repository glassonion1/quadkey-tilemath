"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiansToDegrees = exports.degreesToRadians = void 0;
const DEGREES_TO_RADIANS = Math.PI / 180;
const degreesToRadians = (degrees) => {
    return degrees * DEGREES_TO_RADIANS;
};
exports.degreesToRadians = degreesToRadians;
const radiansToDegrees = (radians) => {
    return radians / DEGREES_TO_RADIANS;
};
exports.radiansToDegrees = radiansToDegrees;
