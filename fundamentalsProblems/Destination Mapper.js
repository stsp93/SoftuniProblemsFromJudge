'use strict';
function destMapper(input) {
    let match = input.match(/([=\/])([A-Z][A-Za-z]{2,})\1/g);
    let points = 0;
    if (match !== null) {
        match = match.map(el => el.slice(1, -1));
        points = match.reduce((acc, cur) => acc + cur.length, 0);
        
    }
    match = match === null ? '':  match.join(', ')
    console.log(`Destinations: ${match}`);
    console.log(`Travel Points: ${points}`);
}
destMapper("ThisIs some InvalidInput")