class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.enemys = []
        this.towers = []
        this.addEnemyCount = 0
        // debug
        this.debugPath = null
        this.setupBG()
        this.setupElement()
        this.setupInputs()       
    }
    setupBG() {
        let game = this.game
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        // map
        let map = TDMap.new(game)
        this.map = map
    }
    setupElement() {
        this.addGunChoise()
        this.addEnemys()
    }
    addGunChoise() {
        // gun choise
        let game = this.game
        let bird = GuaImage.new(game, 'gun')
        bird.x = 500
        bird.y = 300
        this.bird = bird
        this.addElement(bird)
    }
    addEnemys() {
        let game = this.game
        let e1 = Enemy.new(game)
        e1.x = 0
        e1.y = 100
        this.enemys.push(e1)
        this.addElement(e1)
        this.changeEnemisPath()
    }
    addTower(x, y) {
        let i = Math.floor(x / 100)
        let j = Math.floor(y / 100)
        x = i * 100
        y = j * 100
        let t = Tower.new(this.game)
        t.x = x
        t.y = y
        this.addElement(t)
        this.towers.push(t)
        // change map
        this.map.setWall(i, j)
        this.changeEnemisPath()
    }
    changeEnemisPath() {
        for (let e of this.enemys) {
            let i = Math.floor(e.x / e.tileSize)
            let j = Math.floor(e.y / e.tileSize)
            // log(i ,j)
            let result = this.map.findPath(i, j)
            e.updatePath(result)
            // log('change path result', result)
            this.debugPath = result
        }
    }
    
    setupInputs() {
        var self = this
        // 放置 tower
        let draging = false
        self.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY

            let touchBird = self.bird.pointInFrame(x, y)

            if (status == 'down' && touchBird) {
                draging = true
                self.tower = self.bird.clone(self.game)
                self.addElement(self.tower)

                // 显示将要放置的当前位置
                self.signTower = self.bird.clone(self.game)
                self.signTower.alpha = 0.5
                self.addElement(self.signTower)

            } else if (status == 'move') {
                if (draging) {
                    let ox = x - 50
                    let oy = y - 50
                    self.tower.x = ox
                    self.tower.y = oy

                    // 显示将要放置的当前位置
                    let sx = Math.floor(ox / 100) * 100
                    let sy = Math.floor(oy / 100) * 100
                    self.signTower.x = sx
                    self.signTower.y = sy
                }
            } else {
                draging = false
                self.addTower(self.tower.x, self.tower.y)
                self.removeElement(self.tower)
                self.removeElement(self.signTower)
            }
        })
    }
    draw() {
        super.draw()
        this.drawDebugPath()
    }
    drawDebugPath() {
        let context = this.game.context
        for (let r of this.debugPath) {
            let i = r.x
            let j = r.y
            let x = i * 100
            let y = j * 100
            let w = 100
            let h = 100
            context.fillStyle = 'rgba(100, 100, 200, 0.4)'
            context.fillRect(x, y, w, h)
        }
    }
    update() {
        super.update()
        for (let t of this.towers) {
            t.findTarget(this.enemys)
        }
        if (this.addEnemyCount == 0) {
            this.addEnemyCount = 30
            this.addEnemys()
        } else {
            this.addEnemyCount--
        }
    }
}
