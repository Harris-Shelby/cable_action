const SPIRAL = require('./modules/spiral');
/**
 * APP ENTROL
 */


(async () => {
    try{
        const demo = await new SPIRAL(10, 1, 1)
        console.log(demo)
    } catch (err) {
        console.log(err)
    }
})();
