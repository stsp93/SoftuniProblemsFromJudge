'use strict'
function solve(input) {
    let rooms = input[0].split('|');
    let hp = 100;
    let coins = 0; 
    for(let i = 0; i< rooms.length;i++) {
        let [itemOrMonster, number] = rooms[i].split(' ');
        number = +number;
        switch(itemOrMonster){
            case 'potion':{
                hp += number;
                if(hp > 100) {
                    console.log(`You healed for ${number - (hp - 100)} hp.`);
                    hp = 100;
                } else {

                    console.log(`You healed for ${number} hp.`);
                }
                console.log(`Current health: ${hp} hp.`);
                break; 
            }
            case 'chest':{
                coins += number;
                console.log(`You found ${number} coins.`);
                break;
            }
            default : {
                hp -= number;
                if(hp > 0){
                    console.log(`You slayed ${itemOrMonster}.`);
                } else {
                    console.log(`You died! Killed by ${itemOrMonster}.`);
                    console.log(`Best room: ${i+1}`);
                    return;
                }
                break;
            }
        }
    }
    console.log("You've made it!");
    console.log(`Coins: ${coins}`);
    console.log(`Health: ${hp}`);
    
}


















