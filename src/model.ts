/**
 * Bounding Box
 */
export interface Bbox {
  west: number
  south: number
  east: number
  north: number
}

/**
 * Point
 */
export interface Point {
  lng: number
  lat: number
}

/**
 * Tile
 */
export interface Tile {
  tileX: number
  tileY: number
}

/**
 * Web Mercator
 */
export interface WebMercator {
  x: number
  y: number
}

const DEGREES_TO_RADIANS = Math.PI / 180

export const degreesToRadians = (degrees: number): number => {
  return degrees * DEGREES_TO_RADIANS
}

export const radiansToDegrees = (radians: number): number => {
  return radians / DEGREES_TO_RADIANS
}
