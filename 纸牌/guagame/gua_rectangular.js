class GuaRectangular {
    constructor(game, x, y, w, h, color, fill) {
        this.game = game
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fill = fill
        this.color = color
        this.alive = true
    }

    static new(...args) {
        var i = new this(...args)
        return i
    }

    draw() {
        this.game.context.fillStyle = this.color
        if (this.fill) {
            this.game.context.fillRect(this.x, this.y, this.w, this.h)
        } else {
            this.game.context.clearRect(this.x, this.y, this.w, this.h)
        }
    }
}