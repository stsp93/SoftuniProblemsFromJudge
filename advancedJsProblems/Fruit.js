function greatestCommonDivisor(fruit, gr, price) {
    return `I need $${(gr * price / 1000).toFixed(2)} to buy ${(gr / 1000).toFixed(2)} kilograms ${fruit}.`
}
console.log(greatestCommonDivisor([1,2,3]));