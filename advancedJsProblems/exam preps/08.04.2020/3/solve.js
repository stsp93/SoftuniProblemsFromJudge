class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }

    newCustomer(customer) {
        if (this.allCustomers.some(c => c.personalId === customer.personalId)) throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`)

        this.allCustomers.push(customer);
        return customer;
    }

    depositMoney(personalId, amount) {
        if (!this.allCustomers.some(c => c.personalId === personalId)) throw new Error(`We have no customer with this ID!`);

        for (let customer of this.allCustomers) {
            if (customer.personalId !== personalId) continue;

            customer.totalMoney ?
                customer.totalMoney += +amount :
                customer.totalMoney = +amount;


            customer.transactions ?
                customer.transactions.unshift(`${customer.firstName} ${customer.lastName} made deposit of ${amount}$!`) :
                customer.transactions = [`${customer.firstName} ${customer.lastName} made deposit of ${amount}$!`];

            return `${customer.totalMoney}$`
        }
    }

    withdrawMoney(personalId, amount) {
        if (!this.allCustomers.some(c => c.personalId === personalId)) throw new Error(`We have no customer with this ID!`);

        const customer = this.allCustomers.find(c => c.personalId === personalId)

            if (!customer.totalMoney || customer.totalMoney < amount) throw new Error(`${customer.firstName} ${customer.lastName} does not have enough money to withdraw that amount!`)

            customer.totalMoney -= +amount


            customer.transactions ?
                customer.transactions.unshift(`${customer.firstName} ${customer.lastName} withdrew ${amount}$!`) :
                customer.transactions = [`${customer.firstName} ${customer.lastName} withdrew ${amount}$!`];

            return `${customer.totalMoney}$`
        
    }

    customerInfo(personalId) {
        if (!this.allCustomers.some(c => c.personalId === personalId)) throw new Error(`We have no customer with this ID!`);

        let firstName;
        let lastName;
        let id;
        let totalMoney;
        let transactions;
        for (let customer of this.allCustomers) {
            if (customer.personalId !== personalId) continue;

            firstName = customer.firstName;
            lastName = customer.lastName;
            id = customer.personalId;
            totalMoney = customer.totalMoney;
            transactions = customer.transactions;
        }
        transactions= transactions.map((t, i) => `${transactions.length - i}. ${t}`);

        return `Bank name: ${this._bankName}\nCustomer name: ${firstName} ${lastName}\nCustomer ID: ${id}\nTotal Money: ${totalMoney}$\nTransactions:\n${transactions.join('\n')}`
    }
}

let bank = new Bank('SoftUni Bank');

console.log(bank.newCustomer({firstName: 'Svetlin', lastName: 'Nakov', personalId: 6233267}));
console.log(bank.newCustomer({firstName: 'Mihaela', lastName: 'Mileva', personalId: 4151596}));

bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596,555);
bank.withdrawMoney(4151596,1155);


console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(4151596));

