var Paddle = function(game) {
    var o = game.imageByName('paddle')
    o.x = 200
    o.y = 250
    o.speed = 10

    o.move = function(x) {
        o.x = x
        if (x < 0) {
            o.x = 0
        }
        if (x > game.canvas.width - o.w) {
            o.x = game.canvas.width - o.w
        }
    }

    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    return o
}
