'use strict'
function arrayModifier(input) {
    let arr = input[0].split(' ');
    input.pop();
    input.shift();
    for (let commands of input) {
        let command = commands.split(' ');
        if (command[0] === 'swap') {
            const index1 = command[1];
            const index2 = command[2];
            [arr[index1], arr[index2]] =  [arr[index2], arr[index1]]
        } else if (command[0] === 'multiply') {
            const index1 = command[1];
            const index2 = command[2];
            arr[index1] *= arr[index2];
        } else if (command[0] === 'decrease') {
            arr = arr.map(el => el -1);
        }

    }
    console.log(arr.join(', '));
}













