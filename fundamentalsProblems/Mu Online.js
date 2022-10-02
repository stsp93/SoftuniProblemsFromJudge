'use strict'
function mu(input) {
    const rooms = input.split('|')
    let health = 100;
    let bitcoins = 0;

    for (let i = 0; i < rooms.length; i++) {
        let [command, value] = rooms[i].split(' ');
        value = +value;

        if (command === 'potion') {
            if(health + value <= 100) {
                health += value;
                console.log(`You healed for ${value} hp.`);
            } else {
                console.log(`You healed for ${100 - health} hp.`);
                health = 100;
            }
            console.log(`Current health: ${health} hp.`);
        } else if (command === 'chest') {
            bitcoins += value;
            console.log(`You found ${value} bitcoins.`);
        } else {
            health -= value;
            if(health > 0) {
                console.log(`You slayed ${command}.`);
            } else {
                console.log(`You died! Killed by ${command}.`);
                console.log(`Best room: ${i+1}`);
                return;
            }
        }
    }
    console.log(`You've made it!`);
    console.log(`Bitcoins: ${bitcoins}`);
    console.log(`Health: ${health}`);
}
mu("cat 10|potion 30|orc 10|chest 10|snake 25|chest 110")