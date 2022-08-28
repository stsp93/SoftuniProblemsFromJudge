function storeCatalogue(input) {
    const catalog = {};
    for(let product of input) {
        const letter = product[0].toUpperCase();
        if(!catalog[letter]) {
            catalog[letter] = [product]
        } else {
            catalog[letter].push(product);
        }
    }
    const sorted = Object.entries(catalog).sort((a,b) => a[0].localeCompare(b[0]));
    for(let [letter,...products] of sorted) {
        console.log(letter);
        [products] = products;
        products = products.sort((a,b) => a.localeCompare(b)).map(p => p.replace(' :', ':'))
        console.log(' ' + products.join('\n '));
    }
}
console.log(storeCatalogue(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
));
