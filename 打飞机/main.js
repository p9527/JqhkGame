var enableDebug = function(game, enable) {
    window.paused = false
    if (!enable) {
        return
    }
    
    window.addEventListener('keydown', function(event) {
        var key = event.key
        if (key == 'p') {
            window.paused = !window.paused
        }
    })

    var fpsInput = e("#id-input-fps")
    fpsInput.addEventListener('input', function(event) {
        var input = event.target
        window.fps = input.value
    })
}

var images = {
    player: 'images/player.png',
    enemy: 'images/enemy.png',
    bullet: 'images/bullet.png',
    bg: 'images/bg.png',
    fire: 'images/fire.png',
    enemy_bullet: 'images/enemy_bullet.png',
}

const loadImgPathWithName = function(name, path, start, end) {
    for (let i = start; i < end + 1; i++) {
        let s = `images['${name}${i}'] = '${path}${name}${i}.png'`
        // log(s)
        eval(s)
    }
}

var __main = function() {
    // load more images
    loadImgPathWithName('enemy', 'images/', 0, 4)

    var game = GuaGame.instance(images, function() {
        var scene = Scene.new(game)
        // var scene = SceneEnd.new(game)
        game.replaceScene(scene)
    });
    enableDebug(game, true)
}

__main()