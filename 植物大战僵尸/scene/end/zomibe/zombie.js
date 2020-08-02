class Zombie extends Animation {
    constructor(game) {
        let animationZombie = {
            name: 'zombie',
            fatherPath: 'images/zombie',
            actions: [
                {
                    name: 'run',
                    count: 22,
                },
                {
                    name: 'attack',
                    count: 21,
                },
            ]
        }
        super(game, animationZombie)
        this.setup()
    }
    setup() {
        this.maxFramesCount = 5
        this.speed = 0.5

        this.blood = 3
    }
    update() {
        super.update()
        this.x -= this.speed
    }
    getDemage(demage) {
        this.blood -= demage
        if (this.blood == 0) {
            this.alive = false
        }
    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // var animationStatus = {
        //     'down': 'zombie_run',
        //     'up': 'zombie_attack',
        // }
        // this.changeAnimationStatus(animationStatus[keyStatus])
    }
}