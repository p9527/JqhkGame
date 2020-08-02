class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        
        let tilemap = GuaTileMap.new(game, tilesConfig)
        this.addElement(tilemap)

        let mario = GuaNesSprite.new(game, tilemap)
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
