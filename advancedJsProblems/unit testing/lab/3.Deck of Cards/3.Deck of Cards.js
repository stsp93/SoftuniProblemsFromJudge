function deckOfCards(arr) {
    function playingCards(face, suit) {
        const suits = {
            'S': '\u2660',
            'H': '\u2665',
            'D': '\u2666',
            'C': '\u2663',
        }
        const faces = [...('23456789'.split('')), 'A', 'K', 'Q', 'J', '10']
        if (!faces.includes(face) || !suits.hasOwnProperty(suit)) throw Error('Invalid face');

        return face + suits[suit]
    }
    let output = [];
    for (let card of arr) {
        const face = card.slice(0, -1);
        const suit = card.slice(-1);
        try {
            output.push(playingCards(face, suit))
        } catch (err) {
            output = [`Invalid card: ${face}${suit}`];
        }
    }
    
    console.log(output.join(' '));
}

deckOfCards(['5X', '3D', '5X', ])