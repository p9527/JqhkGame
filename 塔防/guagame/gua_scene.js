class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModelEnable = true
        this.mouseActions = []
    }

    static new(game) {
        var i = new this(game)
        return i
    }
    registerMouse(callback) {
        this.mouseActions.push(callback)
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    removeElement(img) {
        this.elements = this.elements.filter(e => e != img)
    }
    update() {
        var es = this.elements
        for (let i = 0; i < es.length; i++) {
            var e = es[i];
            e.update && e.update()
        }

        if (this.debugModelEnable) {
            for (let i = 0; i < es.length; i++) {
                var e = es[i];
                e.debug && e.debug()
            }
        }
        // 清楚死亡元素
        this.elements = this.elements.filter(p => p.alive == true)
    }

    draw() {
        // log("scene draw", this.elements)
        for (let i = 0; i < this.elements.length; i++) {
            var e = this.elements[i];
            e.draw()
        }
    }
}