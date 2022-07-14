'use strict'
function numbers(arr) {
    arr = arr.split(' ').map(Number);
    const arrAvg = arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
    const biggerNums = arr.filter(num => num > arrAvg).sort((a, b) => b - a);
    const output = [];
    for (let i = 0; i < 5; i++) {
        if (!isNaN(biggerNums[i])) {
            output.push(biggerNums[i])
        }
    }

    output.length === 0 ? console.log('No') : console.log(...output);

}


reception(
    '1'
)










