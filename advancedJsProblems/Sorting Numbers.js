function solve(arr) {
    let startI = 0;
    let endI = arr.length - 1;
    arr.sort((a,b) => a-b);
    const output = [];
    while(startI <= endI) {
        if(startI === endI) {
            output.push(arr[startI]);
            break;
        }
        output.push(arr[startI++]);
        output.push(arr[endI--]);
    }
    return output;
}
console.log(solve([1, 65, 3, 52,5, 48, 4]));