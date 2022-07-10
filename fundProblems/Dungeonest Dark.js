'use strict'
function solve(input) {
    let field = [];
    let bugs = input[1].split(' ').map(Number);

    


    for (let i = 0; i < input[0]; i++) {
        field[i] = '0';

    }
    bugs.forEach(bug => {
        if (field[bug]) field[bug] = '1'
    })


    const start = 0;
    const end = field.length - 1;
    const commands = input.slice(2);

    for(let cmd of commands) {
        let [bugIndex, direction, flyLength] = cmd.split(' ');
        [bugIndex, flyLength] = [+bugIndex, +flyLength];
        
        
        if (field[bugIndex] === '1' && flyLength) {
            if (direction === 'right') {
                let bonusFly = flyLength;
                while (field[bugIndex + flyLength] === '1') {
                    flyLength += bonusFly;
                }
                if (bugIndex + flyLength <= end) {
                    field[bugIndex + flyLength] = '1'
                } 
            } else if (direction === 'left') {
                let bonusFly = -flyLength;
                while (field[bugIndex - flyLength] === '1') {
                    flyLength -= bonusFly;
                }
                if (bugIndex - flyLength >= start) {
                    field[bugIndex - flyLength] = '1';
                } 
            }
            field[bugIndex] = '0'
        }

    }
    console.log(...field);
}


















