function autoCompany(inputArr) {
    const brands = {}
    for (let line of inputArr) {
        let [brand, model, qty] = line.split(' | ');
        qty = +qty;

        if (brands[brand]) {
            brands[brand][model] ? brands[brand][model] += qty :
                brands[brand][model] = qty;
        } else {
            brands[brand] = { [model]: qty }
        }

    }

    for (let [brand, cars] of Object.entries(brands)) {
        console.log(brand);
        for (let [model, qty] of Object.entries(cars)) {
            console.log(`###${model} -> ${qty}`);
        }
    }
}

autoCompany(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
)