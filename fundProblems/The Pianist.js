'use strict';
function pianist(input) {
    const n = input.shift();
    const myPiecesArr = input.slice(0, n);
    const commandsArr = input.slice(n);
    const myPieces = {};
    for(let line of myPiecesArr) {
        let [piece, composer, key] = line.split('|');
            myPieces[piece] = [composer, key]

    }

    for(let line of commandsArr) {
        if(line === 'Stop') {
            for(let [piece, [composer, key]] of Object.entries(myPieces)) {
                console.log(`${piece} -> Composer: ${composer}, Key: ${key}`);
            }
            break;
        }

        let [cmd, ...tokens] = line.split('|');
        if(cmd === 'Add') {
            let [piece, composer, key] = tokens;

            if(!myPieces.hasOwnProperty(piece)) {
                myPieces[piece] = [composer, key];
                console.log(`${piece} by ${composer} in ${key} added to the collection!`);
            } else {
                console.log(`${piece} is already in the collection!`);
            }
        }
        if(cmd === 'Remove') {
            let [piece] = tokens;
            if(myPieces.hasOwnProperty(piece)) {
                delete myPieces[piece];
                console.log(`Successfully removed ${piece}!`);
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
            }
        }
        if(cmd === 'ChangeKey') {
            let [piece, newKey] = tokens;
            if(myPieces.hasOwnProperty(piece)) {
                myPieces[piece][1] = newKey;
                console.log(`Changed the key of ${piece} to ${newKey}!`);
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
            }
        }

    }

}
pianist([
    '4',
    'Eine kleine Nachtmusik|Mozart|G Major',
    'La Campanella|Liszt|G# Minor',
    'The Marriage of Figaro|Mozart|G Major',
    'Hungarian Dance No.5|Brahms|G Minor',
    'Add|Spring|Vivaldi|E Major',
    'Remove|The Marriage of Figaro',
    'Remove|Turkish March',
    'ChangeKey|Spring|C Major',
    'Add|Nocturne|Chopin|C# Minor',
    'Stop'
  ]
  
  )