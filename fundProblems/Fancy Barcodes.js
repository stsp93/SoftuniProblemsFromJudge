'use strict';
function fancyBarcodes(input) {
    const n = input.shift();
    const digitPattern = /[0-9]/g
    for(let i = 0; i< n; i++) {
        const codePattern = /@#+(?<valid>[A-Z][A-Za-z0-9]{4,}[A-Z])@#+/g
        const barcode = input[i];
        let match = codePattern.exec(barcode);
        if(match === null) {
            console.log(`Invalid barcode`);
            continue;
        }
        let digitMatch = match.groups.valid.match(digitPattern);
        const productGroup = digitMatch === null ? '00' : digitMatch.reduce((acc, cur) => acc + cur, '');
        console.log(`Product group: ${productGroup}`);
    }
}
fancyBarcodes(["3",
"@#FreshFisH@#",
"@###Brea0D@###",
"@##Che4s6E@##"])
