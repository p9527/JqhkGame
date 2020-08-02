class Lable {
    constructor(game, text) {
        this.game = game
        this.text = text
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
        this.game.context.fillText(this.text, 200, 150)
    }
}
