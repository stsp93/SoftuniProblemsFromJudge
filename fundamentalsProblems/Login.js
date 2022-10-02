'use strict'
function solve(base, incr) {
    let stepArr = [];
    let [stone, marble, lapis, gold, height] = [0, 0, 0, 0, 0];
    for (base; base > 0; base -= 2) {
        stepArr.push(base);
    }
    height = Math.floor(stepArr.length * incr);
    gold = Math.ceil((stepArr[stepArr.length - 1] ** 2) * incr)
    for (let i = 1; i < stepArr.length; i++) {
        let index = i - 1;
        if (i % 5 === 0) {
            lapis += (stepArr[index] * 4 - 4) * incr;
            stone += ((stepArr[index] - 2) ** 2) * incr;
        } else {
            marble += (stepArr[index] * 4 - 4) * incr;
            stone += ((stepArr[index] - 2) ** 2) * incr;
        }
    }
    
    console.log(`Stone required: ${Math.ceil(stone)}`);
    console.log(`Marble required: ${Math.ceil(marble)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapis)}`);
    console.log(`Gold required: ${gold}`);
    console.log(`Final pyramid height: ${height}`);
}


















