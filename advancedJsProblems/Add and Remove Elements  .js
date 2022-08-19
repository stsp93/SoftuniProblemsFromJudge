function solve(arr) {
    let init = 1;
    let elArr = [];
    const cmdObj = {
        add() {
            elArr.push(init)
        },
        remove() {
            elArr.pop(init)
        },
    }
    for (let cmd of arr) {
        cmdObj[cmd]();
        init++;
    }
    if (elArr.length > 0) {
        return elArr.join('\n')
    } else {
        return `Empty`
    }
}
console.log(solve(['remove', 
'remove', 
'remove']


));