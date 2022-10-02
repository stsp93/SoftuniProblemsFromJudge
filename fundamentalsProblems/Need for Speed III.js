'use strict';
function needForSpeed(input) {
    const n = +input.shift();
    const myCars = {};
    for(let line of input.slice(0,n)){
        let [car, mileage, fuel] = line.split('|');
        fuel = +fuel;
        mileage = +mileage;
        myCars[car] = [mileage, fuel];
    }

    for(let line of input.slice(n)) {
        if(line === 'Stop'){
            for(let [car, [mileage,fuel]] of Object.entries(myCars)){
                console.log(`${car} -> Mileage: ${mileage} kms, Fuel in the tank: ${fuel} lt.`);
            }
        }
        let [cmd, car, token1, token2] = line.split(' : ');

        if(cmd === 'Drive'){
            if(myCars[car][1] < +token2) {
                console.log(`Not enough fuel to make that ride`);
            } else {
                const mileageLeft = 100000 - myCars[car][0];
                if(mileageLeft > +token1){
                    myCars[car][0] += +token1;
                    myCars[car][1] -= +token2;
                    console.log(`${car} driven for ${token1} kilometers. ${token2} liters of fuel consumed.`);
                } else {
                    console.log(`${car} driven for ${token1} kilometers. ${token2} liters of fuel consumed.`);
                    delete myCars[car];
                    console.log(`Time to sell the ${car}!`);
                }
            }
        }
        if(cmd === 'Refuel'){
            const litersToFill = 75 - myCars[car][1];
            if(litersToFill >= +token1){
                myCars[car][1] += +token1;
                console.log(`${car} refueled with ${token1} liters`);
            } else {
                myCars[car][1] = 75;
                console.log(`${car} refueled with ${litersToFill} liters`);
            }
        }
        if(cmd === 'Revert'){
            if(myCars[car][0] - +token1 < 10000){
                myCars[car][0] = 10000;
            } else {
                myCars[car][0] -= +token1;
                console.log(`${car} mileage decreased by ${token1} kilometers`);
            }
        }
    }
}
needForSpeed([
    '3',
    'Audi A6|38000|62',
    'Mercedes CLS|11000|35',
    'Volkswagen Passat CC|45678|5',
    'Drive : Audi A6 : 543 : 47',
    'Drive : Mercedes CLS : 94 : 11',
    'Drive : Volkswagen Passat CC : 69 : 8',
    'Refuel : Audi A6 : 50',
    'Revert : Mercedes CLS : 500',
    'Revert : Audi A6 : 30000',
    'Stop'
  ]
  
  
  )