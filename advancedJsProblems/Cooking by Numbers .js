function cooking(n, ...oprs) {
    let num = +n;
    const oprsObj = {
        chop() { num /= 2 },
        dice() { num = Math.sqrt(num) },
        spice() { num += 1 },
        bake() { num *= 3 },
        fillet() { num -= num * 0.2 },
    }
    oprs.forEach(o => {
        oprsObj[o]();
        console.log(num);
    })
}
console.log(cooking('9', 'dice', 'spice', 'chop', 'bake', 'fillet'));