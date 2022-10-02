'use strict'
function shoppingList(input) {
    const list = input[0].split('!');
    let index = 1;
    while(input[index] !== 'Go Shopping!') {
        let [command, ...value] = input[index].split(' ');
        if(command === 'Urgent') {
            if(!list.includes(...value)) list.unshift(...value);
        };
        if(command === 'Unnecessary') {
            if(list.includes(...value)) list.splice(list.indexOf(...value), 1);
        };
        if(command === 'Correct') {
            const [oldItem, newItem] = value;
            if(list.includes(oldItem)) list.splice(list.indexOf(oldItem), 1, newItem);
        };
        if(command === 'Rearrange'){
            if(list.includes(...value)) {
                list.splice(list.indexOf(...value), 1);
                list.push(...value);
            };
        };
        index++;
    }


    console.log(list.join(', '));
}
shoppingList(["Tomatoes!Potatoes!Bread",
"Unnecessary Milk",
"Urgent Tomatoes",
"Go Shopping!"])

