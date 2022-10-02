'use strict';
function secretChat(input) {
    let concealedMsg = input.shift();
    for(let line of input) {
        if(line === 'Reveal') {
            console.log(`You have a new text message: ${concealedMsg}`);
            break;
        }
        let [cmd, token1, token2] = line.split(':|:');

        if(cmd === 'InsertSpace'){
            concealedMsg = concealedMsg.split('')
            concealedMsg.splice(+token1,0,' ');
            concealedMsg = concealedMsg.join('');
            console.log(concealedMsg);
        }
        if(cmd === 'Reverse'){
            if(concealedMsg.includes(token1)){
                concealedMsg = concealedMsg.replace(token1,'');
                concealedMsg = concealedMsg + token1.split('').reverse().join('');
                
                console.log(concealedMsg);
            } else {
                console.log('error');
            }
        }
        if(cmd === 'ChangeAll'){
            if(concealedMsg.includes(token1))
            concealedMsg = concealedMsg.split(token1).join(token2);
            console.log(concealedMsg);
        }
    }
}
secretChat([
    'Hiware?uiy',
    'ChangeAll:|:i:|:o',
    'Reverse:|:?uoy',
    'Reverse:|:jd',
    'InsertSpace:|:3',
    'InsertSpace:|:7',
    'Reveal'
  ]
  
  
  )