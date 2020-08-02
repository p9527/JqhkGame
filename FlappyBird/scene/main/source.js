class Source {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.alive = true
        this.source = -1
        this.img = []
        this.add()
        // var zero = GuaImage.new(this.game, 'source0')
    }
    update() {
    }
    add() {
        this.source++
        let nums = this.numToNums(this.source)
        this.numsToImgs(nums)
    }
    draw() {
        let center = 200 - (this.img.length / 2 * 24)
        for (let i = 0; i < this.img.length; i++) {
            let num = this.img[i]
            num.x = center + 24 * i
            num.y = 100
            this.game.drawImage(num)
        }
    }
    numsToImgs(nums) {
        this.img = []
        for(let n of nums) {
            let name = `source${n + 1}`
            let img = GuaImage.new(this.game, name)
            // log(name, img)
            this.img.push(img)
        }
    }
    numToNums(source) {
        let nums = []
        let raw = source
        let divisor = 10
        if (raw == 0) {
            nums.push(0)
        } else {
            while(raw != 0) {
                let num = raw % divisor
                nums.push(num)
                raw = Math.floor(raw / divisor)
                // log(num, divisor, raw)
            }
        }
        return nums.reverse()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
}