import { degreesToRadians, Point, radiansToDegrees, WebMercator } from './types'
import { truncatePoint } from './point'

const EARTH_RADIUS = 6378137

/**
 * Convert longitude and latitude to web mercator x, y.
 * @param lng - longitude in position coordinate.
 * @param lat - latitude in position coordinate.
 * @returns A web mercator coordinates in meters.
 */
export const pointToWebMercator = (lng: number, lat: number): WebMercator => {
  const [longitude, latitude] = truncatePoint(lng, lat)

  const x = EARTH_RADIUS * degreesToRadians(longitude)
  const y =
    EARTH_RADIUS *
    Math.log(Math.tan(Math.PI * 0.25 + 0.5 * degreesToRadians(latitude)))

  return { x: x, y: y }
}

/**
 * Convert web mercator x, y to longitude and latitude.
 * @param x web mercator coordinates in meters.
 * @param y web mercator coordinates in meters.
 * @returns A point value.
 */
export const webMercatorToPoint = (x: number, y: number): Point => {
  const lng = radiansToDegrees(x) / EARTH_RADIUS
  const lat = radiansToDegrees(
    Math.PI * 0.5 - 2.0 * Math.atan(Math.exp(-y / EARTH_RADIUS))
  )

  const [longitude, latitude] = truncatePoint(lng, lat)
  return { lng: longitude, lat: latitude }
}
