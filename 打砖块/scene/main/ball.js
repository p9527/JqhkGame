var Ball = function(game) {
    var o = game.imageByName('ball')
    var initSpeed = 8
    o.x =  200
    o.y =  200
    o.speedX = initSpeed
    o.speedY =  initSpeed

    o.move = function() {
        if (o.x < 0 || o.x + o.w > game.canvas.width) {
            o.speedX = -o.speedX
        }
        if (o.y < 0 || o.y + o.w > game.canvas.height) {
            o.speedY = -o.speedY
        }
        o.x += o.speedX
        o.y += o.speedY
    }

    o.yRebound = function() {
        o.speedY *= -1
    }

    o.xRebound = function() {
        o.speedX *= -1
    }


    o.hasPoint = function(x, y) {
        var xIn = x > o.x && x < o.x + o.w
        var yIn = y > o.y && y < o.y + o.h
        return xIn && yIn
    }
    return o
}
