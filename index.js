const SPIRAL = require('./modules/spiral');
const MULT = require('./modules/radomMult');

const randomMult1 = new MULT();
const randomMult2 = new MULT();
const arms = [];
const low_ratio = 97;
const high_ratio = 98.5;
var cons = false
var test = 0
// demo.setValGroup(10, 2, 6)

const setArms = async () => {
    try {
        await arms.push(new SPIRAL(12, randomMult1.ran, randomMult1.mult))
        await arms.push(new SPIRAL(arms[0].outDiame, randomMult2.ran, randomMult2.mult));
        // console.log(arms)
        cons = await arms.every(arm => {
            return arm.ratio >= low_ratio && arm.ratio <= high_ratio
        })
        test = arms[0].torque / arms[1].torque
        randomMult1.init();
        randomMult2.init();
    } catch (err) {
        console.log(err)

        throw err;
    }
    
}

(async () => {
    try{                
            await setArms()
            while(1) {
                if (!cons || test<=0.95 || test>=1.05) {
                    // console.log(arms)
                    arms.splice(0, arms.length)
                    await setArms()
    
                } else {
                    console.table(arms)
                    console.log(test)
                    break;
                }
            }


    } catch (err) {
        console.log(err)
    }
})();