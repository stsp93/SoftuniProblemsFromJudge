'use strict';
function pirates(input) {
    let index = 0;
    const cities = {};
    while (input[index] !== 'Sail') {
        let [town, popul, gold] = input[index].split('||');

        if (!cities.hasOwnProperty(town)) {
            cities[town] = [+popul, +gold];
        } else {
            cities[town][0] += +popul;
            cities[town][1] += +gold;
        }
        index++;
    }
    while (input[index++] !== 'End') {
        let [cmd, ...tokens] = input[index].split('=>');
        if (cmd === 'Plunder') {
            let [town, people, gold] = tokens;
            cities[town][0] -= +people;
            cities[town][1] -= +gold;
            console.log(`${town} plundered! ${gold} gold stolen, ${people} citizens killed.`);
            if(cities[town][0] <= 0 || cities[town][1] <= 0) {
                console.log(`${town} has been wiped off the map!`);
                delete cities[town];
            }
        }

        if(cmd === 'Prosper'){
            let [town, gold] = tokens;
            if(gold < 0) {
                console.log(`Gold added cannot be a negative number!`);
                continue;
            }
            cities[town][1] += +gold;
            console.log(`${gold} gold added to the city treasury. ${town} now has ${cities[town][1]} gold.`);
        }
    }
    const cityCount = Object.keys(cities).length;
    if(cityCount > 0) {
        console.log(`Ahoy, Captain! There are ${cityCount} wealthy settlements to go to:`);
        for(let [town, [people, gold]] of Object.entries(cities)) {
            console.log(`${town} -> Population: ${people} citizens, Gold: ${gold} kg`);
        }
    } else {
        console.log(`Ahoy, Captain! All targets have been plundered and destroyed!`);
    }
}
pirates(["Nassau||95000||1000",
"San Juan||930000||1250",
"Campeche||270000||690",
"Port Royal||320000||1000",
"Port Royal||100000||2000",
"Sail",
"Prosper=>Port Royal=>-200",
"Plunder=>Nassau=>94000=>750",
"Plunder=>Nassau=>1000=>150",
"Plunder=>Campeche=>150000=>690",
"End"])

