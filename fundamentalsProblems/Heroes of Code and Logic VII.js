'use strict';
function hoCL(input) {
    const n = input.shift();
    const myHeroes = {};
    for (let line of input.slice(0, n)) {
        let [hero, hp, mp] = line.split(' ');
        hp = +hp;
        mp = +mp;
        myHeroes[hero] = [hp, mp];
    }

    for (let line of input.slice(n)) {
        if (line === 'End') {
            for (let [hero, [hp, mp]] of Object.entries(myHeroes)) {
                console.log(hero);
                console.log(`  HP: ${hp}`);
                console.log(`  MP: ${mp}`);
            }
            break;
        }

        let [cmd, hero, ...tokens] = line.split(' - ');

        if (cmd === 'CastSpell') {
            let [manaNeed, spell] = tokens;
            if (myHeroes[hero][1] >= manaNeed) {
                myHeroes[hero][1] -= manaNeed;
                console.log(`${hero} has successfully cast ${spell} and now has ${myHeroes[hero][1]} MP!`);
            } else {
                console.log(`${hero} does not have enough MP to cast ${spell}!`);
            }
        }

        if (cmd === 'TakeDamage') {
            let [dmg, attacker] = tokens;
            myHeroes[hero][0] -= dmg;
            if (myHeroes[hero][0] > 0) {
                console.log(`${hero} was hit for ${dmg} HP by ${attacker} and now has ${myHeroes[hero][0]} HP left!`);
            } else {
                console.log(`${hero} has been killed by ${attacker}!`);
                delete myHeroes[hero];
            }
        }

        if (cmd === 'Recharge') {
            let [amount] = tokens;
            amount = +amount;
            const mpToRecover = 200 - myHeroes[hero][1];
            if (mpToRecover >= amount) {
                myHeroes[hero][1] += amount;
                console.log(`${hero} recharged for ${amount} MP!`);
            } else {
                myHeroes[hero][1] = 200;
                console.log(`${hero} recharged for ${mpToRecover} MP!`);
            }
        }

        if (cmd === 'Heal') {
            let [amount] = tokens;
            amount = +amount;
            const hpToRecover = 100 - myHeroes[hero][0];
            if (hpToRecover >= amount) {
                myHeroes[hero][0] += amount;
                console.log(`${hero} healed for ${amount} HP!`);
            } else {
                myHeroes[hero][0] = 100;
                console.log(`${hero} healed for ${hpToRecover} HP!`);
            }
        }
    }
}
// hoCL(['2',
//     'Solmyr 85 120',
//     'Kyrre 99 50',
//     'Heal - Solmyr - 10',
//     'Recharge - Solmyr - 50',
//     'TakeDamage - Kyrre - 66 - Orc',
//     'CastSpell - Kyrre - 15 - ViewEarth',
//     'End']
// )
hoCL(['4',
'Adela 90 150',
'SirMullich 70 40',
'Ivor 1 111',
'Tyris 94 61',
'Heal - SirMullich - 50',
'Recharge - Adela - 100',
'CastSpell - Tyris - 1000 - Fireball',
'TakeDamage - Tyris - 99 - Fireball',
'TakeDamage - Ivor - 3 - Mosquito',
'End']
)
// (   [ '4'
//     'Adela 90 150'
//     'SirMullich 70 40'
//     'Ivor 1 111'
//     'Tyris 94 61'
//     'Heal - SirMullich - 50'
//     'Recharge - Adela - 100'
//     'CastSpell - Tyris - 1000 - Fireball'
//     'TakeDamage - Tyris - 99 - Fireball'
//     'TakeDamage - Ivor - 3 - Mosquito'
//    'End']
//     )