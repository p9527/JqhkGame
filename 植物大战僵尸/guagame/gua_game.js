class GuaGame {
    constructor(images, runCallBack) {
        // images 是一个对象, 里面是图片引用名字和路径
        var canvas = e("#id-canvas")
        var context = canvas.getContext('2d')
        this.canvas = canvas
        this.context = context
        this.scene = null
        this.actions = {}
        this.keyDowns = {}
        this.images = images
        this.runCallBack = runCallBack
        window.fps = 30

        // addEvents
        var g = this
        window.addEventListener('keydown', function(event) {
            var key = event.key
            g.keyDowns[key] = 'down'
        })
        window.addEventListener('keyup', function(event) {
            var key = event.key
            g.keyDowns[key] = 'up'
        })

        // mouse events
        let moving = false
        window.addEventListener('mousedown', function (event) {
            moving = true
            g.callAllMouseActions(event, 'down')
        })
        window.addEventListener('mousemove', function (event) {
            if (moving) {
                g.callAllMouseActions(event, 'move')
            }
        })
        window.addEventListener('mouseup', function (event) {
            moving = false
            g.callAllMouseActions(event, 'up')
        })

        this.init()
    }
    callAllMouseActions(event, status) {
        for (let a of this.scene.mouseActions) {
            a(event, status)
        }
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    registerActions(key, callback) {
        this.actions[key] = callback
    }

    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y);
    }

    update() {
        if (window.paused) {
            return
        }
        this.scene.update && this.scene.update()
    }

    draw() {
        // log('guagame draw')
        this.scene.draw && this.scene.draw()
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runloop() {
        // log(window.fps)
        // update
        var g = this
        var keys = Object.keys(g.actions)
        for (let i = 0; i < keys.length; i++) {
            var k = keys[i]
            let keyStatus = g.keyDowns[k]
            if (keyStatus == 'down') {
                g.actions[k](keyStatus)
            } else if (keyStatus == 'up') {
                g.actions[k](keyStatus)
                g.keyDowns[k] = null
            }
        }
        g.update()
        // draw
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);
        g.draw()

        setTimeout(function() {
            g.runloop()
        }, 1000/window.fps)
    }

    run() {
        var g = this
        setTimeout(function() {
            g.runloop()
        }, 1000/window.fps)
    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        return img
    }

    init() {
        // log("images", this.images)
        var g = this
        var names = Object.keys(g.images)
        // 验证图片是否加载完
        var list = []
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                list.push(1)
                g.images[name] = img
                // 所有图片载入完
                if (list.length == names.length) {
                    log("game images", g.images)
                    // 开始游戏
                    g.runCallBack()
                    g.run()
                }
            }
        }
    }

}
