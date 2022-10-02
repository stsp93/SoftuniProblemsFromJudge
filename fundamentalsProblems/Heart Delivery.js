'use strict'
function heartDelivery(input) {
    const neighborhood = input[0].split('@');
    let index = 1;
    let pos = 0;
    while (input[index] !== 'Love!') {
        const length = +input[index].split(' ')[1];
        pos = pos + length < neighborhood.length ? pos + length : 0;

        if (neighborhood[pos] === 0) {
            console.log(`Place ${pos} already had Valentine's day.`);
        } else {
            neighborhood[pos] -= 2;
            if (neighborhood[pos] === 0) console.log(`Place ${pos} has Valentine's day.`);
        }
        ;
        index++;

    }
    const housesWithoutValentine = neighborhood.filter(el => el !== 0).length;
    console.log(`Cupid's last position was ${pos}.`);
    if(housesWithoutValentine) {
        console.log(`Cupid has failed ${housesWithoutValentine} places.`);
    } else console.log(`Mission was successful.`);
}

heartDelivery(["2@4@2",
    "Jump 2",
    "Jump 2",
    "Jump 8",
    "Jump 3",
    "Jump 1",
    "Love!"])

