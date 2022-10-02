'use strict'
function solve(input) {
    let string = input.shift();
    for(let line of input) {
        if(line === 'Done') {
            break;
        }
        let [cmd, token1, token2] = line.split(' ');
        if(cmd === 'Change'){
            if(string.includes(token1)) {
                string = string.split(token1).join(token2);
            }
            console.log(string);
        }
        if(cmd === 'Includes'){
            string.includes(token1) ? console.log('True') : console.log('False');
        }
        if(cmd === 'End'){
            string.endsWith(token1) ? console.log('True') : console.log('False');
        }
        if(cmd === 'Uppercase'){
            string = string.toUpperCase();
            console.log(string);
        }
        if(cmd === 'FindIndex'){
            console.log(string.indexOf(token1));
        }
        if(cmd === 'Cut'){
           string = string.slice(token1,+token1 + +token2);
           console.log(string);
        }
    }
}
solve(["*S0ftUni is the B3St Plac3**",
"Change 2 o",
"Includes best",
"End is",
"Uppercase",
"FindIndex P",
"Cut 3 7",
"Done"])



