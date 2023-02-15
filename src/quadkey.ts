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
 * @returns A point value(west, south).
 */
export const quadkeyToPoint = (quadkey: string): Point => {
  const tile = quadkeyToTile(quadkey)
  const bbox = tileToBoundingBox(tile.tileX, tile.tileY, quadkey.length)

  return { lng: bbox.west, lat: bbox.south }
}

/**
 * Converts a quadkey into a geospatial coordinate.
 * @param quadkey Quadkey of the tile.
 * @returns A point value.
 */
export const quadkeyToCentroidPoint = (quadkey: string): Point => {
  const tile = quadkeyToTile(quadkey)
  const bbox = tileToBoundingBox(tile.tileX, tile.tileY, quadkey.length)
  const x = (bbox.west + bbox.east) * 0.5
  const y = (bbox.south + bbox.north) * 0.5
  return { lng: x, lat: y }
}
