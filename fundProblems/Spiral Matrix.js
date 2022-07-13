'use strict'
function matrix(rows, columns) {

    let top = 0;
    let bottom = rows - 1;
    let left = 0;
    let right = columns - 1;
    let counter = 1;
    let result = [];
    for (let i = 0; i < rows; i++) {
        result.push([]);
        for (let j = 0; j < columns; j++) {
            result[i].push(0);
        }
    }
    while (top <= bottom && left <= right) {

        for (let i = left; i <= right; i++) {
            result[top][i] = counter;
            counter++
        }
        top++;

        for (let i = top; i <= bottom; i++) {
            result[i][right] = counter;
            counter++
        }
        right--;

        for (let i = right; i >= left; i--) {
            result[bottom][i] = counter;
            counter++
        }
        bottom--;

        for (let i = bottom; i >= top; i--) {
            result[i][left] = counter;
            counter++
        }
        left++;


    }
    result.forEach(arr => console.log(arr.join(' ')));


}















