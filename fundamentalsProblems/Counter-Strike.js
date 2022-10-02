'use strict'
function cs(input) {
    let energy = +input[0];
    const battles = input.slice();
    let battlesWon = 0;
    for(let i = 1; i <= battles.length; i++){
        const battle = +battles[i];
        if(battles[i] === 'End of battle') {
            
           console.log(`Won battles: ${battlesWon}. Energy left: ${energy}`); 
           break;
        }
        if(energy === 0) {
            console.log(`Not enough energy! Game ends with ${battlesWon} won battles and ${energy} energy`);
            break;
        }
        energy -= battle;
        if(energy >= 0) battlesWon++;
        if(energy < 0) {
            console.log(`Not enough energy! Game ends with ${battlesWon} won battles and ${energy + battle} energy`);
            break;
        }
        
        if(i % 3 === 0) energy += battlesWon
    }
}
cs(["10",
"10",
])


