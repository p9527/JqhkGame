class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        let game = this.game
        this.numberOfEnemy = 5
        this.bg = GuaImage.new(game, 'bg')
        this.player = Player.new(game, 'player')
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addEnemies()

        this.bullets = []
        this.EnemyBullets = []

        this.setupInputs()
    }
    setupInputs() {
        // event
        let p = this.player
        this.registerActions('w', function () {
            p.yMove(p.y - p.speed)
        })
        this.registerActions('s', function () {
            p.yMove(p.y + p.speed)
        })
        this.registerActions('a', function () {
            p.xMove(p.x - p.speed)
        })
        this.registerActions('d', function () {
            p.xMove(p.x + p.speed)
        })
        this.registerActions('j', function () {
            p.fire()
        })
    }

    addEnemies() {
        var g = this.game
        var es = []
        for (let i = 0; i < this.numberOfEnemy; i++) {
            var e = Enemy.new(g)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    addBullet(bullet) {
        this.addElement(bullet)
        this.bullets.push(bullet)
    }
    addEnemyBullet(bullet) {
        this.addElement(bullet)
        this.EnemyBullets.push(bullet)
    }

    update() {
        super.update()
        this.clearDieElement()
        this.updateEnemies()
        this.updateBulletHit()
        this.updatePlayerCollideEnemies()
        this.updateEnemyBulletHit()
    }
    updateEnemies() {
        if (this.enemies.length == 0) {
            this.addEnemies()
        }
    }
    updateBulletHit() {
        for (let e of this.enemies) {
            for (let b of this.bullets) {
                if (collide(b, e)) {
                    e.die()
                    var ps = GuaParticalSystem.new(this.game, e.x, e.y)
                    this.addElement(ps)
                    b.die()
                }
            }
        }
    }
    updatePlayerCollideEnemies() {
        let p = this.player
        for (let e of this.enemies) {
            if (collide(p, e)) {
                e.die()
                var ps = GuaParticalSystem.new(this.game, e.x, e.y)
                this.addElement(ps)
                p.getDamage()
            }
        }
    }
    updateEnemyBulletHit() {
        for (let eb of this.EnemyBullets) {
            for (let b of this.bullets) {
                if (collide(b, eb)) {
                    eb.die()
                    b.die()
                }
            }
            if (collide(this.player, eb)) {
                eb.die()
                this.player.getDamage()
            }
        }


    }
    clearDieElement() {
        this.enemies = this.enemies.filter(p => p.alive == true)
        this.bullets = this.bullets.filter(p => p.alive == true)        
        this.EnemyBullets = this.EnemyBullets.filter(p => p.alive == true)        
    }

}