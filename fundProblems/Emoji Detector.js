'use strict';
function emojiDetector(input) {
    const string = input[0];
    const coolEmojis = [];
    let emojisCount = 0;
    const digitPattern = (/\d/g);
    const pattern = /(?<coolEmoji>([:]{2}|[*]{2})(?<emoji>[A-Z][a-z]{2,})\2)/g;
    
    
    let coolThresh = string.match(digitPattern);
    coolThresh = coolThresh.reduce((acc, cur) => acc * +cur, 1)



    let match = pattern.exec(string);

    while (match !== null) {
        let emoji = match.groups.emoji;
        emojisCount++;

        const coolness = emoji.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
        if (coolness > coolThresh)
            coolEmojis.push(match.groups.coolEmoji);

        match = pattern.exec(string);
    }


    console.log(`Cool threshold: ${coolThresh}`);
    console.log(`${emojisCount} emojis found in the text. The cool ones are:`);
    coolEmojis.forEach(e => console.log(e))
}
emojiDetector(["::Mooning:::Tasd::   It is a long established fact that a reader will be distracted by 1315  the readable content of a page when looking at its layout. The point of using ::LoremIpsum:: is that it has a more-or-less normal  distribution of  letters, as opposed to using 'Content here, content  here', making it look like readable **English**."])