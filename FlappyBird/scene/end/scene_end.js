class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        // log("game start scene")

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var gs = GuaImage.new(game, 'gameover')
        gs.x = 100
        gs.y = 100
        this.addElement(gs)

        var fg = Ground.new(game)
        this.fg = fg
        this.addElement(fg)

        var t = Lable.new(game, "R 重新开始")
        t.x = 150
        t.y = 400
        this.addElement(t)

        this.setupInputs()
    }
    setupInputs() {
        // log("setupInputs")
        var self = this
        window.addEventListener('keydown', function(event) {
            var key = event.key
            if (key == 'r') {
                log('game start')
                let s = Scene.new(self.game)
                // window.removeEventListener('keydown', function(){})
                self.game.replaceScene(s)
            }
        })
    }
}
