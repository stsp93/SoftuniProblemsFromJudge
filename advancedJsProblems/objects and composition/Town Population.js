function townPopulation(input) {
    const registry = {}
    for(let line of input) {
        let [city, population] = line.split(' <-> ');
        population = +population;
        registry[city] = (registry[city] || 0) + population;
    }
    return Object.entries(registry).map(c => `${c[0]} : ${c[1]}`).join('\n');
}
console.log(townPopulation(['Istanbul <-> 100000',
'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000']

));