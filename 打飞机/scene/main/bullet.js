class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        if (this.y < 0) {
            this.alive = false
            return
        }
        
        this.move()
    }
    debug() {
    }
    move() {
        this.y -= this.speed
    }
}