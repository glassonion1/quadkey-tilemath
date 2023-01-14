/** Tile System math for the Spherical Mercator projection coordinate system (EPSG:3857) */
export declare class TileMath {
    private static readonly EARTH_RADIUS;
    private static readonly MIN_LATITUDE;
    private static readonly MAX_LATITUDE;
    private static readonly MIN_LONGITUDE;
    private static readonly MAX_LONGITUDE;
    private static readonly TILE_SIZE;
    /**
     * Clips a number to the specified minimum and maximum values.
     * @param n The number to clip.
     * @param minValue Minimum allowable value.
     * @param maxValue Maximum allowable value.
     * @returns The clipped value.
     */
    private static clip;
    /**
     * Calculates width and height of the map in pixels at a specific zoom level from -180 degrees to 180 degrees.
     * @param zoom Zoom Level to calculate width at.
     * @returns Width and height of the map in pixels.
     */
    static mapSize(zoom: number): number;
    /**
     * Calculates the Ground resolution at a specific degree of latitude in the meters per pixel.
     * @param latitude Degree of latitude to calculate resolution at.
     * @param zoom Zoom level.
     * @returns Ground resolution in meters per pixels.
     */
    static groundResolution(latitude: number, zoom: number): number;
    /**
     * Determines the map scale at a specified latitude, level of detail, and screen resolution.
     * @param latitude Latitude (in degrees) at which to measure the map scale.
     * @param zoom Zoom level.
     * @param screenDpi Resolution of the screen, in dots per inch.
     * @returns The map scale, expressed as the denominator N of the ratio 1 : N.
     */
    static mapScale(latitude: number, zoom: number, screenDpi: number): number;
    /**
     * Global Converts a Pixel coordinate into a geospatial coordinate at a specified zoom level.
     * Global Pixel coordinates are relative to the top left corner of the map (90, -180).
     * @param pixel Pixel coordinates in the format of [x, y].
     * @param zoom Zoom level.
     * @returns A position value in the format [longitude, latitude].
     */
    static globalPixelToPosition(pixel: number[], zoom: number): number[];
    /**
     * Converts a point from latitude/longitude WGS-84 coordinates (in degrees) into pixel XY coordinates at a specified level of detail.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns A pixel coordinate
     */
    static positionToGlobalPixel(position: number[], zoom: number): number[];
    /**
     * Converts pixel XY coordinates into tile XY coordinates of the tile containing the specified pixel.
     * @param pixel Pixel coordinates in the format of [x, y].
     * @returns Tile XY coordinates.
     */
    static globalPixelToTileXY(pixel: number[]): {
        tileX: number;
        tileY: number;
    };
    /**
     * Performs a scale transform on a global pixel value from one zoom level to another.
     * @param pixel Pixel coordinates in the format of [x, y].
     * @param oldZoom The zoom level in which the input global pixel value is from.
     * @param newZoom The new zoom level in which the output global pixel value should be aligned with.
     */
    static scaleGlobalPixel(pixel: number[], oldZoom: number, newZoom: number): number[];
    static scaleGlobalPixels(pixels: number[][], oldZoom: number, newZoom: number): number[][];
    /**
     * Converts tile XY coordinates into a global pixel XY coordinates of the upper-left pixel of the specified tile.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @returns Pixel coordinates in the format of [x, y].
     */
    static tileXYToGlobalPixel(tileX: number, tileY: number): number[];
    /**
     * Converts tile XY coordinates into a quadkey at a specified level of detail.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @param zoom Zoom level.
     * @returns A string containing the quadkey.
     */
    static tileXYToQuadKey(tileX: number, tileY: number, zoom: number): string;
    /**
     * Converts a quadkey into tile XY coordinates.
     * @param quadKey Quadkey of the tile.
     * @returns Tile XY cocorindates and zoom level for the specified quadkey.
     */
    static quadKeyToTileXY(quadKey: string): {
        tileX: number;
        tileY: number;
        zoom: number;
    };
    /**
     * Converts a quadkey into a geospatial coordinate.
     * @param quadKey Quadkey of the tile.
     * @returns A position value in the format [longitude, latitude].
     */
    static quadKeyToCentroidPosition(quadKey: string): number[];
    /**
     * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns Tiel XY coordinates.
     */
    static positionToTileXY(position: number[], zoom: number): {
        tileX: number;
        tileY: number;
    };
    /**
     * Converts a geospatial coordinate coordinates into a quadkey at a specified level of detail.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns A string containing the quadkey.
     */
    static positionToQuadKey(position: number[], zoom: number): string;
    /**
     * Calculates the bounding box of a geospatial coordinate coordinates.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns A bounding box of the tile defined as an array of numbers in the format of [west, south, east, north].
     */
    static positionToBoundingBox(position: number[], zoom: number): number[];
    /**
     * Calculates the tile quadkey strings that are within a specified viewport.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @param width The width of the map viewport in pixels.
     * @param height The height of the map viewport in pixels.
     * @returns A list of quadkey strings that are within the specified viewport.
     */
    static getQuadkeysInView(position: number[], zoom: number, width: number, height: number): string[];
    /**
     * Calculates the tile quadkey strings that are within a bounding box at a specific zoom level.
     * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
     * @param zoom Zoom level to calculate tiles for.
     * @returns A list of quadkey strings.
     */
    static getQuadkeysInBoundingBox(bounds: number[], zoom: number): string[];
    /**
     * Calculates the bounding box of a tile.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @param zoom Zoom level.
     * @returns A bounding box of the tile defined as an array of numbers in the format of [west, south, east, north].
     */
    static tileXYToBoundingBox(tileX: number, tileY: number, zoom: number): number[];
    /**
     * Calculates the best map view (center, zoom) for a bounding box on a map.
     * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
     * @param mapWidth Map width in pixels.
     * @param mapHeight Map height in pixels.
     * @param padding Width in pixels to use to create a buffer around the map. This is to keep markers from being cut off on the edge.
     * @returns The center and zoom level to best position the map view over the provided bounding box.
     */
    static bestMapView(bounds: number[], mapWidth: number, mapHeight: number, padding: number): {
        center: number[];
        zoom: number;
    };
}
//# sourceMappingURL=index.d.ts.map