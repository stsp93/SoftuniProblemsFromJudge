function solve(input) {
    const pirateSections = input.shift().split('>').map(el => Number(el));
    const warSections = input.shift().split('>').map(el => Number(el));
    const maxHP = Number(input.shift());
    let isStalemate = true;
    input.pop();
    outer: for (let el of input) {
        let [cmd, ...index] = el.split(' ');
        switch (cmd) {
            case 'Fire': {
                const i = Number(index[0]);
                const dmg = Number(index[1]);
                if (i >= 0 && i < warSections.length) {
                    warSections[i] -= dmg;
                    if (warSections[i] <= 0) {
                        console.log('You won! The enemy ship has sunken.');
                        isStalemate = false;
                        break outer;
                    }
                }
            };
                break;
            case 'Defend': {
                let start = Number(index[0]);
                const end = Number(index[1]);
                const dmg = Number(index[2]);
                if (start >= 0 &&
                    start < pirateSections.length - 1 && end > 0 &&
                    end < pirateSections.length) {
                    for (start; start <= end; start++) {
                        pirateSections[start] -= dmg;
                        if (pirateSections[start] <= 0) {
                            console.log('You lost! The pirate ship has sunken.');
                            isStalemate = false;
                            break outer;
                        }
                    }
                }
            };
                break;
            case 'Repair': {
                const i = Number(index[0]);
                const hp = Number(index[1]);
                if (i >= 0 && i < pirateSections.length) {
                    pirateSections[i] += hp;
                    if (pirateSections[i] > maxHP) {
                        pirateSections[i] = maxHP;
                    }
                }
            };
                break;
            case 'Status': {
                let count = pirateSections.filter(el => el < maxHP * 0.2).length;
                console.log(`${count} sections need repair.`);
            }
        }

    }
    if (isStalemate) {
        let hpSum = ship => ship.reduce((acc, el) => acc + el, 0)
        console.log(`Pirate ship status: ${hpSum(pirateSections)}`);
        console.log(`Warship status: ${hpSum(warSections)}`);
    }

}
solve((["2>3>4>5>2",
"6>7>8>9>10>11",
"20",
"Status",
"Fire 2 3",
"Defend 0 4 11",
"Repair 3 18",
"Retire"])


)