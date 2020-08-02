class Scene extends GuaScene {
    constructor(game) {
        super(game)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var fg = Ground.new(game)
        this.fg = fg
        this.addElement(fg)

        let mario = GuaNesSprite.new(game)
        mario.x = 200
        mario.y = 200
        this.mario = mario
        this.addElement(mario)

        this.setupInputs()
    }
    setupInputs() {
        var self = this
        var b = this.mario
        self.game.registerActions('a', function(keyStatus) {
            b.move(-b.speedX, keyStatus)
        })
        self.game.registerActions('d', function(keyStatus) {
            b.move(b.speedX, keyStatus)
        })
        self.game.registerActions('j', function(keyStatus) {
            b.jump()
        })
    }
}
