function solve(arr) {
    const output = [];
    let curNum = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i< arr.length; i++) {
        if(arr[i] >= curNum) {
            curNum = arr[i];
            output.push(curNum);
        }
    }
    return output;
}
console.log(solve([20,20, 
    3, 
    2, 
    15,
    6, 
    1]
    
    ));