'use strict'
function compStore(arr) {
    const type = arr.pop();
    arr = arr.map(Number)
    let price = 0;
    let taxes = 0;
    arr.forEach(el => {
        if(el >= 0) {
            price += el;
            taxes += el * 0.2;
        } else {
            console.log('Invalid price!');
        }
    })
    let total = price + taxes;
    if(type === 'special'){
        total *= 0.9
    }

    if(price){
        console.log(`Congratulations you've just bought a new computer!`);
        console.log(`Price without taxes: ${price.toFixed(2)}$`);
        console.log(`Taxes: ${taxes.toFixed(2)}$`);
        console.log('-----------');
        console.log(`Total price: ${total.toFixed(2)}$`);
    } else {
        console.log(`Invalid order!`);
    }
}

    











