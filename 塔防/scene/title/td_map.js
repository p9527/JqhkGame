class TDMap {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.w = 6
        this.h = 4
        this.map = [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ]
    }
    setWall(i, j) {
        this.map[i][j] = 0
        // log('set wall', i, j, this.map)
    }
    findPath(i, j) {
        let map = this.map
        var graph = new Graph(map)
        var start = graph.grid[i][j]
        var end = graph.grid[5][2]
        var result = astar.search(graph, start, end)
        return result
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
}


