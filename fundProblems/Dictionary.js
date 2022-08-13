'use strict'
function solve(input) {
    const wordsDefinition = input.shift().split(' | ');
    const myWords = {};
    for(let line of wordsDefinition){
        let [word, definition] = line.split(': ');
        if(!myWords.hasOwnProperty(word)) {
            myWords[word] = [definition];
        } else {
            myWords[word].push(definition);
        }
    }
    const testWords = input.shift().split(' | ');
    const command = input.shift();
    if(command === 'Test'){
        for(let testWord of testWords) {
            if(myWords.hasOwnProperty(testWord)) {
                console.log(`${testWord}:`);
                myWords[testWord].forEach(def => console.log(` -${def}`));
            }
        }
    }
    if(command === 'Hand Over') {
       console.log(Object.keys(myWords).join(' ')); 
    }
}
solve(["tackle: the equipment required for a task or sport | code: write code for a computer program | bit: a small piece, part, or quantity of something | tackle: make determined efforts to deal with a problem | bit: a short time or distance",
"bit | code | tackle",
"Test"])


