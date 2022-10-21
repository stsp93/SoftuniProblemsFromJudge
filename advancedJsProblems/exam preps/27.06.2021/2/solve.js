class Restaurant {
    constructor(budgetMoney) {
        this.budgetMoney = budgetMoney;
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        let output = [];
        for (let product of products) {
            let [productName, productQty, productTotalPrice] = product.split(' ');
            [productQty, productTotalPrice] = [+productQty, +productTotalPrice];

            if (this.budgetMoney >= productTotalPrice) {
                this.stockProducts[productName] ?
                    this.stockProducts[productName] += productQty :
                    this.stockProducts[productName] = productQty;

                this.budgetMoney -= productTotalPrice;
                this.history.push(`Successfully loaded ${productQty} ${productName}`);
            } else {
                this.history.push(`There was not enough money to load ${productQty} ${productName}`);
            }
            
        }
        return this.history.join('\n');
    }

    addToMenu(meal, products, price) {
        price = +price;
        if (Object.keys(this.menu).includes(meal)) {
            return `The ${meal} is already in the our menu, try something different.`
        }
        products = products.map(p => {
            let [productName, productQuantity] = p.split(' ');
            productQuantity = +productQuantity;
            return {productName,productQuantity};
        })
        this.menu[meal] = { products, price };

        if (Object.keys(this.menu).length === 1) {
            return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`
        } else {
            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`
        }
    }

    showTheMenu() {
        let output = [];
        for (let [meal, { products, price }] of Object.entries(this.menu)) {
            output.push(`${meal} - $ ${price}`);
        }
        if (output.length > 0) {
            return output.join('\n')
        } else {
            return `Our menu is not ready yet, please come later...`
        }
    }

    makeTheOrder(meal) {
        if (!Object.keys(this.menu).includes(meal)) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }

        if (!this.menu[meal].products.every(p => Object.keys(this.stockProducts).includes(p.productName))) { 
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...` 
        }

        if (!this.menu[meal].products.every(p => this.stockProducts[p.productName] >= p.productQuantity)) {
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...` 
        }

        this.menu[meal].products.forEach(p => this.stockProducts[p.productName] -= p.productQuantity);
        this.budgetMoney += this.menu[meal].price;
       return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`

    }
}

let kitchen = new Restaurant(1000);
console.log(kitchen.loadProducts(['Yogurt 30 3', 'Yogurt 30 3000']));
console.log(kitchen.stockProducts.Yogurt);
console.log(kitchen.budgetMoney);
kitchen.loadProducts(['Yogurt 30 3']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1',], 9.99);
console.log(kitchen.makeTheOrder('frozenYogurt'));


