'use strict'
function solve(input) {
    const n = input.shift();
    const pattern = /^([$%])(?<tag>[A-Z][a-z]{2,})\1: \[\d+\][|]\[\d+\][|]\[\d+\][|]$/g;
    const digitPattern = /\d+/g
    for (let i = 0; i < n; i++) {
        let line = input[i];
        
        let match = pattern.exec(line);

        if(match === null) {
            console.log(`Valid message not found!`);
            continue;
        }

        while(match !== null) {
            const tag = match.groups.tag;
            const digits = line.match(digitPattern).map(Number);
            const decryptedMsg = digits.map(d => String.fromCharCode(d)).join('');

            console.log(`${tag}: ${decryptedMsg}`);

            match = pattern.exec(line);
        }
    }
}
solve(["3",
"This shouldnt be valid%Taggy%: [118]|[97]|[108]|",
"$tAGged$: [97][97][97]|",
"$Request$: [73]|[115]|[105]|true"])

