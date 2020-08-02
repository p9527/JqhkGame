class Lable {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.x = 0
        this.y = 0
        this.alive = true
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    update() {
    }
    draw() {
        this.game.context.fillStyle = "balck";
        this.game.context.fillText(this.text, this.x, this.y)
    }
}
