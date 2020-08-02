class PeaShooter extends Animation {
    constructor(game) {
        let animationPeashooter = {
            name: 'peaShooter',
            fatherPath: 'images/peaShooter',
            actions: [
                {
                    name: 'idle',
                    count: 13,
                },
            ]
        }
        super(game, animationPeashooter)
        this.setup()
    }
    setup() {
        this.maxFramesCount = 5

        // bullet
        this.sleep = true
        this.maxCollDown = 30
        this.coolDown = this.maxCollDown
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
    }
    update() {
        super.update()

        this.coolDown--
        if (this.coolDown == 0) {
            this.coolDown = this.maxCollDown
            this.fire()
        }
    }
    fire() {
        if (!this.sleep) {
            let b = PeaBullet.new(this.game, 'pb1')
            b.x = this.x
            b.y = this.y
            this.scene.addElement(b)
            this.scene.bullets[this.row - 1].push(b)
        }
    }
    awake() {
        this.sleep = false
    }
    gotoBed() {
        this.sleep = true
    }
}