import { pointToBoundingBox, pointToQuadkey, pointToTile } from '../src/point'
import {
  quadkeyToCentroidPoint,
  quadkeyToPoint,
  quadkeyToTile
} from '../src/quadkey'

// https://jenningsanderson.com/geo/#8.9/35.6238/-220.2713
describe('run tests', () => {
  it('tests the positionToQuadkey', () => {
    const p = [139.69116, 35.63051]
    const tile = pointToTile(p[0], p[1], 15)
    expect(tile).toStrictEqual({ tileX: 29098, tileY: 12909 })

    expect(pointToQuadkey(p[0], p[1], 0)).toBe('')
    expect(pointToQuadkey(p[0], p[1], 1)).toBe('1')
    expect(pointToQuadkey(p[0], p[1], 2)).toBe('13')
    expect(pointToQuadkey(p[0], p[1], 3)).toBe('133')
    expect(pointToQuadkey(p[0], p[1], 4)).toBe('1330')
    expect(pointToQuadkey(p[0], p[1], 5)).toBe('13300')
    expect(pointToQuadkey(p[0], p[1], 6)).toBe('133002')
    expect(pointToQuadkey(p[0], p[1], 7)).toBe('1330021')
    expect(pointToQuadkey(p[0], p[1], 8)).toBe('13300211')
    expect(pointToQuadkey(p[0], p[1], 9)).toBe('133002112')
    expect(pointToQuadkey(p[0], p[1], 10)).toBe('1330021123')
    expect(pointToQuadkey(p[0], p[1], 11)).toBe('13300211230')
    expect(pointToQuadkey(p[0], p[1], 12)).toBe('133002112303')
    expect(pointToQuadkey(p[0], p[1], 13)).toBe('1330021123032')
    expect(pointToQuadkey(p[0], p[1], 14)).toBe('13300211230321')
    expect(pointToQuadkey(p[0], p[1], 15)).toBe('133002112303212')
    expect(pointToQuadkey(p[0], p[1], 16)).toBe('1330021123032121')
    expect(pointToQuadkey(p[0], p[1], 17)).toBe('13300211230321211')
    expect(pointToQuadkey(p[0], p[1], 18)).toBe('133002112303212111')
    expect(pointToQuadkey(p[0], p[1], 19)).toBe('1330021123032121111')
    expect(pointToQuadkey(p[0], p[1], 20)).toBe('13300211230321211111')
    expect(pointToQuadkey(p[0], p[1], 21)).toBe('133002112303212111111')
    expect(pointToQuadkey(p[0], p[1], 22)).toBe('1330021123032121111111')
    expect(pointToQuadkey(p[0], p[1], 23)).toBe('13300211230321211111111')
  })

  it('tests the positionToQuadkey', () => {
    const p = [-139.69116, -35.63051]
    const tile = pointToTile(p[0], p[1], 15)
    expect(tile).toStrictEqual({ tileX: 3669, tileY: 19858 })

    expect(pointToQuadkey(p[0], p[1], 0)).toBe('')
    expect(pointToQuadkey(p[0], p[1], 1)).toBe('2')
    expect(pointToQuadkey(p[0], p[1], 2)).toBe('20')
    expect(pointToQuadkey(p[0], p[1], 3)).toBe('200')
    expect(pointToQuadkey(p[0], p[1], 4)).toBe('2003')
    expect(pointToQuadkey(p[0], p[1], 5)).toBe('20033')
    expect(pointToQuadkey(p[0], p[1], 6)).toBe('200331')
    expect(pointToQuadkey(p[0], p[1], 7)).toBe('2003312')
    expect(pointToQuadkey(p[0], p[1], 8)).toBe('20033122')
    expect(pointToQuadkey(p[0], p[1], 9)).toBe('200331221')
    expect(pointToQuadkey(p[0], p[1], 10)).toBe('2003312210')
    expect(pointToQuadkey(p[0], p[1], 11)).toBe('20033122103')
    expect(pointToQuadkey(p[0], p[1], 12)).toBe('200331221030')
    expect(pointToQuadkey(p[0], p[1], 13)).toBe('2003312210301')
    expect(pointToQuadkey(p[0], p[1], 14)).toBe('20033122103012')
    expect(pointToQuadkey(p[0], p[1], 15)).toBe('200331221030121')
    expect(pointToQuadkey(p[0], p[1], 16)).toBe('2003312210301212')
    expect(pointToQuadkey(p[0], p[1], 17)).toBe('20033122103012122')
    expect(pointToQuadkey(p[0], p[1], 18)).toBe('200331221030121222')
    expect(pointToQuadkey(p[0], p[1], 19)).toBe('2003312210301212222')
    expect(pointToQuadkey(p[0], p[1], 20)).toBe('20033122103012122222')
    expect(pointToQuadkey(p[0], p[1], 21)).toBe('200331221030121222222')
    expect(pointToQuadkey(p[0], p[1], 22)).toBe('2003312210301212222222')
    expect(pointToQuadkey(p[0], p[1], 23)).toBe('20033122103012122222222')
  })

  it('tests the positionToQuadkey', () => {
    const p1 = [-0.1, -0.1]
    expect(pointToQuadkey(p1[0], p1[1], 23)).toBe('21111111111211211122121')
    const p2 = [0, 0]
    expect(pointToQuadkey(p2[0], p2[1], 23)).toBe('30000000000000000000000')
    const p3 = [0.1, 0]
    expect(pointToQuadkey(p3[0], p3[1], 23)).toBe('30000000000100100011010')
    const p4 = [0, 0.1]
    expect(pointToQuadkey(p4[0], p4[1], 23)).toBe('12222222222022022200202')
    const p5 = [0.1, 0.1]
    expect(pointToQuadkey(p5[0], p5[1], 23)).toBe('12222222222122122211212')
  })

  it('tests the positionToBoundingBox', () => {
    expect(pointToBoundingBox(139.69116, 35.63051, 15)).toStrictEqual({
      west: 139.68017578125,
      south: 35.62158189955967,
      east: 139.691162109375,
      north: 35.630511983000595
    })
  })

  it('tests the quadkeyToCentroidPosition', () => {
    expect(quadkeyToCentroidPoint('13300211230301333312')).toStrictEqual({
      lng: 139.70163345336914,
      lat: 35.65799363491759
    })
  })

  it('tests the quadkeyToPoint', () => {
    expect(quadkeyToPoint('13300211230301333312')).toStrictEqual({
      lng: 139.7014617919922,
      lat: 35.657854158137965
    })
  })

  it('tests the error', () => {
    expect(() => {
      quadkeyToTile('1339')
    }).toThrowError(Error)
  })
})
