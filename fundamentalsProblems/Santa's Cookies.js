'use strict';
function santasCookies(input) {
    const n = +input.shift();
    let [singleCookieGrams, cup, smallSpoon, bigSpoon, cookiesPerBox] = [25, 140, 10, 20, 5];
    let total = 0;
    for (let i = 0; i < n; i++) {
        let flour = +input[3*i];
        let sugar = +input[3*i + 1];
        let cocoa = +input[3*i + 2];

        let flourCups = Math.floor(flour / cup);
        let sugarSpoons =  Math.floor(sugar / bigSpoon);
        let cocoaSpoons =Math.floor(cocoa / smallSpoon);

        if(flourCups <= 0 || sugarSpoons <= 0 || cocoaSpoons <= 0) {
            console.log(`Ingredients are not enough for a box of cookies.`);
            continue;
        }

        const cookiesCount = (cup + smallSpoon + bigSpoon) * Math.min(flourCups,sugarSpoons,cocoaSpoons) / singleCookieGrams;
        const boxes = Math.floor(cookiesCount / cookiesPerBox) 
        total += boxes;
        console.log(`Boxes of cookies: ${boxes}`);
    }
    console.log(`Total boxes: ${total}`);
}
santasCookies(['1',
    '1400',
    '200',
    '100'
    
])