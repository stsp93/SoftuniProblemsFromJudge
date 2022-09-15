function playingCards(face,suit) {
    const suits = {
        'S': '\u2660',
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663',
    }
    const faces = [...('23456789'.split('')), 'A','K','Q','J','10']
    if(!faces.includes(face)) throw Error('Invalid face');
    return face + suits[suit]
}
console.log(playingCards('10', 'C'));