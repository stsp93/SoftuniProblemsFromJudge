'use strict';
function starEnigma(input) {
    const attacked = [];
    const destroyed = [];

    for(let i = 1; i <= +input[0]; i++){
        const line = input[i];
        const decryptPattern = /[star]/gi;

        const key = line.match(decryptPattern) ? line.match(decryptPattern).length : 0;
        const decryptedMsg = line.split('').map(ch => String.fromCharCode(ch.charCodeAt(0) - key)).join('');

        const planetPattern = /([^@\-!:>]*?)@(?<planet>[A-Za-z]+)([^@\-!:>]*?):(?<population>\d+)([^@\-!:>]*?)!(?<attack>[A|D])!([^@\-!:>]*?)->(?<soldiers>\d+)/g;
        let match = planetPattern.exec(decryptedMsg);
        while(match !== null) {
            const planet = match.groups.planet;
            const attack = match.groups.attack;
            if(attack === 'A') attacked.push(planet);
            if(attack === 'D') destroyed.push(planet);

            match = planetPattern.exec(decryptedMsg);
        }
    }
    attacked.sort((a, b) => a.localeCompare(b));
    destroyed.sort((a, b) => a.localeCompare(b));
    console.log(`Attacked planets: ${attacked.length}`);
    attacked.forEach(pl => console.log(`-> ${pl}`));
    console.log(`Destroyed planets: ${destroyed.length}`);
    destroyed.forEach(pl => console.log(`-> ${pl}`))

}
starEnigma(['0',
'STCDoghudddgsasdgasd4=63333$D$asdasd0A53333',
'EHfsytsnhadsgadgadaf?8555&I&2asdasdasdC9555SR']


)