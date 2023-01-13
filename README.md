# TileMath
Tile System math for the Spherical Mercator projection coordinate system (EPSG:3857)

## Install
```
$ npm install quadkey-tilemath
```
or
```
$ yarn add quadkey-tilemath
```

## Usage
```
import { TileMath } from 'quadkey-tilemath'

const tile = TileMath.PositionToTileXY([139.69116, 35.63051], 20)
const quadkey = TileMath.TileXYToQuadKey(tile.tileX, tile.tileY, 20)

// 133002112303213
console.log(quadkey)
```
