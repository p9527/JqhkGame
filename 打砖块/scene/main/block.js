var Block = function(game, position) {
    // position 是 [0, 0,] 这样的格式
    var p = position
    var name = `block${p[2]}`
    var o = game.imageByName(name)
    o.x = p[0]
    o.y = p[1]
    o.lifes = p[2] || 1,
    o.alive = true
    o.game = game
    
    o.kill = function() {
        // log(o.lifes, o.alive)
        o.lifes -= 1
        if (o.lifes == 0) {
            o.alive = false
        } else {
            // change block img
            var name = `block${o.lifes}`
            o.image = o.game.imgByName(name)
        }
    }

    o.collide = function(obj) {
        return o.alive && collide(obj, o)
    }

    return o
}
