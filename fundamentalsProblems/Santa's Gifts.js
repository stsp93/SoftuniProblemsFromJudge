'use strict';
function santasGifts(input) {
    let commandsCount = +input.shift();
    const houses = input.shift().split(' ').map(Number);
    let position = 0;

    function checkPos(pos) {
        if(pos < 0 || pos >= houses.length) return -1;
    }
    for(let i= 0; i < commandsCount; i++) {
        let [cmd, ...tokens] = input[i].split(' ');
        if(cmd === 'Forward'){
            const numOfSteps = +tokens[0];
            if(checkPos(numOfSteps + position) === -1) continue; 
            position += numOfSteps;
            houses.splice(position, 1);
        }
        if(cmd === 'Back'){
            const numOfSteps = +tokens[0];
            if(checkPos(position - numOfSteps) === -1) continue; 
            position -= numOfSteps;
            houses.splice(position, 1);
        }
        if(cmd === 'Gift'){
            const [index, houseNum] = tokens.map(Number);
            if(checkPos(index) === -1) continue; 
            houses.splice(index, 0, houseNum);
            position = index;
        }
        if(cmd === 'Swap'){
            let [indexOfFirst, indexOfSecond] = tokens.map(Number);
            indexOfFirst = houses.indexOf(indexOfFirst);
            indexOfSecond = houses.indexOf(indexOfSecond);
            if(indexOfFirst === -1 || indexOfSecond === -1) continue;
            [houses[indexOfFirst], houses[indexOfSecond]] = [houses[indexOfSecond],houses[indexOfFirst]];
        }
    }
    console.log(`Position: ${position}`);
    console.log(houses.join(', '));
}
santasGifts(['6',
    '50 40 25 63 78 54 66 77 24 87',
    'Forward 4',
    'Back 3',
    'Forward 3',
    'Gift 2 88',
    'Swap 50 87',
    'Forward 1'
]
    )

