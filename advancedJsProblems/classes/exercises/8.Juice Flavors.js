function juiceFlavors(inputArr) {
    const juicesObj = {}
    const order = [];
    for (let line of inputArr) {
        let [name, qty] = line.split(' => ');
        qty = +qty;

        juicesObj[name] ? juicesObj[name] += qty : juicesObj[name] = qty;
        if (juicesObj[name] >= 1000 && !order.includes(name)) {
            order.push(name)
        }
    }
    for (let name of order) {
        console.log(`${name} => ${Math.floor(juicesObj[name] / 1000) }`);
    }
}

juiceFlavors(['Orange => 2000',
'Peach => 1432',
'Banana => 450',
'Peach => 600',
'Strawberry => 549']


)
