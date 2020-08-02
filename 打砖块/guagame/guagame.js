class GuaGame {
    constructor(images, runCallBack) {
        // images 是一个对象, 里面是图片引用名字和路径
        var canvas = e("#id-canvas")
        var context = canvas.getContext('2d')
        this.canvas = canvas
        this.context = context
        this.scene = null
        this.images = images
        this.runCallBack = runCallBack
        window.fps = 30

        // addEvents
        var g = this
        window.addEventListener('keydown', function(event) {
            var key = event.key
            g.scene.keyDowns[key] = true
        })
        window.addEventListener('keyup', function(event) {
            var key = event.key
            g.scene.keyDowns[key] = false
        })

        this.init()
    }

    init() {
        var g = this
        var names = Object.keys(g.images)
        // 验证图片是否加载完
        var list = []
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
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

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    registerActions(key, callback) {
        this.actions[key] = callback
    }

    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y);
    }

    update() {
        this.scene.update && this.scene.update()
    }

    draw() {
        this.scene.draw && this.scene.draw()
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runloop() {
        // log(window.fps)
        // update
        var g = this
        // key event
        let s = g.scene
        var keys = Object.keys(s.actions)
        for (let i = 0; i < keys.length; i++) {
            var k = keys[i]
            // log("scene", s, keys, s.keyDowns[k])
            if (s.keyDowns[k]) {
                s.actions[k]()
            }
        }
        g.update()
        // draw
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);
        g.draw()

        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }

    run() {
        var g = this
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        var image = {
            image: img,
            w: img.width,
            h: img.height,
        }
        return image
    }

    imgByName(name) {
        var img = this.images[name]
        return img
    }
}
