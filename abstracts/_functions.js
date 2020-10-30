exports.calcPitchDiame = (innerDiame, monoDiame) => {
    return innerDiame + monoDiame
}

exports.calcOutDiame = (innerDiame, monoDiame) => {
    return innerDiame + 2 * monoDiame
}

exports.calcPitch =  (mult, outDiame) => {
    return Math.floor(mult * outDiame)
}

exports.calcLength = (pitchDiame, pitch) => {
    return parseFloat(Math.sqrt(Math.pow(pitchDiame*Math.PI, 2) + Math.pow(pitch, 2)).toFixed(3))
}

exports.calcWinRate = (pitchDiame, pitch) => {
    return parseFloat(Math.sqrt(1 + Math.pow(Math.PI * pitchDiame / pitch, 2)).toFixed(3))
}

exports.calcCos = (winRate) => {
    return parseFloat((1 / winRate).toFixed(3))
}

exports.calcSin = (cos) => {
    return parseFloat(Math.sqrt(1 - Math.pow(cos, 2)).toFixed(3))
}

exports.calcNumOfMono = (pitchDiame, monoDiame, winRate) => {
    return parseFloat(Math.floor(Math.PI * pitchDiame / (monoDiame * winRate)))
}  

exports.calcRatio = (numOfMono, innerDiame, monoDiame, pitch, Length, ) => {
    return parseFloat((numOfMono * Math.atan(monoDiame / pitch * 
        Math.sqrt(Math.pow(Length, 2) / (Math.pow(innerDiame, 2) + 2 * innerDiame * monoDiame))
        ) / Math.PI * 100).toFixed(3))
}

exports.calcAreaOfMono = (monoDiame, numOfMono) => {
    return parseFloat((Math.pow(monoDiame, 2) / 4 * Math.PI * numOfMono).toFixed(3))
}

exports.calcTorque = (areaOfMono, pitchDiame, sin, cos) => {
    return parseFloat((areaOfMono * pitchDiame * Math.pow(sin, 2) * cos / 2).toFixed(3))
}