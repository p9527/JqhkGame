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

var __main = function() {
    var images = {
        bg1: 'images/bg1.png',
        pb1: 'images/pb1.gif',
        bg1Hit: 'images/bg1Hit.gif',
    }
    let animationBHZombie = {
        name: 'bhZombie',
        fatherPath: 'images/bhZombie',
        actions: [
            {
                name: 'walk',
                count: 15,
            },
            {
                name: 'attack',
                count: 11,
            },
        ]
    }
    let animationZombie = {
        name: 'zombie',
        fatherPath: 'images/zombie',
        actions: [
            {
                name: 'run',
                count: 22,
            },
            {
                name: 'attack',
                count: 21,
            },
        ]
    }
    let animationSun = {
        name: 'sun',
        fatherPath: 'images/sun',
        actions: [
            {
                name: 'idle',
                count: 29,
            },
        ]
    }
    let animationSunFlower = {
        name: 'sunFlower',
        fatherPath: 'images/sunFlower',
        actions: [
            {
                name: 'idle',
                count: 18,
            },
        ]
    }
    let animationPeashooter = {
        name: 'peaShooter',
        fatherPath: 'images/peaShooter',
        actions: [
            {
                name: 'idle',
                count: 13,
            },
        ]
    }
    loadAnimationImgWithPath(images, animationBHZombie)
    loadAnimationImgWithPath(images, animationZombie)
    loadAnimationImgWithPath(images, animationPeashooter)

    loadAnimationImgWithPath(images, animationSun)
    loadAnimationImgWithPath(images, animationSunFlower)
    
    var game = GuaGame.instance(images, function() {
        // var scene = Scene.new(game)
        var scene = SceneEnd.new(game)
        game.replaceScene(scene)
    });
    enableDebug(game, true)
}

__main()