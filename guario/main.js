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
}

const loadImgPathWithName = function(name, path, start, end) {
    for (let i = start; i < end + 1; i++) {
        let s = `images['${name}${i}'] = '${path}${name}${i}.png'`
        // log(s)
        eval(s)
    }
}

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}


var __main = function() {
    // load more images
    loadImgPathWithName('t', 'images/', 1, 3)
    // 
    let tileOffset =32784
    window.offset = tileOffset
    // window.offset = 0
    let request = {
        url: 'mario.nes',
        callback(r) {
            let bytes = new Uint8Array(r)
            window.bytes = bytes
            // log('bytes', bytes)
            var game = GuaGame.instance(images, function() {
                // var scene = SceneTitle.new(game)
                var scene = SceneEditor.new(game)
                game.replaceScene(scene)
            });
            enableDebug(game, true)
        }
    }
    ajax(request)
}

__main()