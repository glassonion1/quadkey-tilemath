# TileMath
[![npm version](https://badge.fury.io/js/global-mercator.svg)](https://badge.fury.io/js/quadkey-tilemath)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/glassonion1/quadkey-tilemath/main/LICENSE)

Tile System math for the Spherical Mercator projection coordinate system (EPSG:3857)

Built off of the TileSystem static class outlined here: http://msdn.microsoft.com/en-us/library/bb259689.aspx

Given a (lat, lon) and level produce a quadkey to be used in Bing Maps. Can also supply methods to generate a Google Maps TileXYZ

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
import { TileMath } from 'quadkey-tilemath'

// Shibuya
const quadkey = TileMath.positionToQuadKey([139.69116, 35.63051], 20)

// 133002112303213
console.log(quadkey)
```
