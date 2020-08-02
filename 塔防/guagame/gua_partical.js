class Partical extends GuaImage {
    constructor(game) {
        super(game, 'fire')
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        var factor = -0.1
        this.x += this.vx 
        this.y += this.vy
        this.vx += this.vx * factor
        this.vy += this.vy * factor
    }
    debug() {
    }
}

class GuaParticalSystem {
    constructor(game, x, y) {
        this.game = game
        this.alive = true
        this.x = x
        this.y = y
        this.setup()
    }
    static new(game, x, y) {
        var i = new this(game, x, y)
        return i
    }

    setup() {
        this.duration = 30
        this.numberOfPartical = 100
        this.particals = []
        for (let i = 0; i < this.numberOfPartical; i++) {
            var p = Partical.new(this.game)
            var hudu = (2 * Math.PI / 360) * i * 360 / this.numberOfPartical;
            var s = 10
            var vx = Math.sin(hudu) * s
            var vy = Math.cos(hudu) * s
            p.init(this.x, this.y, vx, vy)
            this.particals.push(p)
        }
    }

    update() {
        this.duration--
        if (this.duration == 0) {
            this.alive = false
        }
        for(let p of this.particals) {
            p.update()
        }
    }

    draw() {
        for(let p of this.particals) {
            this.game.drawImage(p)
        }
    }
}