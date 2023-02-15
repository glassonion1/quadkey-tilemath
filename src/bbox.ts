import { pointToTile } from './point'
import { tileToQuadkey } from './tile'

/**
 * Calculates the tile quadkey strings that are within a bounding box at a specific zoom level.
 * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
 * @param zoom Zoom level to calculate tiles for.
 * @returns A list of quadkey strings.
 */
export const getQuadkeysInBoundingBox = (
  west: number,
  south: number,
  east: number,
  north: number,
  zoom: number
): string[] => {
  const keys: string[] = []

  const tl = pointToTile(west, north, zoom)
  const br = pointToTile(east, south, zoom)

  for (let x = tl.tileX; x <= br.tileX; x++) {
    for (let y = tl.tileY; y <= br.tileY; y++) {
      keys.push(tileToQuadkey(x, y, zoom))
    }
  }

  return keys
}
