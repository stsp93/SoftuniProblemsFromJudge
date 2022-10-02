'use strict'
function memory(arr) {
    let gameArr = arr.shift().split(' ');
    let moves = 0;
    for(let mov of arr.slice(0, -1)){
        let [i1, i2] = mov.split(' ').map(Number);
        moves++;

        if (i1 === i2 ||
            i1 >= gameArr.length ||
            i2 >= gameArr.length ||
            i1 < 0 ||
            i2 < 0) {
            console.log(`Invalid input! Adding additional elements to the board`);
            gameArr.splice(Math.floor(gameArr.length / 2), 0, `-${moves}a`, `-${moves}a`)
        } else if (gameArr[i1] === gameArr[i2]) {
            console.log(`Congrats! You have found matching elements - ${gameArr[i1]}!`);
            // may cause problem
            gameArr = gameArr.filter(el => el !== gameArr[i1])
        } else {
            console.log(`Try again!`);
        }
        if (!gameArr.length) {
            return console.log(`You have won in ${moves} turns!`);
        }

    }


    console.log('Sorry you lose :(');
    console.log(...gameArr);

}













