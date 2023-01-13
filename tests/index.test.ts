import { TileMath } from '../src'

describe('run tests the TileMath class', () => {
  it('MapSize', () => {
    expect(TileMath.MapSize(0)).toBe(256)
    expect(TileMath.MapSize(1)).toBe(512)
    expect(TileMath.MapSize(2)).toBe(1024)
    expect(TileMath.MapSize(3)).toBe(2048)
    expect(TileMath.MapSize(4)).toBe(4096)
    expect(TileMath.MapSize(5)).toBe(8192)
    expect(TileMath.MapSize(6)).toBe(16384)
    expect(TileMath.MapSize(7)).toBe(32768)
    expect(TileMath.MapSize(8)).toBe(65536)
    expect(TileMath.MapSize(9)).toBe(131072)
    expect(TileMath.MapSize(10)).toBe(262144)
    expect(TileMath.MapSize(11)).toBe(524288)
    expect(TileMath.MapSize(12)).toBe(1048576)
    expect(TileMath.MapSize(13)).toBe(2097152)
    expect(TileMath.MapSize(14)).toBe(4194304)
    expect(TileMath.MapSize(15)).toBe(8388608)
    expect(TileMath.MapSize(16)).toBe(16777216)
    expect(TileMath.MapSize(17)).toBe(33554432)
    expect(TileMath.MapSize(18)).toBe(67108864)
    expect(TileMath.MapSize(19)).toBe(134217728)
    expect(TileMath.MapSize(20)).toBe(268435456)
    expect(TileMath.MapSize(21)).toBe(536870912)
    expect(TileMath.MapSize(22)).toBe(1073741824)
    expect(TileMath.MapSize(23)).toBe(2147483648)
  })
  it('PositionToTileXY', () => {
    const tile = TileMath.PositionToTileXY([139.69116, 35.63051], 15)
    expect(TileMath.TileXYToQuadKey(tile.tileX, tile.tileY, 15)).toBe(
      '133002112303213'
    )
  })
})
