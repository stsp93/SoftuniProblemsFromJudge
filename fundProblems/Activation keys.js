'use strict';
function activationKeys(input) {
    let key = input.shift();

    for(let line of input) {
        if(line === 'Generate') {
            console.log(`Your activation key is: ${key}`);
            break;
        }

        let [cmd, ...tokens] = line.split('>>>');

        if(cmd === 'Contains'){
            const substr = tokens[0];
            key.includes(substr) ? console.log(`${key} contains ${substr}`) : console.log(`Substring not found!`);
        }
        if(cmd === 'Flip') {
            let [textCase, startInd, endInd] = tokens;
            endInd = +endInd;
            const substr = key.slice(startInd, endInd );
            if(textCase === 'Upper') {
                key = key.replace(substr, substr.toUpperCase())
            } else {
                key = key.replace(substr, substr.toLowerCase())
            }
            console.log(key);
        }
        if(cmd === 'Slice') {
            let start = +tokens[0];
            let end = +tokens[1];

            key = key.split('');
            key.splice(start,end - start);
            key = key.join('');
            console.log(key);
        }
    }
}
activationKeys(["134softsf5ftuni2020rockz42",
"Slice>>>3>>>7",
"Contains>>>-rock",
"Contains>>>-uni-",
"Contains>>>-rocks",
"Flip>>>Upper>>>2>>>8",
"Flip>>>Lower>>>5>>>11",
"Generate"])

