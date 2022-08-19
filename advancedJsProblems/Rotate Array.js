function solve(input, n) {
    for (let i = 0; i < n; i++) {
        input.unshift(input.pop())
    }
    return input.join(' ')
}
console.log(solve(['Banana', 
'Orange', 
'Coconut', 
'Apple'], 
15



));