class MapCtrl{
	private fogNumArr: number[][] = [];
	private clickArray: number[][] = [];
	private fogImage: HTMLImageElement;
	private context: CanvasRenderingContext2D;
	
	public constructor() {
		let coverCanvas = <HTMLCanvasElement>document.getElementById("coverCanvas");
		this.context = coverCanvas.getContext('2d');
		this.fogImage = new Image();
		this.fogImage.src = "resource/game_assets/fog.png";
		this.initArr();
		this.fogImage.onload = () => {
			this.drawFog();
			coverCanvas.onclick = (e: MouseEvent) => {
				this.onHeroMove(e);
			}
		}
		
	}
	/**初始化迷雾,点击区域信息 */
	private initArr() {
		let fogArr = this.fogNumArr;
		for(let i = 0, rlen = MapConst.mapRow; i < rlen; i++) {
			fogArr[i] = [];
			for(let j = 0, clen = MapConst.mapCol; j < clen; j++) {
				fogArr[i][j] = 0;
			}
		}
		let clickArray = this.clickArray;
		for(let i = 0, rlen = MapConst.mapRow; i < rlen; i++) {
			clickArray[i] = [];
			for(let j = 0, clen = MapConst.mapCol; j < clen; j++) {
				clickArray[i][j] = 0;
			}
		}
	}
	/**根据FogNumArr绘制战争迷雾 */
	private drawFog() {
		for(let i = 0, rlen = MapConst.mapRow; i < rlen; i++ ) {
			for(let j = 0, clen = MapConst.mapCol; j < clen; j++) {
				this.drawFogByPoint(i, j);
			}
		}
	}
	/**根据某个点更新战争迷雾 */
	private drawFogByPoint(x, y) {
		let context = this.context;
		let tileW = MapConst.tileWidth;
		let fogIndex = this.fogNumArr[x][y];
		let fogPoint = this.getFogPointFromIndex(fogIndex);
		let l = fogPoint.y;
		let c = fogPoint.x;
		context.drawImage(this.fogImage, c * MapConst.tileWidth, l * tileW, tileW, tileW, y * tileW, x * tileW, tileW, tileW);
	}
	/**英雄点击控制 */
	private onHeroMove(e: MouseEvent) {
		let x = Math.round(e.clientY / MapConst.tileWidth);
		let y = Math.round(e.clientX / MapConst.tileWidth);
		let leftUpConner = new Point(x-1, y-1);
		let rightUpConner = new Point(x-1, y);
		let leftDownConner = new Point(x, y-1);
		let rightDownConner = new Point(x, y);

		if( MapConst.isGridInMap(x, y) && this.clickArray[x][y] == 0) {
			this.updateFogArrByPoint(leftUpConner, 4);
			this.updateFogArrByPoint(rightUpConner, 8);
			this.updateFogArrByPoint(leftDownConner, 1);
			this.updateFogArrByPoint(rightDownConner, 2);
			this.clickArray[x][y] = 1;
		}

	}
	
	private updateFogArrByPoint(conner: Point, weight) {
		if(MapConst.isPointInMap(conner)) {
			let lastLeftUp = this.fogNumArr[conner.x][conner.y];
			this.fogNumArr[conner.x][conner.y] = Math.min(lastLeftUp + weight, 15);
			this.updateForPoint(conner);
		}
	}
	private updateForPoint(conner: Point) {
		let tileWidth = MapConst.tileWidth;
		this.context.clearRect(conner.y * tileWidth, conner.x * tileWidth, tileWidth, tileWidth);
		this.drawFogByPoint(conner.x, conner.y);
	}
	private getFogPointFromIndex(fogIndex) {
		let y = fogIndex % MapConst.fogImgRow;
		let x = Math.floor(fogIndex / MapConst.fogImgCol);
		return new Point(x, y);
	}

	
}