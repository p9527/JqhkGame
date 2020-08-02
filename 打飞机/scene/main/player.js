class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        var p = this
        this.speed = 5
        this.x = 200
        this.y = 400
        this.bulletCoolDown = 9
        this.lifes = 5
    }

    fire() {
        if (this.bulletCoolDown == 0) {
            this.bulletCoolDown = config.bullet_coolDown
            var b = Bullet.new(this.game)
            b.x = this.x + this.w / 2
            b.y = this.y
            this.scene.addBullet(b)
        }
    }
    getDamage() {
        this.lifes--
        if (this.lifes == 0) {
            this.die()
        }
    }

    update() {
        if (this.bulletCoolDown > 0){
            // log(this.bulletCoolDown)
            this.bulletCoolDown -= 1
        }
    }
    debug() {
        this.speed = config.player_speed
    }

    xMove(x) {
        this.x = x
        if (x < 0) {
            this.x = 0
        } else if (x > this.game.canvas.width - this.w) {
            this.x = this.game.canvas.width - this.w
        }
    }

    yMove(y) {
        this.y = y
        if (y < 0) {
            this.y = 0
        } else if (y > this.game.canvas.height - this.h) {
            this.y = this.game.canvas.height - this.h
        }
    }
}