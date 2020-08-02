class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    distance(vector) {
        let dx = vector.x - this.x
        let dy = vector.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }
    sub(vector) {
        let v = vector
        let dx = this.x - v.x
        let dy = this.y - v.y
        return Vector.new(dx, dy)
    }
    length() {
        let x = this.x
        let y = this.y
        return Math.sqrt(x * x + y * y)
    }
    normal() {
        let f = this.length() / 1
        let v = Vector.new(this.x / f, this.y / f)
        return v
    }
}