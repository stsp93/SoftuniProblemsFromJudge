'use strict';
function softuniBar(input) {
    let pattern = /%(?<name>[A-Z][a-z]*)%[^|$%\.]*\<(?<product>\w+)\>[^|$%\.]*\|(?<count>\d+)\|[^|$%\.]*?(?<price>\d+\.*\d*\$)/g;
    let total = 0;
    for(let line of input) {
        if(line === 'end of shift') break;
        let match = pattern.exec(line);
        while(match !== null) {
            let name = match.groups.name;
            let product = match.groups.product;
            let count = +match.groups.count;
            let price = +(match.groups.price.slice(0,-1));

            console.log(`${name}: ${product} - ${(count * price).toFixed(2)}`);

            total += count * price;
            match = pattern.exec(line);
        }
    }
    console.log(`Total income: ${total.toFixed(2)}`);
}
softuniBar(['%George%<Croissant>|2|10.3$',
'%Peter%<Gum>|1|1.3$',
'%Maria%<Cola>|1|2.4$',
'end of shift']


)