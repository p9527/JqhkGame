class Scene extends GuaScene {
    constructor(game) {
        super(game)

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        var fg = Ground.new(game)
        this.fg = fg
        this.addElement(fg)

        var b = Bird.new(game)
        this.addElement(b)
        b.x = 100
        b.y = 200
        this.bird = b

        var p = Pipes.new(game)
        this.pipes = p
        this.addElement(p)

        var s = Source.new(game)
        this.source = s
        this.addElement(s)

        this.setupInputs()
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerActions('a', function(keyStatus) {
            b.move(-b.speedX, keyStatus)
        })
        self.game.registerActions('d', function(keyStatus) {
            b.move(b.speedX, keyStatus)
        })
        self.game.registerActions('j', function(keyStatus) {
            b.jump()
        })
        // mouseEvent
        var enableDrag = false
        var ball = this.bird
        var game = this.game
        game.canvas.addEventListener('mousedown', function(event) {
            // log(event)
            let x = event.offsetX
            let y = event.offsetY
            if (ball.hasPoint(x, y)) {
                enableDrag = true
                ball.unableUpdate = true
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            if (enableDrag) {
                ball.x = x - ball.w / 2
                ball.y = y - ball.h / 2
                // log(x, y, ball.x, ball.y)
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            enableDrag = false
            ball.unableUpdate = false
        })
    }
    update() {
        super.update()
        // 死亡
        let pipes = this.pipes.pipes
        let bird = this.bird
        for (let p of pipes) {
            if (collide(bird, p)) {
                bird.kill()
                var self = this
                let s = SceneEnd.new(self.game)
                // window.removeEventListener('keydown', function(){})
                self.game.replaceScene(s)
            }
        }
        // 得分
        for (let i = 0; i < pipes.length; i += 2) {
            let p1 = pipes[i]
            // log("得分前", bird.x, p1.x + p1.w)
            if (bird.x == p1.x + p1.w && bird.alive) {
                // log("得分", bird.x, p1.x + p1.w)
                this.source.add()
            }
        }
    }
}
