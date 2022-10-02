'use strict'
function reception(arr) {
    let studentsCount = +arr.pop();
    let recepEfficency = arr.map(Number);
    let hours = 0;

    while(studentsCount > 0){
        hours++;
        if(hours % 4 === 0) continue;

        studentsCount -= arr[0]
        studentsCount -= arr[1]
        studentsCount -= arr[2]
    }
    console.log(`Time needed: ${hours}h.`);
}


reception(
    ['1','1','1','10']
)










