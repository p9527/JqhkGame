class GuaNesSprite {
    constructor(game, map) {
        // animation
        this.game = game
        this.alive = true
        this.flipX = false
        this.alpha = 1
        this.rotation = 0

        // map
        this.map = map
        this.tileSize = map.tileSize

        // sprite
        this.rowsOfSprite = 4
        this.columnsOfSprite = 2
        this.pixelSize = 8   // 8个像素 组成 block的一行 总共 8 行
        this.pixelWidth = 2 // 让一个像素 1 * 1 变成 10 * 10 (放大像素
        this.bytesPerBlock = 16 // 一个 block 需要 16个 字节
        this.bytesPerSprite = this.bytesPerBlock * this.rowsOfSprite * this.columnsOfSprite
        // bytes
        this.data = window.bytes
        //
        this.framesIndex = 0
        this.framesCount = 3
        // mario
        this.vy = 0
        this.gy = 2
        // 加速度和摩擦力
        this.speedX = 1
        this.vx = 0
        this.mx = 0
        this.maxSpeed = 8

        this.speedY = 10
        this.w = this.columnsOfSprite * this.pixelSize * this.pixelWidth
        this.h = this.rowsOfSprite * this.pixelSize * this.pixelWidth
    }
    static new(...args) {
        // log(...args)
        var i = new this(...args)
        return i
    }
    jump() {
        this.vy = -this.speedY
        this.framesIndex = 4
        this.framesCount = 5
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        // maxSpeed
        if (Math.abs(this.vx) < this.maxSpeed) {
            let s = x
            if (keyStatus == 'down') {
                this.vx += s
                this.mx = -s / 2
            }
        }        
    }
    update() {
        this.updateGravity()

        this.updateMove()

        this.framesCount--
        if (this.framesCount == 0) {
            this.framesCount = 3
            this.framesIndex += 1
            this.framesIndex %= 3
        }
    }
    updateMove() {
        // 加上地图offset


        this.vx += this.mx
        // 加速度 摩擦力
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        } else {
            this.x += this.vx
        }
        // 判断左右墙
        if (this.flipX) {
            let tileSize = this.tileSize
            let offsetX = this.x - this.w / 2
            var i = Math.floor((offsetX) / tileSize)
            var j = parseInt(this.y / tileSize)
            let onTheGround1 = this.map.onTheGround(i, j)
            // log(onTheGround)
            if (onTheGround1) {
                this.vx = 1
                this.mx = -1

            }
        } else {
            let tileSize = this.tileSize
            let offsetX = this.x + this.w / 2
            var i = Math.floor((offsetX) / tileSize) + 1
            var j = parseInt(this.y / tileSize)
            let onTheGround1 = this.map.onTheGround(i, j)
            
            if (onTheGround1) {
                this.vx = -1
                this.mx = 1
            }
        }
    }

    updateGravity() {
        let tileSize = this.map.tileSize
        let offsetX = this.x - this.map.offsetX
        let i = parseInt(offsetX / tileSize)
        let j = Math.floor(this.y / tileSize)
        // log(i, j)
        // 最左边
        let rightOnTHeGround = this.map.onTheGround(i, j + 2)
        // 最右边
        let leftOnTheGround = this.map.onTheGround(i + 1, j + 2)
        
        let onTheGround = rightOnTHeGround || leftOnTheGround
        // log(onTheGround, rightOnTHeGround, leftOnTheGround)
        if (onTheGround && this.vy > 0) {
            // log(onTheGround)
            this.vy = 0
        } else {
            this.y += this.vy
            this.vy += this.gy
            // 陷入地面 拔出来
            let j = Math.floor(this.y / tileSize) + 2
            let onTheGround = this.map.onTheGround(i, j)
            if (onTheGround) {
                this.y = (j - 2) * tileSize
            }
        }

        // 判断上面的墙
        let rightTopHaveBLock = this.map.onTheGround(i, j)
        let leftTopHaveBLock = this.map.onTheGround(i + 1, j)

        let topHaveBlock = rightTopHaveBLock || leftTopHaveBLock
        // log(topHaveBlock, rightTopHaveBLock, leftTopHaveBLock, i, j)
        if (topHaveBlock && this.vy < 0) {
            this.vy = 0
            this.y = (j + 1) * tileSize
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
        this.drawSprite()

        context.restore()
    }

    drawSprite() {
        var context = this.game.context
        let pixelSize = this.pixelSize   // 8个像素 组成 block的一行 总共 8 行
        let pixelWidth = this.pixelWidth // 让一个像素 1 * 1 变成 10 * 10 (放大像素
        let bytesPerBlock = this.bytesPerBlock // 一个 block 需要 16个 字节

        let rowsOfSprite = this.rowsOfSprite
        let columnsOfSprite = this.columnsOfSprite
        let tileOffset = 32784
        let offset = tileOffset + (this.framesIndex * this.bytesPerSprite)

        let data = this.data.slice(offset)

        for (let i = 0; i < rowsOfSprite; i++) {
            for (let j = 0; j < columnsOfSprite; j++) {
                let x = j * pixelSize * pixelWidth // 算出每个block的 x
                let y = i * pixelSize * pixelWidth  // 算出每个block的 y
                let index = (i * columnsOfSprite + j) * bytesPerBlock
                this.drawBlock(context, data.slice(index), x, y)
            }
        }
    }

    drawBlock(context, data, x, y) {
        // log(context, canvas)
        let colors = [
            'white',
            '#FE1000',
            '#FFB010',
            '#AA3030',
        ]
        let w = this.pixelWidth
        let h = this.pixelWidth
        for (let i = 0; i < 8; i++) {
            // 关键 p1 与 p2 隔 8
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                let c1 = (p1 >> (7 - j)) & 1
                let c2 = (p2 >> (7 - j)) & 1
                // let pixel = (c1 << 1) + c2
                let pixel = (c2 << 1) + c1
                if (pixel == 0) {
                    continue
                }
                // log(pixel)
                let color = colors[pixel]
                context.fillStyle = color
                // log("color")
                let cx = x + (w * j)
                let cy = y + (h * i)
                context.fillRect(cx, cy, w, h)
            }
        }
    }
}
    
