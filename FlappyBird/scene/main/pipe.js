class Pipes {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.setupProperty()
        this.setupPipes()
    }
    setupProperty() {
        this.alive = true
        this.columnOfPipe = 3
        this.pipeSpeed = config.pipe_speed.value
        this.columnSpace = config.column_space.value
        this.pipeSpace = config.pipe_space.value
    }
    setupPipes() {
        this.pipes = []
        for (let i = 0; i < this.columnOfPipe; i++) {
            var p1 = GuaImage.new(this.game, 'p1')
            p1.filpX = false
            p1.filpY = true

            var p2 = GuaImage.new(this.game, 'p1')
            p2.filpX = false
            p2.filpY = false

            p1.x = 300 + (this.columnSpace * i) + p1.w
            p2.x = p1.x
            this.setPipeY(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    debug() {
        this.pipeSpeed = config.pipe_speed.value
        this.columnSpace = config.column_space.value
        this.pipeSpace = config.pipe_space.value
    }
    update() {
        var pipes = this.pipes
        for (let i = 0; i < pipes.length; i += 2) {
            let p1 = pipes[i]
            let p2 = pipes[i + 1]
            p1.x -= this.pipeSpeed
            p2.x -= this.pipeSpeed
            if (p1.x < -p1.w) {
                // 重置x为前一个管子的x加columnSpace
                let index = i - 1
                if (i == 0) {
                    index = pipes.length - 1
                }
                // log(index)
                p1.x = pipes[index].x + this.columnSpace + p1.w
                p2.x = p1.x
                this.setPipeY(p1, p2)
            }
        }
    }
    draw() {
        for(let p of this.pipes) {
            var context = p.game.context
            // 保存坐标留到 restore() 恢复
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            // 设置坐标系在图片中心
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.filpX ? -1 : 1
            var scaleY = p.filpY ? -1 : 1
            context.scale(scaleX, scaleY)
            // 角度
            // context.rotate(this.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
    setPipeY(p1, p2) {
        p1.y = randomBetween(-350, -100)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    static new(game) {
        var i = new this(game)
        return i
    }
}