'use strict';
function travelTime(input) {
    const flights = {}
    for(let data of input) {
        let [country, town, cost] = data.split(' > ');
        cost = +cost;
        if(!flights.hasOwnProperty(country)) {
            flights[country] = {[town] : cost}
        } else {
            if(!flights[country].hasOwnProperty(town)) {
                flights[country][town] = cost;
            } else {
                flights[country][town] < cost ? flights[country][town] : flights[country][town] = cost;
            }
        }
    }
    let sortedCountries = Object.entries(flights).sort((a, b) => a[0].localeCompare(b[0]));
    for(let [country, towns] of sortedCountries) {
        let sortedTowns = Object.entries(towns).sort((a, b) => a[1] - b[1]);
        let output = ''
        sortedTowns.forEach(town => output += `${town.join(' -> ')} `);
        console.log(`${country} -> ${output}`);

    }
}
travelTime([
    'Bulgaria > Sofia > 25000',
    'Bulgaria > Sofia > 25000',
    'Kalimdor > Orgrimar > 25000',
    'Albania > Tirana > 25000',
    'Bulgaria > Varna > 25010',
    'Bulgaria > Lukovit > 10',
    'aaa > Lukovit > 10'
    ]
    
    
    
    
    )