class GuaScene {
    constructor(game) {
        this.game = game
        this.actions = {}
        this.keyDowns = {}
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    registerActions(key, callback) {
        this.actions[key] = callback
    }
    
    update() {
    }

    draw() {
        
    }
}