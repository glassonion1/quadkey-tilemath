import { Bbox, Tile } from './types'
import { tileToBoundingBox, tileToQuadkey } from './tile'

const MIN_LATITUDE = -85.05112878
const MAX_LATITUDE = 85.05112878
const MIN_LONGITUDE = -180
const MAX_LONGITUDE = 180

const clip = (n: number, minValue: number, maxValue: number): number => {
  return Math.min(Math.max(n, minValue), maxValue)
}

const toTileNum = (val: number, zoom: number): number => {
  const EPSILON = 1e-14
  const z2 = Math.pow(2, zoom)

  if (val <= 0) {
    return 0
  }
  if (val >= 1) {
    return Math.trunc(z2 - 1)
  }
  // 0 < val < 1
  // To address loss of precision in round-tripping between tile
  // and lng/lat, points within EPSILON of the right side of a tile
  // are counted in the next tile over.
  return Math.trunc(Math.floor((val + EPSILON) * z2))
}

export const truncatePoint = (lng: number, lat: number): number[] => {
  const longitude = clip(lng, MIN_LONGITUDE, MAX_LONGITUDE)
  const latitude = clip(lat, MIN_LATITUDE, MAX_LATITUDE)

  return [longitude, latitude]
}

/**
 * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns Tiel XY coordinates.
 */
export const pointToTile = (lng: number, lat: number, zoom: number): Tile => {
  const [longitude, latitude] = truncatePoint(lng, lat)

  const x = (longitude + 180) / 360
  const sinLatitude = Math.sin((latitude * Math.PI) / 180)
  const y =
    0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI)

  const tileX = toTileNum(x, zoom)
  const tileY = toTileNum(y, zoom)

  return { tileX: tileX, tileY: tileY }
}

/**
 * Converts a geospatial coordinate coordinates into a quadkey at a specified level of detail.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A string containing the quadkey.
 */
export const pointToQuadkey = (
  lng: number,
  lat: number,
  zoom: number
): string => {
  const tile = pointToTile(lng, lat, zoom)

  return tileToQuadkey(tile.tileX, tile.tileY, zoom)
}

/**
 * Calculates the bounding box of a geospatial coordinate coordinates.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @param zoom Zoom level.
 * @returns A bounding box of the tile.
 */
export const pointToBoundingBox = (
  lng: number,
  lat: number,
  zoom: number
): Bbox => {
  const tile = pointToTile(lng, lat, zoom)

  return tileToBoundingBox(tile.tileX, tile.tileY, zoom)
}
