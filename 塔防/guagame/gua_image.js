class GuaImage {
    constructor(game, name) {
        this.game = game
        this.name = name
        this.texture = game.imageByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.alive = true

        // draw
        this.flipX = false
        this.alpha = 1
        this.rotation = 0    
    }
    clone() {
        let c = GuaImage.new(this.game, this.name)
        c.x = this.x
        c.y = this.y
        return c
    }
    center() {
        let v = Vector.new(this.x + this.w / 2, this.y + this.h / 2)
        return v
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    pointInFrame(x, y) {
        let xIn = x > this.x && x < this.x + this.w
        let yIn = y > this.y && y < this.y + this.h
        return xIn && yIn
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

}