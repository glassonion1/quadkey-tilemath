# quadkey-tilemath
[![npm version](https://badge.fury.io/js/global-mercator.svg)](https://badge.fury.io/js/quadkey-tilemath)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/glassonion1/quadkey-tilemath/main/LICENSE)

The quadkey-tilemath provides functions for converting between geographical coordinates and tile coordinates using the Quadkey system. This system represents a hierarchical tiling of the Earth's surface as a quadtree, with each tile being assigned a unique identifier known as a Quadkey.

The quadkey-tilemath implements the TileSystem static class described here as a reference: http://msdn.microsoft.com/en-us/library/bb259689.aspx

Given a (longitude, latitude) and level produce a quadkey to be used in Bing Maps. Can also supply methods to generate a Google Maps TileXYZ

## Class diagram
It is a conceptual class diagram for explanation only and differs from the actual implementation.
![plantuml](https://user-images.githubusercontent.com/1037944/219954819-e1670562-1027-4b34-8c62-1e7cd64d4796.svg)

## Install
```
$ npm install quadkey-tilemath
```
or
```
$ yarn add quadkey-tilemath
```

## Usage
Converts a longitude, latitude to a quadkey.
```ts
import tileMath from 'quadkey-tilemath'

// Shibuya
const quadkey = tileMath.pointToQuadkey([139.69116, 35.63051], 20)

// 133002112303213
console.log(quadkey)
```
Converts a quadkey to lng lat point.
```ts
import tileMath from 'quadkey-tilemath'

const point = tileMath.quadkeyToPoint('13300211230301333312')

// 139.7014617919922, 35.657854158137965
console.log(point)
```
