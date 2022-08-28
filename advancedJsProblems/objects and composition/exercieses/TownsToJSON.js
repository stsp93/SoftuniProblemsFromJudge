function townsToJSON(input) {
    input.shift();
    const output = [];
    for(let line of input) {
        line = line.slice(2, -2)
        let [Town, Latitude, Longitude] = line.split(' | ');
        Latitude = +Number(Latitude).toFixed(2)
        Longitude = +Number(Longitude).toFixed(2)
        output.push({Town, Latitude, Longitude});
    }
    return JSON.stringify(output)
}
console.log(townsToJSON(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
));