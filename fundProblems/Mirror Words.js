'use strict';
function mirrorWords(input) {
    const [string] = input;
    const pattern = /([@#])(?<firstword>[A-Za-z]{3,})\1\1(?<secondword>[A-Za-z]{3,})\1/g;
    let validPairs = 0;
    const mirrorWords = []
    let match = pattern.exec(string);
    while(match !== null){
        validPairs++;
        let firstword = match.groups.firstword;
        let secondword = match.groups.secondword;
        if(firstword === secondword.split('').reverse().join('')){
            mirrorWords.push(`${firstword} <=> ${secondword}`)
        }
        match = pattern.exec(string);
    }
    if(validPairs === 0) {
        console.log(`No word pairs found!`);
    } else {
        console.log(`${validPairs} word pairs found!`);
    }
    if(mirrorWords.length === 0) {
        console.log(`No mirror words!`);
    } else {
        console.log(`The mirror words are:`)
       console.log(`${mirrorWords.join(', ')}`);

        
    }
}
mirrorWords([ '#po0l##l0op# @bAc##cAB@ @LM@ML@ #xxxXxx##xxxXxx# @aba@@ababa@' ]
    )