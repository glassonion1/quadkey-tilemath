import { Bbox, Point, Tile } from './model'
import { tileToBoundingBox } from './tile'

/**
 * Converts a quadkey into tile XY coordinates.
 * @param quadkey Quadkey of the tile.
 * @returns Tile XY cocorindates for the specified quadkey.
 */
export const quadkeyToTile = (quadkey: string): Tile => {
  let tileX = 0
  let tileY = 0
  const zoom = quadkey.length

  for (let i = zoom; i > 0; i--) {
    const mask = 1 << (i - 1)
    switch (quadkey[zoom - i]) {
      case '0':
        break

      case '1':
        tileX |= mask
        break

      case '2':
        tileY |= mask
        break

      case '3':
        tileX |= mask
        tileY |= mask
        break

      default:
        throw new Error('Invalid Quadkey digit sequence.')
    }
  }

  return {
    tileX: tileX,
    tileY: tileY
  }
}

/**
 * Calculates the bounding box of a quadkey.
 * @param quadkey Quadkey of the tile.
 * @returns A bounding box of the tile.
 */
export const quadkeyToBoundingBox = (quadkey: string): Bbox => {
  const tile = quadkeyToTile(quadkey)
  return tileToBoundingBox(tile.tileX, tile.tileY, quadkey.length)
}

/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @param anchorX - anchor point of longitude
 * @param anchorY - anchor point of latitude
 * @returns A point value(west, south).
 */
export const quadkeyToPoint = (
  quadkey: string,
  anchorX: number = 0.0,
  anchorY: number = 0.0
): Point => {
  const bbox = quadkeyToBoundingBox(quadkey)

  const w = bbox.east - bbox.west
  const h = bbox.north - bbox.south

  return { lng: bbox.west + w * anchorX, lat: bbox.south + h * anchorY }
}
