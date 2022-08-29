function jansNotation(input) {
    const numbers = [];
    const oprs = function(opr){
        const oprs = {
            '+': numbers[0] + numbers[1],
            '-': numbers[1] - numbers[0],
            '*': numbers[0] * numbers[1],
            '/': numbers[1] / numbers[0],
        }
        return oprs[opr];
    }
    for (let instr of input) {
        if (typeof instr === 'number') { 
            numbers.unshift(instr) 
        } else {
            if(numbers.length < 2) return `Error: not enough operands!`;
            numbers.splice(0,2,oprs(instr))
        }
    }
    if(numbers.length > 1) return `Error: too many operands!`;
    [output] = numbers
    return output
}
console.log(jansNotation([5,
    3,
    4,
    '*',
    '-']
   
));