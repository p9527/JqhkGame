class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.registerActions('r', function () {
            let s = Scene.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        // backgroud
        var game = this.game
        game.context.fillStyle = "#553";
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

        // sorce
        game.context.fillStyle = "white";
        game.context.fillText(`Game Over`, 200, 150)
    }
}
