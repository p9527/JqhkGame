class Enemy extends GuaImage {
    constructor(game) {
        super(game, 'bird')
        this.setup()
    }
    setup() {
        this.destination = 550
        this.maxBlood = 15
        this.blood = this.maxBlood
        this.speed = 2
        this.tileSize = 100
        //
        this.stepIndex = 0
        this.steps = []
    }
    updatePath(result) {
        let steps = []
        for (let r of result) {
            let i = r.x * this.tileSize
            let j = r.y * this.tileSize
            steps.push([i, j])
        }
        this.stepIndex = 0
        this.steps = steps
    }
    update() {
        if (this.steps.length <= 0) {
            return
        }
        // log(this.steps, this.stepIndex)
        let [dx, dy] = this.steps[this.stepIndex]
        let signX = dx > this.x ? 1 : -1
        let signY = dy > this.y ? 1 : -1
        if (dx == this.x) {
            signX = 0
        }
        if (dy == this.y) {
            signY = 0
        }
        this.x += this.speed * signX
        this.y += this.speed * signY
        if (this.x == dx && this.y == dy) {
            // log("敌人抵达目标点")
            if (this.stepIndex == this.steps.length - 1) {
                // log("敌人抵达抵达终点")
                this.alive = false
            } else {
                this.stepIndex++
            }
        }
    }
    getDemage(demage) {
        this.blood -= demage
        if (this.blood <= 0) {
            this.alive = false
        }
    }
    draw() {
        this.drawBloodBar()
        super.draw()
    }
    drawBloodBar() {
        let context = this.game.context
        let h = 10
        let w = 100
        let x = this.x
        let y = this.y - h
        context.fillStyle = 'red'
        context.fillRect(x, y, w, h)

        context.fillStyle = 'green'
        let w1 = w * (this.blood / this.maxBlood)
        context.fillRect(x, y, w1, h)
    }
}