'use strict';
function race(input) {
    const participants = {};
    for(let name of input.shift().split(', ')){
        participants[name] = 0;
    }
    for(let line of input) {
        if(line === 'end of race') break;
        const match = line.match(/[A-Za-z0-9]/g);
        let nameArr = [];
        let dist = 0;
        for(let char of match) {
            if(+char || +char === 0) {
                dist += +char
            } else {
                nameArr.push(char);
            }
        }
        const name = nameArr.join('');
        if(participants.hasOwnProperty(name)) participants[name] += dist;
    }
    const sortedParticipants = Object.entries(participants).sort((a, b) => b[1] - a[1]);
    console.log(`1st place: ${sortedParticipants[0][0]}`);
    console.log(`2nd place: ${sortedParticipants[1][0]}`);
    console.log(`3rd place: ${sortedParticipants[2][0]}`);
}
race(['Ronald, Bill, Tom, Timmy, Maggie, Michonne',
'Mi*&^%$ch123o!#$%#nne787) ',
'%$$B(*&&)i89ll)*&) ',
'R**(on%^&ald992) ',
'T(*^^%immy77) ',
'Ma10**$#g0g0g0i0e',
'end of race']

)