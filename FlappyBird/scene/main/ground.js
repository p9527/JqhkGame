class Ground {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.alive = true
        this.grounds = []
        for (let i = 0; i < 21; i++) {
            var g = GuaImage.new(this.game, 'fg')
            g.x = 0 + g.w * i
            g.y = 430
            this.grounds.push(g)
        }
        this.fgCoolDown = 3
    }
    update() {
        // log("ground update", this.grounds)
        this.fgCoolDown--
        var offset = -5
        if (this.fgCoolDown == 0) {
            this.fgCoolDown = 3
            offset = 10
        }
        for(let g of this.grounds) {
            g.x += offset
        }
    }
    draw() {
        // log("ground draw", this.grounds)
        for(let g of this.grounds) {
            this.game.drawImage(g)
        }
    }
    static new(game) {
        var i = new this(game)
        return i
    }
}