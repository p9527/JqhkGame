class GuaTileMap {
    constructor(game, tilesConfig) {
        this.game = game
        this.alive = true
        // 外部传进来tiles
        this.tiles = tilesConfig.tiles
        this.th = tilesConfig.tilesH
        this.tw = this.tiles.length / this.th
        this.images = [
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
        ]
        this.tileSize = 32

        this.offsetX = 0
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    onTheGround(i, j) {
        let index = i * this.th + j
        return this.tiles[index] != 0
    }
    update() {
    }
    draw() {
        let tiles = this.tiles
        let h = this.th
        let context = this.game.context
        let offsetIndex = this.offsetX
        for (let i = 0; i < tiles.length; i++) {
            let index = tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                x += this.offsetX
                let y = (i % h) * this.tileSize
                let img = this.images[index - 1]
                // log('tile', x, y)
                context.drawImage(img.texture, x, y)
            }
        }
    }
}
