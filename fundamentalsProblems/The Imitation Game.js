'use strict'
function theImitationGame(input) {
    const hiddMsg = input[0];
    const lines = input.slice(1);
    let messageArr = hiddMsg.split('');
    for(let line of lines) {
        if(line === 'Decode') break;
        let [cmd, arg1, arg2] = line.split('|');

        if(cmd === 'Move') {
            messageArr = [...messageArr.slice(+arg1), ...messageArr.slice(0, +arg1)];
        }
        if(cmd === 'Insert') {
            messageArr.splice(arg1, 0, arg2);
        }
        if(cmd === 'ChangeAll') {
            let msg = messageArr.join('');
            while(msg.includes(arg1)) msg = msg.replace(arg1, arg2);
            messageArr = msg.split('')
        }
    }
    const message = messageArr.join('')
    console.log(`The decrypted message is: ${message}`);
} 
theImitationGame([
    '',
    'ChangeAll|z|l',
    'Insert|2|o',
    'Move|3',
    'Decode',
  ]
  
  
  )