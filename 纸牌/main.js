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

const loadAnimationImgWithPath = function (images, animationConfig) {
    let ac = animationConfig
    let name = ac.name
    let fPath = ac.fatherPath
    let as = ac.actions
    for (let a of as) {
        let cName = a.name
        let count = a.count
        for (let i = 1; i < count + 1; i++) {
            let k = `${name}_${cName}${i}`
            let v = `${fPath}/${cName}/${cName}${i}.png`
            images[k] = v
        }
    }
}

const loadAllCard = function(images) {
    let f = ['c', 'd', 'h', 's']
    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < f.length; j++) {
            if (i < 10) {
                let name = `${i}${f[j]}`
                let path = `images/0${i}${f[j]}.png`
                images[name] = path
            } else {
                let name = `${i}${f[j]}`
                let path = `images/${i}${f[j]}.png`
                images[name] = path
            }
        }
    }
}

var __main = function() {
    var images = {
        cardr3: 'images/cardr3.png',
        cardra: 'images/cardra.png',
        cardb3: 'images/cardb3.png',
        kabz: 'images/kabz.png',
        shade: 'images/shade.png',
        plmm: 'images/plmm.png',
        down: 'images/down.png',
    }
    loadAllCard(images)
    var game = GuaGame.instance(images, function() {
        // var scene = Scene.new(game)
        var scene = Scene.new(game)
        game.replaceScene(scene)
    });
    enableDebug(game, true)
}

__main()