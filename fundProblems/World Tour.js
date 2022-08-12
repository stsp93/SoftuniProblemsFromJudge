'use strict';
function worldTour(input) {
    let string = input.shift();
    for (let line of input) {
        if (line === 'Travel') {
            console.log(`Ready for world tour! Planned stops: ${string}`);
            break;
        }
        let [cmd, token1, token2] = line.split(':');

        if (cmd === 'Add Stop') {
            if (+token1 >= 0 && +token1 < string.length) {
                string = string.split('')
                string.splice(+token1, 0, token2)
                string = string.join('');
            }
            console.log(string);
        }
        if (cmd === 'Remove Stop') {
            if (+token1 >= 0 && +token1 < string.length && +token2 >= 0 && +token2 < string.length) {
                string = string.split('');
                string.splice(+token1,+token2 - +token1 + 1)
                string = string.join('');
            }
            console.log(string);
        }
        if (cmd === 'Switch') {
            if(string.includes(token1)){
                string = string.split(token1).join(token2);
            }
            console.log(string);
        }
    }
}
worldTour(["Hawai::Cyprys-Greece",
    "Add Stop:7:Rome",
    "Remove Stop:11:16",
    "Switch:Hawai:Bulgaria",
    "Travel"])
