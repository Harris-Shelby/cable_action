const SPIRAL = require('./modules/spiral');

const { arms, numOfLayers, innerDiame, maxOutDiame, 
    minRatio, maxRatio, minTorqure__ratio, 
    maxtorqure__ratio, minBreakingStrength, 
    maxInNum, maxOutNum,
    randomMult1, randomMult2, tensile} = require('./abstracts/_variables');

let isOk = false;
let oddEven__ratio = 0
let breakingStrength = 0
/**
 * 
 * @param {*} innerDiame 
 * @param {*} numOfLayers 
 */
const setSpiralPro = (innerDiame, numOfLayers) => {
    return new Promise((resolve, reject) => {
        if(!numOfLayers) reject("Something wrong")
        let oddTorqure = 0
        let evenTorqure = 0
        // let oddEven__ratio = 0
        arms.push(new SPIRAL(innerDiame, randomMult1.ran, randomMult1.mult))
        arms.push(new SPIRAL(arms[arms.length-1].outDiame, randomMult2.ran, randomMult2.mult));
        let oddCon = arms.filter((arm, index) => {
            return index % 2 !== 0            
        }).some(el => {
            return el > maxOutNum
        })

        let evenCon = arms.filter((arm, index) => {
            return index % 2 === 0            
        }).some(el => {
            return el > maxInNum
        })

        arms.forEach((arm, index) => {
            if (index % 2 !== 0 ) {
                evenTorqure += arm.torque
            } else {
                oddTorqure +=arm.torque
            }
            breakingStrength += Number(arm.areaOfMono * tensile)
        })

        oddEven__ratio = oddTorqure / evenTorqure
        resolve({oddCon, evenCon})
    })
}

const judgeSpiralPro = (ProductData) => {
    return new Promise((resolve, reject) => {
        if(!arms) reject(err);
        let isSimilarConditionSatify = arms.every((arm, index) => {
            return arm.ratio >= minRatio && arm.ratio <= maxRatio
        })

        let isTorqueBlanced = 
            oddEven__ratio >= minTorqure__ratio 
                && oddEven__ratio <= maxtorqure__ratio

        let isOutDiameSatisfy = arms[arms.length-1].outDiame <= maxOutDiame

        let isBreakingStrengthSatisfy = breakingStrength >= minBreakingStrength

        let isnumSatisfy = !(ProductData.oddCon || ProductData.evenCon)
        resolve(isSimilarConditionSatify && isTorqueBlanced 
            && isOutDiameSatisfy && isBreakingStrengthSatisfy && isnumSatisfy)
    })
}

const setArms = async () => {
    try {
        let ProductData = await setSpiralPro(innerDiame, numOfLayers);
        isOk = await judgeSpiralPro(ProductData)
    } catch (err) {
        console.log(err)
        throw err;
    }
    
}

(async () => {
    try{                
            await setArms()
            while(1) {
                if (!isOk) {
                    breakingStrength = 0
                    randomMult1.init();
                    randomMult2.init();
                    arms.splice(0, arms.length)
                    await setArms()
                } else {
                    console.table(arms)
                    console.log(oddEven__ratio, breakingStrength)
                    break;
                }
            }
    } catch (err) {
        console.log(err)
    }
})();