class Animation {
    constructor(game, animationConfig) {
        this.game = game
        this.animations = {}
        this.alive = true
        this.flipX = false
        this.alpha = 1
        this.rotation = 0
        
        // 大配置换成小配置
        this.animationsCount = this.bigConfigToSmallConfig(animationConfig)
        // log(this.animationsCount)
        this.loadAllAnmiation()

        // 第一个状态
        this.animationStatus = Object.keys(this.animationsCount)[0]
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        // update
        this.framesIndex = 0
        this.maxFramesCount = 5
        this.framesCount = this.maxFramesCount
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    frames() {
        return this.animations[this.animationStatus]
    }
    update() {
        this.framesCount--
        if (this.framesCount == 0) {
            this.framesCount = this.maxFramesCount
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
    // 大配置转成小配置
    bigConfigToSmallConfig(bigConfig) {
        // let animationZombie = {
        //     name: 'bhZombie',
        //     fatherPath: 'images/bhZombie',
        //     actions: [
        //         {
        //             name: 'walk',
        //             count: 15,
        //         },
        //         {
        //             name: 'attack',
        //             count: 11,
        //         },
        //     ]
        // }
        // let animationsCount = {
        //     bhZombie_walk: 15,
        //     bhZombie_attack: 11,
        // }
        let bc = bigConfig
        let smallConfig = {}
        for (let a of bc.actions) {
            let k = `${bc.name}_${a.name}`
            let v = a.count
            smallConfig[k] = v
        }
        return smallConfig
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