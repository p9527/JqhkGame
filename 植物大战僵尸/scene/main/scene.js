class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.numberOfEnemy = 5
        this.bg = GuaImage.new(game, 'bg')
        this.player = Player.new(game, 'player')
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addEnemies()
    }

    addEnemies() {
        var g = this.game
        var es = []
        for (let i = 0; i < this.numberOfEnemy; i++) {
            var e = Enemy.new(g)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    update() {
        super.update()
        this.enemies = this.enemies.filter(p => p.alive == true)
        if (this.enemies.length == 0) {
            this.addEnemies()
        }
    }

}