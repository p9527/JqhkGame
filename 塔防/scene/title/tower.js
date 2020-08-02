class Tower extends GuaImage {
    constructor(game) {
        super(game, 'gun')
        this.setup()
    }
    setup() {
        this.demage = 1
        this.target = null
        this.range = 150
        this.bulletCoolDown = 5
    }
    update() {
        // target 超出范围
        this.checkTargetInRange()
        
        this.fire()
        this.toWardTarget()
    }
    checkTargetInRange() {
        let target = this.target
        if (!this.canAttack(target)) {
            this.target = null
        }
    }
    toWardTarget() {
        let target = this.target
        if (target != null) {
            let v = target.center().sub(this.center()).normal()
            let rotation = arcTriangle(v.x, -v.y)
            // log(rotation)
            this.rotation = rotation
        }
    }
    fire() {
        let target = this.target
        if (this.bulletCoolDown == 0) {
            this.bulletCoolDown = 5
            if (this.enemyExist(target)) {
                log('fire')
                target.getDemage(this.demage)
            }
        } else {
            this.bulletCoolDown--
        }
    }
    findTarget(enemys) {
        if (this.target == null) {
            for (const e of enemys) {
                if (this.canAttack(e)) {
                    this.target = e
                    break
                }
            }
        }
    }
    canAttack(enemy) { 
        let e = enemy
        if (this.enemyExist(e)) {
            let distance = this.center().distance(e.center())
            // log('canAttack distance', distance);
            return distance < this.range
        }
        return false
    }
    enemyExist(enemy) {
        let e = enemy
        return e != null && e.alive
    }

    draw() {
        this.drawRange()
        super.draw()
    }
    drawRange() {
        let context = this.game.context
        let v = this.center()
        let x = v.x
        let y = v.y
        let radius = this.range
        context.fillStyle = 'rgba(200, 200, 200, 0.5)'
        context.beginPath()
        // log(x, y, this.range)
        context.arc(x, y, radius, 0, 2 * Math.PI)
        context.fill()    
    }
}
