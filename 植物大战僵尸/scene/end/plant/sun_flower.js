class SunFlower extends Animation {
    constructor(game) {
        let animationSunFlower = {
            name: 'sunFlower',
            fatherPath: 'images/sunFlower',
            actions: [
                {
                    name: 'idle',
                    count: 18,
                },
            ]
        }
        super(game, animationSunFlower)
        this.setup()
    }
    setup() {
        this.maxFramesCount = 5

    }
    update() {
        super.update()

    }
    awake() {
        this.sleep = false
    }
    gotoBed() {
        this.sleep = true
    }
}