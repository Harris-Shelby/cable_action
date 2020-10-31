const { calcPitchDiame, calcOutDiame, calcPitch, calcLength, 
    calcWinRate, calcCos, calcSin, calcNumOfMono, 
    calcRatio, calcAreaOfMono, calcTorque} = require('../abstracts/_functions');
module.exports = class SPIARL {
    constructor (innerDiame, monoDiame, mult) {
        this.innerDiame = innerDiame;
        this.monoDiame = monoDiame;
        this.mult = mult;
        this.init();
    }
    init () {
        this.pitchDiame = calcPitchDiame(this.innerDiame, this.monoDiame);
        this.outDiame = calcOutDiame(this.innerDiame, this.monoDiame);
        this.pitch = calcPitch(this.mult, this.outDiame);
        this.Length = calcLength(this.pitchDiame, this.pitch);
        this.winRate = calcWinRate(this.pitchDiame, this.pitch);
        this.cos = calcCos(this.winRate);
        this.sin = calcSin(this.cos);
        this.numOfMono = calcNumOfMono(this.pitchDiame, this.monoDiame, this.winRate);
        this.ratio = calcRatio(this.numOfMono, this.innerDiame, this.monoDiame, this.pitch, this.Length);
        this.areaOfMono = calcAreaOfMono(this.monoDiame, this.numOfMono);
        this.torque = calcTorque(this.areaOfMono, this.pitchDiame, this.sin, this.cos)
    }
}
