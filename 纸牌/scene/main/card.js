class Card {
    constructor(game, x, y, num, flower) {
        this.draggable = true
        this.game = game
        this.x = x
        this.y = y
        this.num = num
        this.flower = flower
        this.type = this.getNum(num)
        this.name = `${this.type}${this.getType(flower)}`
        this.texture = game.imageByName(this.name)
        this.w = this.texture.width
        this.h = this.texture.height
        this.alive = true
    }

    static new(...args) {
        var i = new this(...args)
        return i
    }

    setup() {
        // log(this.type)
    }

    getNum(num) {
        let tyepMap = {
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            "J": 11,
            "Q": 12,
            "K": 13,
        }
        return tyepMap[num]
    }

    getType(flower) {
        let map = {
            '黑桃': 's',
            '红桃': 'h',
            '方块': 'd',
            '梅花': 'c',
        }
        return map[flower]
    }

    sameColor(card) {
        let color = {
            '黑桃': 'black',
            '梅花': 'black',
            '红桃': 'red',
            '方块': 'red',
        }
        log('same color', this, card)
        return color[this.flower] === color[card.flower]
    }

    update() {

    }
    
    debug() {
    }

    draw() {
        let context = this.game.context
        // context.fillStyle = 'orange'
        // context.fillRect(this.x, this.y, this.w, this.h)
        // context.fillStyle = 'black'
        // context.font = "20px serif"
        // context.fillText(`${this.flower} ${this.num}`, this.x, this.y + 25)
        context.drawImage(this.texture, this.x, this.y)
    }

    moveTo(x, y) {
        this.x = x
        this.y = y
    }

    pointInFrame(x, y) {
        let xIn = x > this.x && x < this.x + this.w
        let yIn = y > this.y && y < this.y + this.h
        return xIn && yIn
    }
}