import { Point, Tile } from './model'
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
  const tile = quadkeyToTile(quadkey)
  const bbox = tileToBoundingBox(tile.tileX, tile.tileY, quadkey.length)

  const w = bbox.east - bbox.west
  const h = bbox.north - bbox.south

  return { lng: bbox.west + w * anchorX, lat: bbox.south + h * anchorY }
}
