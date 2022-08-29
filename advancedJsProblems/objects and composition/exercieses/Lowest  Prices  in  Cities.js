function lowestPricesinCities(input) {
    const productObj = {}
    for (let line of input) {
        let [town, product, price] = line.split(' | ');
        price = +price;
        if (!productObj[product] || (productObj[product][0] > price)) {
            productObj[product] = [price, town]
        }
    }
    for(let [product, [price,town]] of Object.entries(productObj)){
        console.log(`${product} -> ${price} (${town})`);
    }
}
console.log(lowestPricesinCities(['Sofia City | Audi | 100000',
'Sofia City | BMW | 100000',
'Sofia City | Mitsubishi | 10000',
'Sofia City | Mercedes | 10000',
'Sofia City | NoOffenseToCarLovers | 0',
'Mexico City | Audi | 1000',
'Mexico City | BMW | 99999',
'Mexico City | Mitsubishi | 10000',
'New York City | Mitsubishi | 1000',
'Washington City | Mercedes | 1000']
));