function biggestEl(input) {
    return Math.max(...input.flat())
}
console.log(biggestEl([[20, 50, 10],
[8, 33, 145]]
));