function processOddPos(input) {
    return input.filter((e, i) => i%2 === 1).map(e => e *= 2).reverse().join(' ')
}
console.log(processOddPos([10, 15, 20, 25]));