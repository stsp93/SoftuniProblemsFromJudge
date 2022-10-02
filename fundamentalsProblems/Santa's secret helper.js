'use strict';
function secretHelper(input) {
    const key = +input.shift();
    const pattern = /@(?<name>[A-Za-z]+)[^@\-!:>]+!(?<behavior>[GN])!/g;
    const goodKids = [];
    for(let line of input) {
        if(line === 'end') {
            console.log();
            break;
        }
        const msg = line.split('').map(ch => ch.charCodeAt(0) - key).map(n => String.fromCharCode(n)).join('');
        
        let match = pattern.exec(msg);
        while(match !== null) {
            const name = match.groups.name
            const behavior = match.groups.behavior
            if(behavior === 'G') console.log(name);
            match = pattern.exec(msg);
        }
        
        
    }
}
secretHelper(['3',
    'CNdwhamigyenumje$J$',
    'CEreelh-nmguuejn$J$',
    'CVwdq&gnmjkvng$Q$',
    'end']
    )