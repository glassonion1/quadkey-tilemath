/** Tile System math for the Spherical Mercator projection coordinate system (EPSG:3857) */
export declare class TileMath {
    private static EarthRadius;
    private static MinLatitude;
    private static MaxLatitude;
    private static MinLongitude;
    private static MaxLongitude;
    private static TileSize;
    /**
     * Clips a number to the specified minimum and maximum values.
     * @param n The number to clip.
     * @param minValue Minimum allowable value.
     * @param maxValue Maximum allowable value.
     * @returns The clipped value.
     */
    private static Clip;
    /**
     * Calculates width and height of the map in pixels at a specific zoom level from -180 degrees to 180 degrees.
     * @param zoom Zoom Level to calculate width at.
     * @returns Width and height of the map in pixels.
     */
    static MapSize(zoom: number): number;
    /**
     * Calculates the Ground resolution at a specific degree of latitude in the meters per pixel.
     * @param latitude Degree of latitude to calculate resolution at.
     * @param zoom Zoom level.
     * @returns Ground resolution in meters per pixels.
     */
    static GroundResolution(latitude: number, zoom: number): number;
    /**
     * Determines the map scale at a specified latitude, level of detail, and screen resolution.
     * @param latitude Latitude (in degrees) at which to measure the map scale.
     * @param zoom Zoom level.
     * @param screenDpi Resolution of the screen, in dots per inch.
     * @returns The map scale, expressed as the denominator N of the ratio 1 : N.
     */
    static MapScale(latitude: number, zoom: number, screenDpi: number): number;
    /**
     * Global Converts a Pixel coordinate into a geospatial coordinate at a specified zoom level.
     * Global Pixel coordinates are relative to the top left corner of the map (90, -180).
     * @param pixel Pixel coordinates in the format of [x, y].
     * @param zoom Zoom level.
     * @returns A position value in the format [longitude, latitude].
     */
    static GlobalPixelToPosition(pixel: number[], zoom: number): number[];
    /**
     * Converts a point from latitude/longitude WGS-84 coordinates (in degrees) into pixel XY coordinates at a specified level of detail.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns A pixel coordinate
     */
    static PositionToGlobalPixel(position: number[], zoom: number): number[];
    /**
     * Converts pixel XY coordinates into tile XY coordinates of the tile containing the specified pixel.
     * @param pixel Pixel coordinates in the format of [x, y].
     * @returns Tile XY coordinates.
     */
    static GlobalPixelToTileXY(pixel: number[]): {
        tileX: number;
        tileY: number;
    };
    /**
     * Performs a scale transform on a global pixel value from one zoom level to another.
     * @param pixel Pixel coordinates in the format of [x, y].
     * @param oldZoom The zoom level in which the input global pixel value is from.
     * @param newZoom The new zoom level in which the output global pixel value should be aligned with.
     */
    static ScaleGlobalPixel(pixel: number[], oldZoom: number, newZoom: number): number[];
    static ScaleGlobalPixels(pixels: number[][], oldZoom: number, newZoom: number): number[][];
    /**
     * Converts tile XY coordinates into a global pixel XY coordinates of the upper-left pixel of the specified tile.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @returns Pixel coordinates in the format of [x, y].
     */
    static TileXYToGlobalPixel(tileX: number, tileY: number): number[];
    /**
     * Converts tile XY coordinates into a quadkey at a specified level of detail.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @param zoom Zoom level.
     * @returns A string containing the quadkey.
     */
    static TileXYToQuadKey(tileX: number, tileY: number, zoom: number): string;
    /**
     * Converts a quadkey into tile XY coordinates.
     * @param quadKey Quadkey of the tile.
     * @returns Tile XY cocorindates and zoom level for the specified quadkey.
     */
    static QuadKeyToTileXY(quadKey: string): {
        tileX: number;
        tileY: number;
        zoom: number;
    };
    /**
     * Calculates the XY tile coordinates that a coordinate falls into for a specific zoom level.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @returns Tiel XY coordinates.
     */
    static PositionToTileXY(position: number[], zoom: number): {
        tileX: number;
        tileY: number;
    };
    /**
     * Calculates the tile quadkey strings that are within a specified viewport.
     * @param position Position coordinate in the format [longitude, latitude].
     * @param zoom Zoom level.
     * @param width The width of the map viewport in pixels.
     * @param height The height of the map viewport in pixels.
     * @returns A list of quadkey strings that are within the specified viewport.
     */
    static GetQuadkeysInView(position: number[], zoom: number, width: number, height: number): string[];
    /**
     * Calculates the tile quadkey strings that are within a bounding box at a specific zoom level.
     * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
     * @param zoom Zoom level to calculate tiles for.
     * @returns A list of quadkey strings.
     */
    static GetQuadkeysInBoundingBox(bounds: number[], zoom: number): string[];
    /**
     * Calculates the bounding box of a tile.
     * @param tileX Tile X coordinate.
     * @param tileY Tile Y coordinate.
     * @param zoom Zoom level.
     * @returns A bounding box of the tile defined as an array of numbers in the format of [west, south, east, north].
     */
    static TileXYToBoundingBox(tileX: number, tileY: number, zoom: number): number[];
    /**
     * Calculates the best map view (center, zoom) for a bounding box on a map.
     * @param bounds A bounding box defined as an array of numbers in the format of [west, south, east, north].
     * @param mapWidth Map width in pixels.
     * @param mapHeight Map height in pixels.
     * @param padding Width in pixels to use to create a buffer around the map. This is to keep markers from being cut off on the edge.
     * @returns The center and zoom level to best position the map view over the provided bounding box.
     */
    static BestMapView(bounds: number[], mapWidth: number, mapHeight: number, padding: number): {
        center: number[];
        zoom: number;
    };
}
//# sourceMappingURL=index.d.ts.map