class Bird extends Animation {
    constructor(game) {
        var animationsCount = {
            bird: 3,
        }
        super(game, animationsCount)
        this.setup()
    }
    setup() {
        this.vy = 0
        this.gy = 2
        this.speedX = 10
        this.speedY = 20
        this.unableUpdate = false
        // log(this)
    }
    debug() {
        this.speedY = config.bird_speed.value
    }
    update() {
        super.update()
        if (this.unableUpdate) {
            return
        }
        if (this.rotation < 45) {
            this.rotation += 5
        }

        this.y += this.vy
        this.vy += this.gy
        if (this.y > 400) {
            this.y = 400
        }    
    }
    kill() {
        this.alive = false
    }
    jump() {
        this.vy = -this.speedY
        this.rotation = -45
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
    }
    hasPoint(x, y) {
        var o = this
        var xIn = x > o.x && x < o.x + o.w
        var yIn = y > o.y && y < o.y + o.h
        return xIn && yIn
    }
}