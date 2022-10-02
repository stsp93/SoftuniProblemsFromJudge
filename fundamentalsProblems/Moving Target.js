'use strict'
function movTarget(input) {
    let targets = input[0].split(' ').map(Number);
    let index = 1;
    while(input[index]) {
        let [command, i, value] = input[index].split(' ');
        i = +i
        value = +value;
        if(command ==='Shoot'){
            if(targets[i]) {
                targets[i] -= value;
                if (targets[i] <= 0) targets.splice(targets.indexOf(targets[i]) , 1);
            }
        }
        if(command ==='Add'){
            if(targets[i]){
                targets.splice(targets.indexOf(targets[i]),0,value)
            } else {
                console.log('Invalid placement!');
            }
        };
        if(command ==='Strike'){
            if(targets[i] && targets[i + value] && targets[i - value]) {
                for(let j = i - value; j <= i + value; j++){
                    targets[j]= 0;
                }
                targets = targets.filter(t => t !== 0);
            } else {
                console.log('Strike missed!');
            }
        };
        if(input[index] === 'End') return console.log(targets.join('|'));
        index++;
    }

}
movTarget(["52 74 23 44 96 110",
"Shoot 5 10",
"Shoot 1 80",
"Strike 2 1",
"Add 22 3",
"End"])


