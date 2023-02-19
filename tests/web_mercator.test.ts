import tileMath from '../src'

describe('run tests', () => {
  it('tests the pointToWebMercator', () => {
    const p = [141.242035, 45.178506]
    const xy = tileMath.pointToWebMercator(p[0], p[1])
    expect(xy).toStrictEqual({ x: 15722991.414805723, y: 5649667.51561668 })
  })

  it('tests the webMercatorToPoint', () => {
    const xy = [15722991.414805723, 5649667.51561668]
    const point = tileMath.webMercatorToPoint(xy[0], xy[1])
    expect({
      lng: Number(point.lng.toFixed(6)),
      lat: Number(point.lat.toFixed(6))
    }).toStrictEqual({ lng: 141.242035, lat: 45.178506 })
  })
})
