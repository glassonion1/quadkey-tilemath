import {
  pointToTile,
  tileToQuadKey,
  pointToBoundingBox,
  pointToQuadKey,
  quadKeyToCentroidPoint
} from '../src/quadkey'

// https://jenningsanderson.com/geo/#8.9/35.6238/-220.2713
describe('run tests', () => {
  it('tests the positionToQuadKey', () => {
    const p = [139.69116, 35.63051]
    const tile = pointToTile(p[0], p[1], 15)
    expect(tile).toStrictEqual({ tileX: 29098, tileY: 12909 })

    expect(pointToQuadKey(p[0], p[1], 0)).toBe('')
    expect(pointToQuadKey(p[0], p[1], 1)).toBe('1')
    expect(pointToQuadKey(p[0], p[1], 2)).toBe('13')
    expect(pointToQuadKey(p[0], p[1], 3)).toBe('133')
    expect(pointToQuadKey(p[0], p[1], 4)).toBe('1330')
    expect(pointToQuadKey(p[0], p[1], 5)).toBe('13300')
    expect(pointToQuadKey(p[0], p[1], 6)).toBe('133002')
    expect(pointToQuadKey(p[0], p[1], 7)).toBe('1330021')
    expect(pointToQuadKey(p[0], p[1], 8)).toBe('13300211')
    expect(pointToQuadKey(p[0], p[1], 9)).toBe('133002112')
    expect(pointToQuadKey(p[0], p[1], 10)).toBe('1330021123')
    expect(pointToQuadKey(p[0], p[1], 11)).toBe('13300211230')
    expect(pointToQuadKey(p[0], p[1], 12)).toBe('133002112303')
    expect(pointToQuadKey(p[0], p[1], 13)).toBe('1330021123032')
    expect(pointToQuadKey(p[0], p[1], 14)).toBe('13300211230321')
    expect(pointToQuadKey(p[0], p[1], 15)).toBe('133002112303212')
    expect(pointToQuadKey(p[0], p[1], 16)).toBe('1330021123032121')
    expect(pointToQuadKey(p[0], p[1], 17)).toBe('13300211230321211')
    expect(pointToQuadKey(p[0], p[1], 18)).toBe('133002112303212111')
    expect(pointToQuadKey(p[0], p[1], 19)).toBe('1330021123032121111')
    expect(pointToQuadKey(p[0], p[1], 20)).toBe('13300211230321211111')
    expect(pointToQuadKey(p[0], p[1], 21)).toBe('133002112303212111111')
    expect(pointToQuadKey(p[0], p[1], 22)).toBe('1330021123032121111111')
    expect(pointToQuadKey(p[0], p[1], 23)).toBe('13300211230321211111111')
  })

  it('tests the positionToBoundingBox', () => {
    expect(pointToBoundingBox(139.69116, 35.63051, 15)).toStrictEqual({
      west: 139.68017578125,
      south: 35.62158189955967,
      east: 139.691162109375,
      north: 35.630511983000595
    })
  })

  it('tests the quadKeyToCentroidPosition', () => {
    expect(quadKeyToCentroidPoint('13300211230301333312')).toStrictEqual({
      lng: 139.70163345336914,
      lat: 35.65799363491759
    })
  })
})
