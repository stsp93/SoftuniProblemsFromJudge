function validityChecker(x1, y1, x2, y2) {
    function check(x1, y1, x2, y2) {
        const status = Number.isInteger(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)) ? 'valid' : 'invalid';
        return `{${x1}, ${y1}} to {${x2}, ${y2}} is ${status}`
    }
    return [check(x1, y1, 0, 0), check(x2, y2, 0, 0), check(x1, y1, x2, y2)].join('\n');
}
console.log(validityChecker(2, 1, 1, 1));
