'use strict'
function guineaPig(input) {
    let food = input[0] * 1000;
    let hay = input[1] * 1000;
    let cover = input[2] * 1000;
    const weight = input[3] * 1000;
    const dailyFood = 300;
    for (let i = 1; i <= 30; i++) {
        food -= dailyFood;
        if(i % 2 === 0) hay -= food * 0.05;
        if(i % 3 === 0) cover -= weight / 3;
    }
    if(food >= 0 && hay >= 0 && cover >= 0) {
        console.log(`Everything is fine! Puppy is happy! Food: ${(food/1000).toFixed(2)}, Hay: ${(hay/1000).toFixed(2)}, Cover: ${(cover/1000).toFixed(2)}.`);
    } else {
        console.log(`Merry must go to the pet store!`);
    }
}
guineaPig(["1", 
"1.5", 
"3", 
"1.5"
])

