/** Tile System math for the Spherical Mercator projection coordinate system (EPSG:3857) */
export class TileMath {
    //Earth radius in meters.
    static EarthRadius = 6378137;
    static MinLatitude = -85.05112878;
    static MaxLatitude = 85.05112878;
    static MinLongitude = -180;
    static MaxLongitude = 180;
    // One side size of the tile in the zoom level 0
    // @see https://learn.microsoft.com/en-us/bingmaps/articles/bing-maps-tile-system
    static TileSize = 256;
    /**
     * Clips a number to the specified minimum and maximum values.
     * @param n The number to clip.
     * @param minValue Minimum allowable value.
     * @param maxValue Maximum allowable value.
     * @returns The clipped value.
     */
    static Clip(n, minValue, maxValue) {
        return Math.min(Math.max(n, minValue), maxValue);
    }
    /**
     * Calculates width and height of the map in pixels at a specific zoom level from -180 degrees to 180 degrees.
     * @param zoom Zoom Level to calculate width at.
     * @returns Width and height of the map in pixels.
     */
    static MapSize(zoom) {
        return Math.ceil(this.TileSize * Math.pow(2, zoom));
    }
    /**
     * Calculates the Ground resolution at a specific degree of latitude in the meters per pixel.
     * @param latitude Degree of latitude to calculate resolution at.
     * @param zoom Zoom level.
     * @returns Ground resolution in meters per pixels.
     */
    static GroundResolution(latitude, zoom) {
        latitude = this.Clip(latitude, this.MinLatitude, this.MaxLatitude);
        return ((Math.cos((latitude * Math.PI) / 180) * 2 * Math.PI * this.EarthRadius) /
            this.MapSize(zoom));
    }
    /**
     * Determines the map scale at a specified latitude, level of detail, and screen resolution.
     * @param latitude Latitude (in degrees) at which to measure the map scale.
     * @param zoom Zoom level.
     * @param screenDpi Resolution of the screen, in dots per inch.
     * @returns The map scale, expressed as the denominator N of the ratio 1 : N.
     */
    static MapScale(latitude, zoom, screenDpi) {
        return (this.GroundResolution(latitude, zoom) * screenDpi) / 0.0254;
    }
    /**
     * Global Converts a Pixel coordinate into a geospatial coordinate at a specified zoom level.
     * Global Pixel coordinates are relative to the top left corner of the map (90, -180).
     * @param pixel Pixel coordinates in the format of [x, y].
     * @param zoom Zoom level.
     * @returns A position value in the format [longitude, latitude].
     */
    static GlobalPixelToPosition(pixel, zoom) {
        var mapSize = this.MapSize(zoom);
        var x = this.Clip(pixel[0], 0, mapSize - 1) / mapSize - 0.5;
        var y = 0.5 - this.Clip(pixel[1], 0, mapSize - 1) / mapSize;
        return [
            360 * x,
            90 - (360 * Math.atan(Math.exp(-y * 2 * Math.PI))) / Math.PI, //Latitude
        ];
    }
    /**
     * Converts a point from latitude/longitude WGS-84 coordinates (in degrees) into pixel XY coordinates at a specified level of detail.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns A pixel coordinate
     */
    static PositionToGlobalPixel(position, zoom) {
        var latitude = this.Clip(position[1], this.MinLatitude, this.MaxLatitude);
        var longitude = this.Clip(position[0], this.MinLongitude, this.MaxLongitude);
        var x = (longitude + 180) / 360;
        var sinLatitude = Math.sin((latitude * Math.PI) / 180);
        var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
        var mapSize = this.MapSize(zoom);
        return [
            this.Clip(x * mapSize + 0.5, 0, mapSize - 1),
            this.Clip(y * mapSize + 0.5, 0, mapSize - 1),
        ];
    }
    /**
     * Converts pixel XY coordinates into tile XY coordinates of the tile containing the specified pixel.
     * @param pixel Pixel coordinates in the format of [x, y].
     * @returns Tile XY coordinates.
     */
    static GlobalPixelToTileXY(pixel) {
        return {
            tileX: Math.round(pixel[0] / this.TileSize),
            tileY: Math.round(pixel[1] / this.TileSize),
        };
    }
    /**
     * Performs a scale transform on a global pixel value from one zoom level to another.
     * @param pixel Pixel coordinates in the format of [x, y].
     * @param oldZoom The zoom level in which the input global pixel value is from.
     * @param newZoom The new zoom level in which the output global pixel value should be aligned with.
     */
    static ScaleGlobalPixel(pixel, oldZoom, newZoom) {
        var scale = Math.pow(2, oldZoom - newZoom);
        return [pixel[0] * scale, pixel[1] * scale];
    }
    /// <summary>
    /// Performs a scale transform on a set of global pixel values from one zoom level to another.
    /// </summary>
    /// <param name="points">A set of global pixel value from the old zoom level. Points are in the format [x,y].</param>
    /// <param name="oldZoom">The zoom level in which the input global pixel values is from.</param>
    /// <param name="newZoom">The new zoom level in which the output global pixel values should be aligned with.</param>
    /// <returns>A set of global pixel values that has been scaled for the new zoom level.</returns>
    static ScaleGlobalPixels(pixels, oldZoom, newZoom) {
        var scale = Math.pow(2, oldZoom - newZoom);
        var output = [];
        for (var i = 0, len = pixels.length; i < len; i++) {
            output.push([pixels[i][0] * scale, pixels[i][1] * scale]);
        }
        return output;
    }
    /**
     * Converts tile XY coordinates into a global pixel XY coordinates of the upper-left pixel of the specified tile.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @returns Pixel coordinates in the format of [x, y].
     */
    static TileXYToGlobalPixel(tileX, tileY) {
        return [tileX * this.TileSize, tileY * this.TileSize];
    }
    /**
     * Converts tile XY coordinates into a quadkey at a specified level of detail.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @param zoom Zoom level.
     * @returns A string containing the quadkey.
     */
    static TileXYToQuadKey(tileX, tileY, zoom) {
        var quadKey = [];
        for (var i = zoom; i > 0; i--) {
            var digit = 0;
            var mask = 1 << (i - 1);
            if ((tileX & mask) != 0) {
                digit++;
            }
            if ((tileY & mask) != 0) {
                digit += 2;
            }
            quadKey.push(digit);
        }
        return quadKey.join("");
    }
    /**
     * Converts a quadkey into tile XY coordinates.
     * @param quadKey Quadkey of the tile.
     * @returns Tile XY cocorindates and zoom level for the specified quadkey.
     */
    static QuadKeyToTileXY(quadKey) {
        var tileX = 0;
        var tileY = 0;
        var zoom = quadKey.length;
        for (var i = zoom; i > 0; i--) {
            var mask = 1 << (i - 1);
            switch (quadKey[zoom - i]) {
                case "0":
                    break;
                case "1":
                    tileX |= mask;
                    break;
                case "2":
                    tileY |= mask;
                    break;
                case "3":
                    tileX |= mask;
                    tileY |= mask;
                    break;
                default:
                    throw "Invalid QuadKey digit sequence.";
            }
        }
        return {
            tileX: tileX,
            tileY: tileY,
            zoom: zoom,
        };
    }
    /**
     * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns Tiel XY coordinates.
     */
    static PositionToTileXY(position, zoom) {
        var latitude = this.Clip(position[1], this.MinLatitude, this.MaxLatitude);
        var longitude = this.Clip(position[0], this.MinLongitude, this.MaxLongitude);
        var x = (longitude + 180) / 360;
        var sinLatitude = Math.sin((latitude * Math.PI) / 180);
        var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
        var mapSize = this.MapSize(zoom);
        return {
            tileX: Math.floor(this.Clip(x * mapSize + 0.5, 0, mapSize - 1) / this.TileSize),
            tileY: Math.floor(this.Clip(y * mapSize + 0.5, 0, mapSize - 1) / this.TileSize),
        };
    }
    /**
     * Calculates the tile quadkey strings that are within a specified viewport.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @param width The width of the map viewport in pixels.
     * @param height The height of the map viewport in pixels.
     * @returns A list of quadkey strings that are within the specified viewport.
     */
    static GetQuadkeysInView(position, zoom, width, height) {
        var p = this.PositionToGlobalPixel(position, zoom);
        var top = p[1] - height * 0.5;
        var left = p[0] - width * 0.5;
        var bottom = p[1] + height * 0.5;
        var right = p[0] + width * 0.5;
        var tl = this.GlobalPixelToPosition([left, top], zoom);
        var br = this.GlobalPixelToPosition([right, bottom], zoom);
        //Boudning box in the format: [west, south, east, north];
        var bounds = [tl[0], br[1], br[0], tl[1]];
        return this.GetQuadkeysInBoundingBox(bounds, zoom);
    }
    /**
     * Calculates the tile quadkey strings that are within a bounding box at a specific zoom level.
     * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
     * @param zoom Zoom level to calculate tiles for.
     * @returns A list of quadkey strings.
     */
    static GetQuadkeysInBoundingBox(bounds, zoom) {
        var keys = [];
        if (bounds != null && bounds.length >= 4) {
            var tl = this.PositionToTileXY([bounds[0], bounds[3]], zoom);
            var br = this.PositionToTileXY([bounds[2], bounds[1]], zoom);
            for (var x = tl.tileX; x <= br.tileX; x++) {
                for (var y = tl.tileY; y <= br.tileY; y++) {
                    keys.push(this.TileXYToQuadKey(x, y, zoom));
                }
            }
        }
        return keys;
    }
    /**
     * Calculates the bounding box of a tile.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @param zoom Zoom level.
     * @returns A bounding box of the tile defined as an array of numbers in the format of [west, south, east, north].
     */
    static TileXYToBoundingBox(tileX, tileY, zoom) {
        //Top left corner pixel coordinates
        var x1 = tileX * this.TileSize;
        var y1 = tileY * this.TileSize;
        //Bottom right corner pixel coordinates
        var x2 = x1 + this.TileSize;
        var y2 = y1 + this.TileSize;
        var wn = this.GlobalPixelToPosition([x1, y1], zoom);
        var es = this.GlobalPixelToPosition([x2, y2], zoom);
        return [wn[0], es[1], es[0], wn[1]];
    }
    /**
     * Calculates the best map view (center, zoom) for a bounding box on a map.
     * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
     * @param mapWidth Map width in pixels.
     * @param mapHeight Map height in pixels.
     * @param padding Width in pixels to use to create a buffer around the map. This is to keep markers from being cut off on the edge.
     * @returns The center and zoom level to best position the map view over the provided bounding box.
     */
    static BestMapView(bounds, mapWidth, mapHeight, padding) {
        if (bounds == null || bounds.length < 4) {
            return {
                center: [0, 0],
                zoom: 1,
            };
        }
        var boundsDeltaX;
        var centerLat;
        var centerLon;
        //Check if east value is greater than west value which would indicate that bounding box crosses the antimeridian.
        if (bounds[2] > bounds[0]) {
            boundsDeltaX = bounds[2] - bounds[0];
            centerLon = (bounds[2] + bounds[0]) / 2;
        }
        else {
            boundsDeltaX = 360 - (bounds[0] - bounds[2]);
            centerLon = (((bounds[2] + bounds[0]) / 2 + 360) % 360) - 180;
        }
        var ry1 = Math.log((Math.sin((bounds[1] * Math.PI) / 180) + 1) /
            Math.cos((bounds[1] * Math.PI) / 180));
        var ry2 = Math.log((Math.sin((bounds[3] * Math.PI) / 180) + 1) /
            Math.cos((bounds[3] * Math.PI) / 180));
        var ryc = (ry1 + ry2) / 2;
        centerLat = (Math.atan(Math.sinh(ryc)) * 180) / Math.PI;
        var resolutionHorizontal = boundsDeltaX / (mapWidth - padding * 2);
        var vy0 = Math.log(Math.tan(Math.PI * (0.25 + centerLat / 360)));
        var vy1 = Math.log(Math.tan(Math.PI * (0.25 + bounds[3] / 360)));
        var zoomFactorPowered = (mapHeight * 0.5 - padding) / (40.7436654315252 * (vy1 - vy0));
        var resolutionVertical = 360.0 / (zoomFactorPowered * this.TileSize);
        var resolution = Math.max(resolutionHorizontal, resolutionVertical);
        var zoom = Math.log2(360 / (resolution * this.TileSize));
        return {
            center: [centerLon, centerLat],
            zoom: zoom,
        };
    }
}
