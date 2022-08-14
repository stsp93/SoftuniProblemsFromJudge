'use strict';
function plantDiscovery(input) {
    const n = input.shift();
    const myPlants = {};

    for (let line of input.slice(0, n)) {
        let [plant, rarity] = line.split('<->');
        myPlants[plant] = [rarity]
    }
    for (let line of input.slice(n)) {
        if (line === 'Exhibition') {
            console.log(`Plants for the exhibition:`);
            for(let [plant, [rarity, ...rating]] of Object.entries(myPlants)){
                rating = rating.length === 0 ? 0 : rating.reduce((acc, cur) => acc + cur, 0) / rating.length;
                console.log(`- ${plant}; Rarity: ${rarity}; Rating: ${rating.toFixed(2)}`);
            }
            break;
        }
        let [cmd, plant, token] = line.replace(' -', ':').split(': ');
        if(!myPlants.hasOwnProperty(plant)){
            console.log(`error`);
            continue;
        }
        if(cmd === 'Rate'){
            myPlants[plant].push(+token);
        }
        if(cmd === 'Update'){
            myPlants[plant][0] = token;
        }
        if(cmd === 'Reset'){
            myPlants[plant] = myPlants[plant].slice(0,1);
        }
    }
}
plantDiscovery(["2",
"Candelabra<->10",
"Oahu<->10",
"Rate: Oahu - 7",
"Rate: Candelabra - 6",
"Exhibition"])

