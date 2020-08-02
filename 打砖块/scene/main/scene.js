class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.paddle = Paddle(game)
        this.ball = Ball(game)
        this.source = 0
        var ball = this.ball
        var paddle = this.paddle

        // paddle event
        this.registerActions('a', function() {
            paddle.moveLeft()
        })
        this.registerActions('d', function() {
            paddle.moveRight()
        })

        // level init
        loadLevel(game, 1)

        // mouseEvent
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function(event) {
            // log(event)
            let x = event.offsetX
            let y = event.offsetY
            if (ball.hasPoint(x, y)) {
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            enableDrag = false
        })

    }

    update() {
        // log(this.actions)
        var game = this.game
        var ball = this.ball
        var paddle = this.paddle
        var gameover = true

        if (window.paused) {
            return
        }

        ball.move()

        // game over
        if (gameover && ball.y > paddle.y + paddle.h) {
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }

        if (collide(paddle, ball)) {
            log("碰撞")
            ball.yRebound()
        }

        // blocks collide
        for (let i = 0; i < blocks.length; i++) {
            let b = blocks[i]
            if (b.collide(ball)) {
                b.kill()
                // 判断是从x轴撞击 还是y轴
                if (xAxisCollide(b, ball)) {
                    ball.yRebound()
                } else {
                    ball.xRebound()
                }
                this.source += 100
            }
        }
    }

    draw() {
        var game = this.game
        var paddle = this.paddle
        var ball = this.ball
        var source = this.source
        // backgroud
        game.context.fillStyle = "#553";
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

        game.drawImage(paddle)
        game.drawImage(ball)

        for (let i = 0; i < blocks.length; i++) {
            let b = blocks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }

        // sorce
        game.context.fillStyle = "white";
        game.context.fillText(`当前分数: ${source}`, 10, 290)
    }
}