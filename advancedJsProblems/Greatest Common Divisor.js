function greatestCommonDivisor(...nums) {
    const [biggerNum, smallerNum] = [Math.max(...nums), Math.min(...nums)];
    for(let i = smallerNum; i > 0; i--){
        if(smallerNum % i === 0 && biggerNum % i === 0) {
            return i;
        }
    }
}
console.log(greatestCommonDivisor(37, 60));
