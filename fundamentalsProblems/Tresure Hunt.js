function solve(input) {
    let chest = input[0].split('|');
    let commands = input.slice(1, -1);
    commands.forEach(cmd => {
        let [command, ...index] = cmd.split(' ');
        switch (command) {
            case 'Loot': {
                index.forEach(el => chest.includes(el) ? el : chest.unshift(el))
            };
                break;
            case 'Drop': {
                if (index >= 0 && index < chest.length) {
                    let item = chest.splice(index, 1).join('');
                    chest.push(item);
                }
            };
                break;
            case 'Steal': {
                console.log(chest.splice(-(index)).join(', '));
            }
        }
    })
    // console.log(chest);
    const avgGain = chest.reduce((acc, el) => acc + el.length, 0) / chest.length;
    if (chest.length) { 
        console.log(`Average treasure gain: ${avgGain.toFixed(2)} pirate credits.`); 
    } else { 
        console.log('Failed treasure hunt.');
    }

}
solve((["Gold|Silver|Bronze|Medallion|Cup",
"Loot Wood Gold Coins",
"Loot Silver Pistol",
"Drop 3",
"Steal 3",
"Yohoho!"])


)