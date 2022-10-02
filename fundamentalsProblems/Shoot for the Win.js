'use strict'
function shootForTheWin(input){
    let targets = input[0].split(' ').map(Number);
    let targetShot = 0;
    let index = 1;
    while(input[index] !== 'End'){
        const target = +input[index];
        // console.log(target);
        if(targets[target] || targets[target] === 0) {
            targets = targets.map(t => {
                if(t === -1) return t;
                if(t > targets[target]) return t -= targets[target];
                if(t <= targets[target]) return t += targets[target];
            })
            targets[target] = -1;
            targetShot++;
        }
        index++;
    }
    console.log(`Shot targets: ${targetShot} -> ${targets.join(' ')}`);

}
shootForTheWin(["0",
"1",
"6",
"0",

"End"])




