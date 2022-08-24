function  diagonalSums(input){
    const length = input[0].length;
    let mainSum = 0;
    let secSum = 0;
    for(let i = 0; i < length; i++) {
        mainSum += +input[i][i];
        secSum += +input[length - 1 - i][i]
    }
    return [mainSum, secSum].join(' ')
}
console.log(diagonalSums([[3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]]
   
   ));