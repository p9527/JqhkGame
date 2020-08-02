class Sun extends Animation {
    constructor(game) {
        let animationSun = {
            name: 'sun',
            fatherPath: 'images/sun',
            actions: [
                {
                    name: 'idle',
                    count: 29,
                },
            ]
        }
        super(game, animationSun)
        this.setup()
    }
    setup() {
        this.maxFramesCount = 5

    }
    update() {
        super.update()
        this.y++
        if (this.y > 400) {
            this.y = 400
        }
    }
}