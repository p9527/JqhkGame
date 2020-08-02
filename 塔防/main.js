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
    bg: 'images/bg.png',
    bird: 'images/bird.png',
    gun: 'images/gun.png',
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
    // loadImgPathWithName('bird', 'images/', 1, 3)
    var game = GuaGame.instance(images, function() {
        var scene = SceneTitle.new(game)
        // var scene = SceneEnd.new(game)
        game.replaceScene(scene)
    });
    enableDebug(game, true)
}

__main()