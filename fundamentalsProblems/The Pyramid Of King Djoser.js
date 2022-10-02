'use strict'
function solve(goldMined) {
    let gold = 0;
    let firstB;
    let firstBFlag = true;
    for (let i = 0; i < goldMined.length; i++) {
        gold += goldMined[i];
        if ((i + 1) % 3 === 0) {
            gold -= goldMined[i] * 0.3;
        }

        if (gold * 67.51 > 11949.16 && firstBFlag) {
            firstB = i + 1;
            firstBFlag = false;
        }
    }
    let money = gold * 67.51;
    let bitcoins = 0;
    while (money > 11949.16) {
        money -= 11949.16;
        bitcoins++;
    }
    console.log(`Bought bitcoins: ${bitcoins}`);
    if(firstB)
    console.log(`Day of the first purchased bitcoin: ${firstB}`);
    console.log(`Left money: ${money.toFixed(2)} lv.`);
}


















