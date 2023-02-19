import { Bbox, Point, radiansToDegrees } from './model'

/**
 * Converts tile XY coordinates into a point at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A point value(west, north).
 */
export const tileToPoint = (
  tileX: number,
  tileY: number,
  zoom: number
): Point => {
  const z2 = Math.pow(2, zoom)
  const lng = (tileX / z2) * 360.0 - 180.0
  const latRadian = Math.atan(Math.sinh(Math.PI * (1 - (2 * tileY) / z2)))
  const lat = radiansToDegrees(latRadian)

  return { lng: lng, lat: lat }
}

/**
 * Converts tile XY coordinates into a quadkey at a specified level of detail.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
export const tileToQuadkey = (
  tileX: number,
  tileY: number,
  zoom: number
): string => {
  const quadkey: number[] = []
  for (let i = zoom; i > 0; i--) {
    let digit = 0
    const mask = 1 << (i - 1)

    if ((tileX & mask) != 0) {
      digit++
    }

    if ((tileY & mask) != 0) {
      digit += 2
    }

    quadkey.push(digit)
  }
  return quadkey.join('')
}

/**
 * Calculates the bounding box of a tile.
 * @param tileX Tile X coordinate.
 * @param tileY Tile Y coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box.
 */
export const tileToBoundingBox = (
  tileX: number,
  tileY: number,
  zoom: number
): Bbox => {
  const wn = tileToPoint(tileX, tileY, zoom)
  const es = tileToPoint(tileX + 1, tileY + 1, zoom)

  // Tile coordinates are top left, map coordinates are bottom left
  return { west: wn.lng, south: es.lat, east: es.lng, north: wn.lat }
}
