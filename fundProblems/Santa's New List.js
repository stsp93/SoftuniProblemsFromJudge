'use strict';
function santasNewList(input) {
    const children = {};
    const toys = {}

    for(let line of input) {
        if(line === 'END') {
            console.log('Children:');
            Object.entries(children).sort((a,b) => a[0].localeCompare(b[0])).sort((a,b) => b[1] - a[1]).forEach(c => console.log(c.join(' -> ')));
            console.log('Presents:');
            Object.entries(toys).forEach(t => console.log(t.join(' -> ')))
        }

        let [name, type, count] = line.split('->');
        count = +count;

        if(name === 'Remove') {
            delete children[type];
            continue;
        }

        if(!children.hasOwnProperty(name)) {
            children[name] = count;
        } else {
            children[name] += count;
        }

        if(!toys.hasOwnProperty(type)) {
            toys[type] = count;
        } else {
            toys[type] += count;
        }
    }
}
santasNewList(['Marty->Toys->5',
    'Sam->Candy->20',
    'Leo->Candy->10',
    'Leo->Toys->1',
    'Katy->Clothes->4',
    'Bobbie->Clothes->6',
    'Tanya->Phone->1',
    'Nasko->Tablet->3',
    'END'
    ])