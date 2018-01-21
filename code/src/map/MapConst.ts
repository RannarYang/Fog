class MapConst {
	/**地图格子的宽度&高度 */
	public static tileWidth: number = 128;
	/**地图格子的列数 */
	public static mapCol: number = 10; 
	/**地图格子的行数 */
	public static mapRow: number = 5;
	/**迷雾图片的列数 */
	public static fogImgCol: number = 4;
	/**迷雾图片的行数 */
	public static fogImgRow: number = 4;
	/**迷雾图片的路径 */
	public static fogImgSrc: string = "resource/game_assets/fog.png";
	/**格子是否在地图内 */
	public static isGridInMap(x, y) {
		return x >= 0 && x <= this.mapRow && y >= 0 && y <= this.mapCol;
	}
	/**格子是否在地图内 */
	public static isPointInMap(point: Point) {
		return this.isGridInMap(point.x, point.y);
	}
}