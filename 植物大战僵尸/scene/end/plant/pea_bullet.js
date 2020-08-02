class PeaBullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.demage = 1
        this.speed = 5
    }
    update() {
        this.x += this.speed
    }
    hit(zombie) {
        zombie.getDemage(this.demage)
        this.alive = false
    }
}