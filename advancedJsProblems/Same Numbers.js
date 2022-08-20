function sameNumbers(num) {
    const arr = String(num).split('');
    return `${arr.every(d => d === arr[0])}\n${arr.reduce((acc, cur) => acc + +cur, 0)}`
}
console.log(sameNumbers(223222));
