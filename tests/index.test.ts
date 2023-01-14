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
    const tile = TileMath.positionToTileXY([139.69116, 35.63051], 15)
    expect(TileMath.tileXYToQuadKey(tile.tileX, tile.tileY, 15)).toBe(
      '133002112303213'
    )
    expect(TileMath.positionToQuadKey([139.69116, 35.63051], 15)).toBe(
      '133002112303213'
    )
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
