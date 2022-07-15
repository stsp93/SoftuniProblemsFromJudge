'use strict'
function inventory(input) {
    const myInventory = input[0].split(', ');
    let index = 1;
    while (input[index] !== 'Craft!') {
        let [action, item] = input[index].split(' - ');
        if (action === 'Collect') {
            if (!myInventory.includes(item)) myInventory.push(item);
        };
        if (action === 'Drop') {
            if (myInventory.includes(item)) myInventory.splice(myInventory.indexOf(item), 1);
        };
        if (action === 'Combine Items') {
            const [oldItem, newItem] = item.split(':');
            if (myInventory.includes(oldItem)) myInventory.splice(myInventory.indexOf(oldItem) + 1, 0, newItem);
        };
        if (action === 'Renew') {
            if (myInventory.includes(item)) {
                myInventory.splice(myInventory.indexOf(item), 1);
                myInventory.push(item);
            }
        }
        index++;
    }
    console.log(myInventory.join(', '));
}
inventory([
    'Iron, Wood, Sword', 
    'Collect - Gold', 
    'Drop - Wood', 
    'Craft!'
  ]
)