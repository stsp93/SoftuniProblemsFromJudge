class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = []
    }
    loadingVegetables(vegetables) {
        let types = new Set();
        for (let vegetable of vegetables) {
            let [type, quantity, price] = vegetable.split(' ')
            quantity = +quantity;
            price = +price;
            const product = this.availableProducts.filter(p => p.type === type)[0];
            if (product) {
                product.quantity += quantity;
                if(product.price < price){
                    product.price = price;
                }
            } else {
                this.availableProducts.push({ type, quantity, price })
            }
            types.add(type);
        }
        types = Array.from(types).join(', ')
        return `Successfully added ${types}`;
    }

    buyingVegetables(selectedProducts) {
        let totalPrice = 0
        for (let productBuy of selectedProducts) {
            let [type, quantity] = productBuy.split(' ');
            quantity = +quantity;
            const product = this.availableProducts.filter(p => p.type === type)[0];
            if (!product) {
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`);
            }
            if (product.quantity < quantity) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            }
            const price = quantity * product.price
            product.quantity -= quantity;
            totalPrice += price;
        }
        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`
    }

    rottingVegetable(type, quantity) {
        const product = this.availableProducts.filter(p => p.type === type)[0];

        if (!product) {
            throw new Error(`${type} is not available in the store.`)
        }

        if (product.quantity < quantity) {
            product.quantity = 0;
            return `The entire quantity of the ${type} has been removed.`;
        }

        product.quantity -= quantity;
        return `Some quantity of the ${type} has been removed.`
    }

    revision () {
        this.availableProducts.sort((a,b) => a.price - b.price);
        let sortedProducts = this.availableProducts.map(p => `${p.type}-${p.quantity}-$${p.price}`);
        return `Available vegetables:\n${sortedProducts.join('\n')}\nThe owner of the store is ${this.owner}, and the location is ${this.location}.`
    }
}

let vegStore = new VegetableStore("Jerrie Munro", "1463 Pette Kyosheta, Sofia");
console.log(vegStore.loadingVegetables(["Okra 2.6 3.5", "Okra 2.5 3.5"]));

console.log(vegStore.revision());


