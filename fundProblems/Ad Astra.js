'use strict';
function adAstra(input) {
    const string = input[0];
    const pattern = /([#|])(?<item>[A-Za-z\s]+)\1(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{2})\1(?<calories>[0-9][0-9]?[0-9]?[0-9]?0?)\1/g;
    
    let totalCal = 0;
    const outputArr = [];
    let match = pattern.exec(string);
    while(match !== null) {
        totalCal += +match.groups.calories;
        const outputLine = `Item: ${match.groups.item}, Best before: ${`${match.groups.day}/${match.groups.month}/${match.groups.year}`}, Nutrition: ${match.groups.calories}`
        outputArr.push(outputLine);
        match = pattern.exec(string)
    }
    console.log(`You have food to last you for: ${Math.floor(totalCal / 2000)} days!`);
    outputArr.forEach(l => console.log(l))
}
adAstra([ '$$#@@%^&#Fish#24/12/20#8500#|#Incorrect#19.03.20#450|$5*(@!#Ice Cream#03/10/21#9000#^#@aswe|Milk|05/09/20|2000|' ]
    )