import { TileMath } from '../src'

// https://jenningsanderson.com/geo/#8.9/35.6238/-220.2713
describe('run tests the TileMath class', () => {
  it('mapSize', () => {
    expect(TileMath.mapSize(0)).toBe(256)
    expect(TileMath.mapSize(1)).toBe(512)
    expect(TileMath.mapSize(2)).toBe(1024)
    expect(TileMath.mapSize(3)).toBe(2048)
    expect(TileMath.mapSize(4)).toBe(4096)
    expect(TileMath.mapSize(5)).toBe(8192)
    expect(TileMath.mapSize(6)).toBe(16384)
    expect(TileMath.mapSize(7)).toBe(32768)
    expect(TileMath.mapSize(8)).toBe(65536)
    expect(TileMath.mapSize(9)).toBe(131072)
    expect(TileMath.mapSize(10)).toBe(262144)
    expect(TileMath.mapSize(11)).toBe(524288)
    expect(TileMath.mapSize(12)).toBe(1048576)
    expect(TileMath.mapSize(13)).toBe(2097152)
    expect(TileMath.mapSize(14)).toBe(4194304)
    expect(TileMath.mapSize(15)).toBe(8388608)
    expect(TileMath.mapSize(16)).toBe(16777216)
    expect(TileMath.mapSize(17)).toBe(33554432)
    expect(TileMath.mapSize(18)).toBe(67108864)
    expect(TileMath.mapSize(19)).toBe(134217728)
    expect(TileMath.mapSize(20)).toBe(268435456)
    expect(TileMath.mapSize(21)).toBe(536870912)
    expect(TileMath.mapSize(22)).toBe(1073741824)
    expect(TileMath.mapSize(23)).toBe(2147483648)
  })
  it('positionToQuadKey', () => {
    const p = [139.69116, 35.63051]
    const tile = TileMath.positionToTileXY(p, 15)
    expect(TileMath.tileXYToQuadKey(tile.tileX, tile.tileY, 15)).toBe(
      '133002112303213'
    )
    expect(TileMath.positionToQuadKey(p, 15)).toBe('133002112303213')
    expect(TileMath.positionToQuadKey(p, 0)).toBe('')
    expect(TileMath.positionToQuadKey(p, 1)).toBe('1')
    expect(TileMath.positionToQuadKey(p, 2)).toBe('13')
    expect(TileMath.positionToQuadKey(p, 3)).toBe('133')
    expect(TileMath.positionToQuadKey(p, 4)).toBe('1330')
    expect(TileMath.positionToQuadKey(p, 5)).toBe('13300')
    expect(TileMath.positionToQuadKey(p, 6)).toBe('133002')
    expect(TileMath.positionToQuadKey(p, 7)).toBe('1330021')
    expect(TileMath.positionToQuadKey(p, 8)).toBe('13300211')
    expect(TileMath.positionToQuadKey(p, 9)).toBe('133002112')
    expect(TileMath.positionToQuadKey(p, 10)).toBe('1330021123')
    expect(TileMath.positionToQuadKey(p, 11)).toBe('13300211230')
    expect(TileMath.positionToQuadKey(p, 12)).toBe('133002112303')
    expect(TileMath.positionToQuadKey(p, 13)).toBe('1330021123032')
    expect(TileMath.positionToQuadKey(p, 14)).toBe('13300211230321')
    expect(TileMath.positionToQuadKey(p, 15)).toBe('133002112303213')
    expect(TileMath.positionToQuadKey(p, 16)).toBe('1330021123032130')
    expect(TileMath.positionToQuadKey(p, 17)).toBe('13300211230321300')
    expect(TileMath.positionToQuadKey(p, 18)).toBe('133002112303213000')
    expect(TileMath.positionToQuadKey(p, 19)).toBe('1330021123032121111')
    expect(TileMath.positionToQuadKey(p, 20)).toBe('13300211230321211111')
    expect(TileMath.positionToQuadKey(p, 21)).toBe('133002112303212111111')
    expect(TileMath.positionToQuadKey(p, 22)).toBe('1330021123032121111111')
    expect(TileMath.positionToQuadKey(p, 23)).toBe('13300211230321211111111')
  })
  it('positionToBoundingBox', () => {
    const t = TileMath.positionToBoundingBox([139.69116, 35.63051], 15)
    console.log(t)

    expect(
      TileMath.positionToBoundingBox([139.69116, 35.63051], 15)
    ).toStrictEqual([
      139.691162109375, 35.62158189955967, 139.7021484375, 35.63051198300059
    ])
  })
  it('quadKeyToCentroidPosition', () => {
    const lnglat = TileMath.quadKeyToCentroidPosition('13300211230301333312')
    console.log(lnglat)
  })
})
