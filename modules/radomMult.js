module.exports = class MULT {
    constructor () {
        this.init()
    }
    init() {
        this.mult = Math.random() * 4 + 6
        this.ran = parseFloat((Math.random() * 3 + 0.5).toFixed(1))
    }
}