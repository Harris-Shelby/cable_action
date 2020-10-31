const MULT = require('../modules/radomMult');

module.exports = {
    arms: [],
    numOfLayers: 2,
    innerDiame: 11.7,
    maxOutDiame: 17.3,
    minRatio: 97,
    maxRatio: 98.5,
    minBreakingStrength: 86,
    maxInNum: 30,
    maxOutNum: 54,
    minTorqure__ratio: 0.9,
    maxtorqure__ratio: 1.1,
    randomMult1: new MULT(),
    randomMult2: new MULT(),
    tensile: 0.96
}