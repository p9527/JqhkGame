class EnemyBullet extends GuaImage {
    constructor(game) {
        super(game, 'enemy_bullet')
        this.setup()
    }

    setup() {
        this.speed = 1
    }
    update() {
        if (this.y > 600) {
            this.alive = false
            return
        }
        this.move()
    }
    debug() {
    }
    move() {
        this.y += this.speed
    }
}