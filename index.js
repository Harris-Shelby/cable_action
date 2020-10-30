const SPIRAL = require('./modules/spiral');
const MULT = require('./modules/radomMult');

const randomMult1 = new MULT();
const randomMult2 = new MULT();
const arms = [];

const low_ratio = 97;
const high_ratio = 98.5;
const low_torqureRate = 0.95;
const high_torqureRate = 1.05;
const maxDiame = 17.3
var cons = false
var test = -1
var oddTorqure = -1
var evenTorqure = -1
// demo.setValGroup(10, 2, 6)

const setArms = async () => {
    try {
        oddTorqure = 0
        evenTorqure = 0

        await arms.push(new SPIRAL(11.7, randomMult1.ran, randomMult1.mult))
        await arms.push(new SPIRAL(arms[arms.length-1].outDiame, randomMult2.ran, randomMult2.mult));
        await arms.push(new SPIRAL(arms[arms.length-1].outDiame, randomMult2.ran, randomMult2.mult));
        cons = await arms.every(arm => {
            return arm.ratio >= low_ratio && arm.ratio <= high_ratio
        })
        arms.filter((arm, index) => {
            return index % 2 === 0            
        }).forEach(arm => {
            oddTorqure += arm.torque 
        })
        arms.filter((arm, index) => {
            return index % 2 !== 0            
        }).forEach(arm => {
            evenTorqure += arm.torque
        })
        test = arms[0].torque / arms[1].torque
        randomMult1.init();
        randomMult2.init();
        console.log(oddTorqure)
    } catch (err) {
        console.log(err)
        throw err;
    }
    
}

(async () => {
    try{                
            await setArms()
            while(1) {
                if (!cons || test<=low_torqureRate || test>=high_torqureRate ) {
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