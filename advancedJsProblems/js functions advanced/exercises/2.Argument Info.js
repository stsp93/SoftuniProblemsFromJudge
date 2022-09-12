function argumentInfo(...input) {
    for(let instr of input) {
        console.log(`${typeof instr}: ${instr}`);
    }
}
argumentInfo('cat', 42, function () { console.log('Hello world!'); })