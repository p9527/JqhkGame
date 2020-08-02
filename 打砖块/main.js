var blocks = []
var loadLevel = function(game, n) {
    n = n -1
    var level = levels[n]
    blocks = []
    let imgWidth = 50
    let imgHeight = 20
    let blocksWidth = 8
    let blocksHeight = 15
    for (let i = 0; i < blocksHeight; i++) {
        let y = i * imgHeight;
        for (let j = 0; j < blocksWidth; j++) {
            let x = j * imgWidth
            let index = i * blocksWidth + j
            let life = level[index]
            if (life != 0) {
                let p = [x, y, life]
                let b = Block(game, p)
                blocks.push(b)
            }
        }
    }
}

var enableDebug = function(game, enable) {
    window.paused = false
    if (!enable) {
        return
    }
    
    window.addEventListener('keydown', function(event) {
        var key = event.key
        if (key == 'p') {
            window.paused = !window.paused
        } else if ('123'.includes(key)) {
            loadLevel(game, Number(key))
        }
    })

    var fpsInput = e("#id-input-fps")
    fpsInput.addEventListener('input', function(event) {
        var input = event.target
        window.fps = input.value
    })
}

var initLevel = function() {
    if (localStorage['levels'] == null || localStorage['levels'] == "") {
    } else {
        let ls = JSON.parse(localStorage['levels'])
        levels = ls
    }
}

var __main = function() {
    var images = {
        ball: 'images/testball.png',
        block1: 'images/block1.png',
        block2: 'images/block2.png',
        block3: 'images/block3.png',
        paddle: 'images/testpaddle.png',
    }
    initLevel()
    var game = GuaGame.instance(images, function() {
        var scene = Scene.new(game)
        game.replaceScene(scene)
    });
    enableDebug(game, true)
    window.game = game
}

__main()