'use stict'
function cardGame(input) {
    const game = {};
    for (let draw of input) {
        let [name, cards] = draw.split(': ');
        cards = cards.split(', ');
        game.hasOwnProperty(name) ? game[name].push(...cards) : game[name] = cards;

    }
    for (let player in game) {
        const cards = new Set(game[player]);
        let score = Array.from(cards).map(card => {
            let points = 0;
            if (card[0] === 'A') {
                points += 14;
            } else if (card[0] === 'K') {
                points += 13;
            } else if (card[0] === 'Q') {
                points += 12;
            } else if (card[0] === 'J') {
                points += 11;
            } else if (card[1] === '0') {
                points += 10;
            } else {
                points += +card[0];
            }
            let i = 1;
            if(card.length === 3){
                i = 2;
            }
            if (card[i] === 'S') {
                points *= 4;
            } else if (card[i] === 'H') {
                points *= 3;
            } else if (card[i] === 'D') {
                points *= 2;
            } 
            return points;

        }).reduce((acc, cur) => acc + cur, 0);
        console.log(`${player}: ${score}`);

    }
}

cardGame([
    'Peter: 2C, 4H, 9H, AS, QS',
    'Tomas: 3H, 10S, JC, KD, 5S, 10S',
    'Andrea: QH, QC, QS, QD',
    'Tomas: 6H, 7S, KC, KD, 5S, 10C',
    'Andrea: QH, QC, JS, JD, JC',
    'Peter: JD, JD, JD, JD, JD, JD'
]
)