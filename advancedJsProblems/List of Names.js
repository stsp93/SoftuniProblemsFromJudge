function solve(input) {
    return input.sort((a,b) => a.localeCompare(b)).map((n, i) => `${i + 1}.${n}`).join('\n')
}
console.log(solve());