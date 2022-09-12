function getFibonator() {
    let nums = [0,1]
    return function() {
        
        const next = nums.slice(-2).reduce((acc,cur) => acc + cur, 0);
        nums.push(next);
        return nums[nums.length - 2]
    }
}
let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13

