'use strict'
function matrix(input) {
    let arr = [];
    input.forEach(row => arr.push(row.split(' ').map(str => Number(str))))
    let top = 0;
    let bot = arr.length - 1;
    let left = 0;
    let right = arr[0].length - 1;

    let leftDiagon = 0;
    let rightDiagon = 0;


    for (let i = top; i <= bot; i++) {
        leftDiagon += arr[i][i];
        rightDiagon += arr[i][right - i];
    }

    // Diagon check
    if (leftDiagon === rightDiagon) {
        for (let i = top; i <= bot; i++) {
            for (let j = left; j <= right; j++) {
                if (i !== j && i !== right - j) {
                    arr[i][j] = leftDiagon;
                }
            }
        }
    }
    arr.forEach(row => console.log( row.join(' ')));
}

















