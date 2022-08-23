function lastNumSeq(n, k) {
    const arr = [1]
    for(let i = 1; i < n ; i++) {
        let next = arr.slice(Math.max(i - k, 0), i)
        next = next.reduce((acc, cur) => acc + cur, 0);
        arr.push(next);
    }
    return arr;
}
console.log(lastNumSeq(8, 5));