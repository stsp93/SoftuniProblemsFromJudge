'use strict';
function furniture(input) {
    let moneySpent = 0;
    let index = 0;
    const pattern = />>(?<furniture>[A-Z]\w+)<<(?<price>\d+\.*\d*)!(?<quantity>\d+)/g;
    console.log(`Bought furniture:`);
    for(let line of input){
        if(line === 'Purchase') break;

        let match = pattern.exec(line);
        while(match !== null){
            moneySpent += (match.groups.price * match.groups.quantity);
            console.log(match.groups.furniture);
            match = pattern.exec(line);
        }
    }
    console.log(`Total money spend: ${moneySpent.toFixed(2)}`);
}
furniture(['>Invalid<<!4',
'>Invalid<<!2',
'>Invalid<<!5',
'Purchase']

)