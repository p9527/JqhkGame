class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }

    setup() {
        this.currentChoice = null
        this.topPosition = []
        this.downPosition = []
        this.cardWidth = this.game.imageByName('1c').width
        this.cardHeight = this.game.imageByName('1c').height
        this.cardDistance = 20
        this.areaDistance = 30
        this.topCard = [null, null, null, null]
        this.downCard = [
            [], 
            [], 
            [], 
            [], 
            [], 
            [], 
            [],
        ]
        this.downHideCard = [
            [['红桃', 1]],
            [['黑桃', 1]],
            [['黑桃', 9], ['黑桃', 2],],
            [['黑桃', 9], ['黑桃', 9], ['红桃', 3],],
            [['黑桃', 9], ['黑桃', 9], ['红桃', 9], ['红桃', 7],],
            [['黑桃', 9], ['黑桃', 9], ['黑桃', 8], ['黑桃', 6], ['黑桃', 4],],
            [['黑桃', 9], ['黑桃', 9], ['黑桃', 9], ['黑桃', 9], ['红桃', 5],],
        ]
        this.setupDown()
        this.setupTop()
        this.setupCards()
        this.setupInputs()
        this.setupGenerateCard()
    }

    setupTop() {
        let x = 400
        let y = 40
        let instance = this.areaDistance
        for (let i = 0; i < 4; i++) {
            let c = GuaImage.new(this.game, 'shade')
            c.x = x
            c.y = y
            this.topPosition.push([x, y])
            this.addElement(c)
            x += this.cardWidth + instance
        }
        // log(this.topPosition)
    }

    setupDown() {
        this.setupDownArea()
    }

    setupDownArea() {
        let x = 40
        let y = 250
        let instance = this.areaDistance
        for (let i = 0; i < 7; i++) {
            this.downPosition.push([x, y])
            x += this.cardWidth + instance
        }
    }

    setupGenerateCard() {
        let button = e("#id-getCard")
        // log(button)
        let self = this
        let flower = e("#id-flower")
        let numMap = {
            1 : "1",
            2 : "2",
            3 : "3",
            4 : "4",
            5 : "5",
            6 : "6",
            7 : "7",
            8 : "8",
            9 : "9",
            10 : "10",
            11 : "J",
            12 : "Q",
            13 : "K",
        }
        button.addEventListener('click', function() {
            // log(config)
            let num = config["num"]
            log(num, flower)
            let n = numMap[num.value]
            let f = flower.value
            log('n f', n, f)
            self.addCard(n, f)
        })
    }

    setupCards() {
        this.cards = []
        let c = Card.new(this.game, 40, 50, '1', '红桃')
        this.cards.push(c)
        this.addElement(c)
    }

    setupInputs() {
        this.setupDrag()
        this.setupDragDownCards()
    }

    setupDrag() {
        var self = this

        let draging = false
        var offsetX = 0
        var offsetY = 0
        var initX = 0
        var initY = 0
        self.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                if (self.currentChoice == null) {
                    for (const card of self.cards) {
                        if (card.draggable && card.pointInFrame(x, y)) {
                            initX = card.x
                            initY = card.y
                            offsetX = x - card.x
                            offsetY = y - card.y
                            // log(x, card.x, y, card.y)
                            // log("offset", offsetX, offsetY)
                            self.currentChoice = card
                            // 让他在最上面显示
                            self.removeElement(card)
                            self.addElement(card)
                            draging = true
                            break
                        }
                    }
                }
            } else if (status == 'move') {
                if (draging) {
                    let ox = x - offsetX
                    let oy = y - offsetY
                    self.currentChoice.moveTo(ox, oy)
                    // log(this.currentChoice.x, this.currentChoice.y)
                }
            } else if (status == 'up') {
                let cur = self.currentChoice
                // log(cur)
                if (cur != null) {
                    if (self.canPushInTop(cur, x, y)) {
                        // log(cur)
                        let index = self.inWhiceTop(x, y)
                        self.pushInTop(cur, index)
                    } else if (self.canPushInDown(cur, x, y)) {
                        log("can push in down")
                        let index = self.inWhiceDown(x, y)
                        self.pushInDown(cur, index)
                    } else {
                        // cur.moveTo(initX, initY)
                    }
                }
                draging = false
                self.currentChoice = null
            }
        })
    }

    setupDragDownCards() {
        var self = this

        let draging = false
        var offsetX = 0
        var offsetY = 0
        var moveCards = null
        let initX = 0
        let initY = 0
        self.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                moveCards = self.touchWhichCard(x, y)
                if (moveCards !== null) {
                    let downIndex = moveCards[0]
                    let cardIndex = moveCards[1]
                    let cards = self.downCard[downIndex]
                    let card = cards[cardIndex]
                    for (const c of cards) {
                        self.removeElement(c)
                        self.addElement(c)
                    }
                    initX = card.x
                    initY = card.y
                    offsetX = x - card.x
                    offsetY = y - card.y
                    draging = true
                }
            } else if (status == 'move') {
                if (draging) {
                    let ox = x - offsetX
                    let oy = y - offsetY
                    let downIndex = moveCards[0]
                    let cardIndex = moveCards[1]
                    let cards = self.downCard[downIndex]
                    let distance = self.cardDistance
                    for (let i = cardIndex; i < cards.length; i++) {
                        const element = cards[i];
                        element.moveTo(ox, oy)
                        oy += distance
                    }
                }
            } else if (status == 'up') {
                if (draging) {
                    let ox = initX
                    let oy = initY
                    let downIndex = moveCards[0]
                    let cardIndex = moveCards[1]
                    let cards = self.downCard[downIndex]
                    let moveCardLen = cards.length - cardIndex
                    let topCard = cards[cardIndex]
                    // 只有一张牌
                    if (moveCardLen === 1 && self.canPushInTop(topCard, x, y)) {
                        self.downCard[downIndex].splice(cardIndex, 1)
                        let index = self.inWhiceTop(x, y)
                        self.pushInTop(topCard, index)
                    } else if (moveCardLen === 1 && self.canPushInDown(topCard, x, y)) {
                        self.downCard[downIndex].splice(cardIndex, 1)
                        let index = self.inWhiceDown(x, y)
                        self.pushInDown(topCard, index)
                    } else if (moveCardLen > 1 && self.canPushInDown(topCard, x, y)) {
                        log('拖拽')
                        let cs = self.downCard[downIndex].splice(cardIndex, moveCardLen)
                        let index = self.inWhiceDown(x, y)
                        for (const c of cs) {
                            self.pushInDown(c, index)
                        }
                    } else {
                        let distance = this.cardDistance
                        for (let i = cardIndex; i < cards.length; i++) {
                            const element = cards[i];
                            element.moveTo(ox, oy)
                            oy += distance
                        }
                    }
                }
                draging = false
            }
        })
    }
    // top
    inWhiceTop(x, y) {
        let p = this.topPosition
        let w = this.cardWidth
        let h = this.cardHeight
        for (let i = 0; i < p.length; i++) {
            let x1 = p[i][0]
            let y1 = p[i][1]
            let xIn = x > x1 && x < x1 + w
            let yIn = y > y1 && y < y1 + h
            if (xIn && yIn) {
                return i
            }
        }
        return -1
    }

    canPushInTop(card, x, y) {
        let index = this.inWhiceTop(x, y)
        // log(index)
        if (index == -1) {
            return false
        }
        let topCard = this.topCard[index]
        let canPush = false
        log(card.type)
        if (topCard == null) {
            if (card.type == 1) {
                canPush = true
            }
        } else {
            if (card.type - 1 === topCard.type &&
                card.flower === topCard.flower) {
                canPush = true
            }
        }
        return canPush
    }
    
    pushInTop(card, index) {
        let p = this.topPosition[index]
        card.x = p[0]
        card.y = p[1]
        this.topCard[index] = card
        card.draggable = false
        log(this.topCard)
    }
    // down
    touchWhichCard(x, y) {
        let downIndex = this.inWhiceDown(x, y)
        // log(downIndex)
        if (downIndex === -1) {
            return null
        }
        let p = this.downPosition[downIndex]
        let cards = this.downCard[downIndex]
        let hiddeCard = this.downHideCard[downIndex]
        let cardLen = cards.length
        let hiddeLen = hiddeCard.length
        // let cardX = p[0]
        let distance = this.cardDistance
        let cardY = p[1] + distance * hiddeLen
        let cardIndex = Math.floor((y - cardY) / distance)
        if (cardIndex >= 0) {
            if (cardIndex >= cardLen - 1) {
                cardIndex = cardLen - 1
            }
            // log(cardIndex)
            return [downIndex, cardIndex]
        }
        return null
    }

    inWhiceDown(x, y) {
        let p = this.downPosition
        let w = this.cardWidth
        let h = this.cardHeight
        let distance = this.cardDistance
        for (let i = 0; i < p.length; i++) {
            let x1 = p[i][0]
            let y1 = p[i][1]
            let downIndex = i
            let cards = this.downCard[downIndex]
            let hiddeCard = this.downHideCard[downIndex]
            let cardLen = cards.length
            let hiddeLen = hiddeCard.length
            let offsetY = distance * (cardLen + hiddeLen - 1)
            let xIn = x > x1 && x < x1 + w
            let yIn = y > y1 && y < y1 + h + offsetY
            if (xIn && yIn) {
                return i
            }
        }
        return -1
    }

    canPushInDown(card, x, y) {
        let index = this.inWhiceDown(x, y)
        if (index === -1) {
            return false
        }
        let cards = this.downCard[index]
        // log('can push in down', cards, 'hidencard', hidenCard)
        let len = cards.length
        let canPush = false
        if (len == 0) {
            canPush = true
        } else {
            let lastCard = cards[len - 1]
            // log('lastcard card', lastCard, card)
            if (!card.sameColor(lastCard) && lastCard.type === card.type + 1) {
                canPush = true
            }
        }

        return canPush
    }

    pushInDown(card, index) {
        // log('push in down card', card, 'index: ', index)
        let p = this.downPosition[index]
        let cards = this.downCard[index]
        let hidenCard = this.downHideCard[index]
        let len = cards.length + hidenCard.length
        let distance = this.cardDistance

        card.x = p[0]
        card.y = p[1] + distance * len
        this.downCard[index].push(card)
        card.draggable = false
        // log(this.downCard[index])
    }

    addCard(num, flower) {
        let c = Card.new(this.game, 40, 50, num, flower)
        this.cards.push(c)
        this.addElement(c)
        return c
    }

    update() {
        super.update()
        this.updateHidenCard()
    }

    updateHidenCard() {
        for (let i = 0; i < this.downPosition.length; i++) {
            let hidenCard = this.downHideCard[i]
            let cards = this.downCard[i]
            if (cards.length === 0 && hidenCard.length > 0) {
                let card = hidenCard.pop()
                let c = this.addCard(card[1], card[0])
                // log(c)
                this.pushInDown(c, i)
            }
            
        }
    }

    draw() {
        this.drawBackGroud()
        this.drawDownArea()
        this.drawHideCard()
        super.draw()
    }

    drawBackGroud() {
        let context = this.game.context
        context.fillStyle = '#282c34'
        context.fillRect(0, 0, 10000, 1000)
    }

    drawDownArea() {
        let w = this.cardWidth
        let h = this.cardHeight
        for (let i = 0; i < 7; i++) {
            let p = this.downPosition[i]
            let x = p[0]
            let y = p[1]
            // log(x, y, w, h)
            // this.game.context.fillStyle = 'blue'
            // this.game.context.fillRect(x, y, w, h)
            let context = this.game.context
            let img = this.game.imageByName('down')
            context.drawImage(img, x, y)
        }
    }

    drawHideCard() {
        let w = this.cardWidth
        let h = this.cardHeight
        for (let i = 0; i < 7; i++) {
            let cards = this.downHideCard[i]
            let p = this.downPosition[i]
            let x = p[0]
            let y = p[1]
            let distance = this.cardDistance
            for (let j = 0; j < cards.length; j++) {
                let context = this.game.context
                let img = this.game.imageByName('plmm')
                context.drawImage(img, x, y)
                // context.fillStyle = 'blue'
                // context.fillRect(x, y, w, h)
                // context.fillStyle = 'white'
                // context.font = "20px serif"
                // context.fillText(`隐藏牌`, x, y + 20)
                y += distance
            }
        }
    }
}