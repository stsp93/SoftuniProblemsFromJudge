'use strict';
function passwordReset(input) {
    let password = input.shift();
    for (let line of input) {
        if (line === 'Done') {
            console.log(`Your password is: ${password}`);
        }

        let [cmd, token1, token2] = line.split(' ');

        if (cmd === 'TakeOdd') {
            password = password.split('').filter((ch, i) => i % 2 === 1).join('');
            console.log(password);
        }
        if (cmd === 'Cut') {
            password = password.replace(password.slice(+token1, +token1 + +token2), '');
            console.log(password);
        }
        if(cmd === 'Substitute'){
            if(password.includes(token1)){
                password = password.split(token1).join(token2);
                console.log(password);
            } else {
                console.log(`Nothing to replace!`);
            }
        }
    }
}
passwordReset(["up8rgoyg3r1atmlmpiunagt!-irs7!1fgulnnnqy",
"TakeOdd",
"Cut 18 2",
"Substitute ! ***",
"Substitute ? .!.",
"Done"])

