'use strict';
function netherRalms(input) {
    const participantsCode = input.split(/,\s*/g).sort((a, b) => a.localeCompare(b));

    const hpPattern = /[^+\-*\/\.0-9\s]/g;
    const baseDmgPattern = /[+-]*\d+\.?\d*/g;
    const alterDmgPattern = /[\/\*]/g;
    for (let line of participantsCode) {
        line = line.replace(/\s/g, '');
        let [hp, dmg] = [0, 0]
        if (line.match(hpPattern))
        hp = line.match(hpPattern).reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
        // console.log(hp);
        if (line.match(baseDmgPattern))
        dmg = line.match(baseDmgPattern).reduce((acc, cur) => acc + +cur, 0);
        if (line.match(alterDmgPattern))
        line.match(alterDmgPattern).forEach(sy => {
            sy === '/' ? dmg /= 2 : dmg *= 2;
        })
        console.log(`${line} - ${hp} health, ${dmg.toFixed(2)} damage`);
    }

}
netherRalms(`M3ph  1st0**, A   zazel`)