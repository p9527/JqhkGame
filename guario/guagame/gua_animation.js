class Animation {
    constructor(game, animationsCount) {
        this.animationsCount = animationsCount        
        this.game = game
        this.animations = {}
        this.alive = true
        this.flipX = false
        this.alpha = 1
        this.rotation = 0
        this.framesIndex = 0
        this.framesCount = 3
        this.loadAllAnmiation()
        // 初始化animationStatus, 得到 w, h
        var name = Object.keys(animationsCount)[0]
        this.animationStatus = name
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, animationsCount) {
        var i = new this(game, animationsCount)
        return i
    }
    frames() {
        return this.animations[this.animationStatus]
    }
    update() {
        this.framesCount--
        if (this.framesCount == 0) {
            this.framesCount = 1
            this.framesIndex++
            let index = (this.framesIndex + 1) % (this.frames().length - 1)
            this.texture = this.frames()[index]
            // log('animation update', this.texture, index)
        }
    }
    draw() {
        var context = this.game.context
        // 保存坐标留到 restore() 恢复
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        // 设置坐标系在图片中心
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        // 透明
        context.globalAlpha = this.alpha
        // 角度
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    changeAnimationStatus(name) {
        this.animationStatus = name
    }
    // 载入图片
    loadAllAnmiation() {
        let names = Object.keys(this.animationsCount)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let count = this.animationsCount[name]
            this.loadAnimations(name, count)
        }
    }
    loadAnimations(name, count) {
        this.animations[name] = []
        for (let i = 1; i < count + 1; i++) {
            let imgName = `${name}${i}`;
            let img = this.game.imageByName(imgName)
            this.animations[name].push(img)
        }
    }
}