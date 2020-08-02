class Fjplqu extends GuaRectangular {
    constructor(game) {
        super(game, 100, 0, 104, 140, 'orange', true)
        this.setup()
    }

    setup() {

    }
    update() {

    }
    debug() {
    }

    pointInFrame(x, y) {
        let xIn = x > this.x && x < this.x + this.w
        let yIn = y > this.y && y < this.y + this.h
        return xIn && yIn
    }
}