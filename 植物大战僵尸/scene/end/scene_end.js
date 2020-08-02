class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        // log("this.elements", this.elements)
    }
    setup() {
        this.setupBG()
        this.setupProperty()
        this.setupCoolDown()
        this.setElementList()
        this.setupPlantChoice()
        this.setupPlant()

        this.setupInputs()
    }
    setupProperty() {
        this.offsetX = 170
        this.offsetY = 0

        this.zombieOffsetX = 700
        this.zombieOffsetY = -70

        this.widthOfColumn = 80
        this.heightOfRow = 100
    }
    setupCoolDown() {
        this.maxZombieUpdateCollDowm = 100
        this.zombieUpdateCollDowm = this.maxZombieUpdateCollDowm

        this.maxSunUpdateCollDowm = 100
        this.sunUpdateCollDowm = this.maxSunUpdateCollDowm
    }
    setupPlantChoice() {
        this.choicePlants = []
        let g = this.game
        let ps = GuaImage.new(g, 'peaShooter_idle1')
        ps.x = 0
        ps.y = 0
        ps.planPlant = function () {
            return PeaShooter.new(self.game)
        }
        this.peaShooterChoice = ps
        this.addElement(ps)
        this.choicePlants.push(ps)

        let sf = GuaImage.new(g, 'sunFlower_idle1')
        sf.x = 70
        sf.y = 0
        sf.planPlant = function () {
            return SunFlower.new(self.game)
        }
        this.sunFlowerChoice = sf
        this.addElement(sf)
        this.choicePlants.push(sf)
    }
    setElementList() {
        this.plants = [
            [],[],[],[],[],
        ]
        this.zombies = [
            [],[],[],[],[],
        ]
        this.bullets = [
            [],[],[],[],[],
        ]
    }
    setupBG() {
        let game = this.game
        let bg = GuaImage.new(game, 'bg1')
        this.addElement(bg)
    }
    setupPlant() {
        let game = this.game
        // for (let i = 1; i < 2; i++) {
        //     for (let j = 1; j < 6; j++) {
        //         let ps = PeaShooter.new(game)
        //         this.addPlant(ps, j, i)
        //     }
        // }
    }
    setupInputs() {
        var self = this

        let draging = false
        let touch = false
        self.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY

            let currentChoice = null
            if (self.sunFlowerChoice.pointInFrame(x, y)) {
                currentChoice = self.sunFlowerChoice
                self.planPlant = SunFlower.new(self.game)
                touch = true
            } else if (self.peaShooterChoice.pointInFrame(x, y)) {
                currentChoice = self.peaShooterChoice
                self.planPlant = PeaShooter.new(self.game)
                touch = true
            }
            
            if (status == 'down' && touch) {    
                draging = true
                self.current = currentChoice.clone(self.game)
                self.addElement(self.current)
                // 显示将要放置的当前位置
                self.currentSign = self.current.clone(self.game)
                self.currentSign.alpha = 0.5
                self.addElement(self.currentSign)

            } else if (status == 'move') {
                if (draging) {
                    let ox = x - self.current.w / 2
                    let oy = y - self.current.h / 2
                    self.current.x = ox
                    self.current.y = oy
                    
                    // 显示将要放置的当前位置
                    let sx = Math.floor(ox / this.widthOfColumn) * this.widthOfColumn
                    let sy = Math.floor(oy / this.heightOfRow) * this.heightOfRow
                    self.currentSign.x = sx
                    self.currentSign.y = sy
                }
            } else if (status == 'up' && touch) {
                draging = false
                touch = false

                let [column, row] = this.getPosition(x, y)
                // log(row, column, self.planPlant)
                this.addPlant(self.planPlant, row, column)
                // 清楚放置辅助对象
                self.removeElement(self.current)
                self.removeElement(self.currentSign)
            }
        })
    }
    choicePlant() {
        // for (let plant of this.choicePlant) {
        //     if (plant.pointInFrame(x, y)) {
                
        //     }
        // }
        // if (self.sunFlowerChoice.pointInFrame(x, y)) {
        //     currentChoice = self.sunFlowerChoice
        //     touch = true
        //     self.planPlant = SunFlower.new(self.game)
        // } else if (self.peaShooterChoice.pointInFrame(x, y)) {
        //     currentChoice = self.peaShooterChoice
        //     touch = true
        //     self.planPlant = PeaShooter.new(self.game)
        // }
    }
    getPosition(x, y) {
        let i = Math.floor((x - this.offsetX - this.widthOfColumn) / this.widthOfColumn) + 1
        let j = Math.floor((y - this.offsetY - this.heightOfRow) / this.heightOfRow) + 1
        return [i, j]
    }
    addPlant(plant, row, column) {
        let i = column
        let j = row
        if (i > 6 || i < 1 || j < 1 || j > 5) {
            return 
        }
        let x = this.offsetX + i * this.widthOfColumn
        let y = this.offsetY + j * this.heightOfRow
        plant.x = x
        plant.y = y
        plant.row = row

        this.addElement(plant)
        this.plants[row - 1].push(plant)
    }
    addSun() {
        let x = randomBetween(50, 400)
        let y = 0
        let s = Sun.new(this.game)
        s.x = x
        s.y = y
        log(s)
        this.addElement(s)
    }
    addZombie(zombie, row) {
        let i = row
        let x = 600
        let y = this.zombieOffsetY + i * this.heightOfRow
        zombie.x = x
        zombie.y = y
        zombie.row = row
        this.addElement(zombie)
        this.zombies[row - 1].push(zombie)
    }

    update() {
        super.update()
        this.updateZombie()
        // this.updateSun()
        this.updateFire()
        this.updateHit()
        this.removeDie()
    }
    updateSun() {
        this.sunUpdateCollDowm--
        let game = this.game

        if (this.sunUpdateCollDowm == 0) {
            this.sunUpdateCollDowm = this.maxSunUpdateCollDowm
            this.addSun()
        }
    }
    updateZombie() {
        this.zombieUpdateCollDowm--
        let game = this.game

        if (this.zombieUpdateCollDowm == 0) {
            this.zombieUpdateCollDowm = this.maxZombieUpdateCollDowm
            let row = randomBetween(1, 5)
            let z1 = Zombie.new(game)
            this.addZombie(z1, row)
        }
        
    }
    updateFire() {
        let zombies = this.zombies
        let plants = this.plants
        for (let i = 0; i < zombies.length; i++) {
            let row = zombies[i]
            // log(row)
            if (row.length > 0) {
                // log('row length', row.length, plants[i])
                for (let p of plants[i]) {
                    p.awake()
                }
            } else {
                for (let p of plants[i]) {
                    p.gotoBed()
                }
            }
        }
    }
    updateHit() {
        let zombies = this.zombies
        let bullets = this.bullets
        for (let i = 0; i < bullets.length; i++) {
            let zRow = zombies[i]
            let bRow = bullets[i]
            // log('zrow brow', zRow, bRow)
            for (let b of bRow) {
                for (let z of zRow) {
                    // log('hit', z.x, b.x)
                    if (collide(b, z)) {
                        b.hit(z)
                    }
                }
            }
        }
    }
    removeDie() {
        let zombies = this.zombies
        let bullets = this.bullets
        let plants = this.plants
        for (let i = 0; i < bullets.length; i++) {
            this.bullets[i] = this.bullets[i].filter(e => e.alive == true)
        }
        for (let i = 0; i < zombies.length; i++) {
            this.zombies[i] = this.zombies[i].filter(e => e.alive == true)
        }
        for (let i = 0; i < plants.length; i++) {
            this.plants[i] = this.plants[i].filter(e => e.alive == true)
        }
    }

}
