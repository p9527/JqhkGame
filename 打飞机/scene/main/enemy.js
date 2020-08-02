class Enemy extends GuaImage {
    constructor(game) {
        var n = randomBetween(0, 4)
        var name = `enemy${n}`
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = 2
        var x = randomBetween(0, 350)
        var y = -randomBetween(0, 200)
        this.x = x
        this.y = y

        this.maxCoolDown = 30
        this.coolDown = this.maxCoolDown
    }
    update() {
        this.moveDown()
        
        this.coolDown--
        if (this.coolDown == 0) {
            this.coolDown = this.maxCoolDown
            let random = randomBetween(0, 2)
            if (random < 1) {
                let b = EnemyBullet.new(this.game)
                b.x = this.x + this.w / 2
                b.y = this.y + this.h
                b.speed = this.speed + 3
                this.scene.addEnemyBullet(b)
            }
        }
    }
    debug() {
        this.speed = config.enemy_speed
    }
    moveDown() {
        this.y += this.speed
        if (this.y > this.game.canvas.height) {
            this.setup()
        }
    }
}