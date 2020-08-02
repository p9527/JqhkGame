class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // log("game start scene")

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var gs = GuaImage.new(game, 'gamestart')
        gs.x = 100
        gs.y = 100
        this.addElement(gs)

        var fg = Ground.new(game)
        this.fg = fg
        this.addElement(fg)

        this.setupInputs()
    }
    setupInputs() {
        // log("setupInputs")
        var self = this
        window.addEventListener('keydown', function(event) {
            var key = event.key
            if (key == 'k') {
                log('game start')
                let s = Scene.new(self.game)
                // window.removeEventListener('keydown', function(){})
                self.game.replaceScene(s)
            }
        })
    }
}
