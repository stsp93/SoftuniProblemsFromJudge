function solve(input) {
    input = input.map(el => Number(el));
    let [days, dailyPlunder, expectedPlunder] = input;
    let plundered = 0;
    for (let i = 1; i <= days; i++){
        plundered += dailyPlunder
        if(i % 3 === 0 ){
            plundered += dailyPlunder / 2;
        }
        if(i % 5 === 0){
            plundered *= 0.7;
        }
    }
    if(plundered >= expectedPlunder){
        console.log(`Ahoy! ${plundered.toFixed(2)} plunder gained.`);
    } else {
        console.log(`Collected only ${((plundered/expectedPlunder) * 100).toFixed(2)}% of the plunder.`);
    }
}
solve((["5",
"40",
"100"])
)