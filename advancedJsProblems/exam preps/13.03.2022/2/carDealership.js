class CarDealership {
    constructor(name){
        this.name = name;
        this.availableCars = [];
        this.soldCars = [];
        this.totalIncome = 0;
    }

    addCar (model, horsepower, price, mileage) {
        if((typeof model !== 'string' || model === '') || 
        (typeof horsepower !== 'number' || horsepower < 0 || !Number.isInteger(horsepower)) ||
        (typeof price !== 'number' || price < 0) ||
        (typeof mileage !== 'number' || mileage < 0)) {
            throw new Error("Invalid input!");
        }

        this.availableCars.push({model, horsepower, price, mileage} );

        return `New car added: ${model} - ${horsepower} HP - ${mileage.toFixed(2)} km - ${price.toFixed(2)}$`
    }

    sellCar (model, desiredMileage) {
        const car = this.availableCars.filter(c => c.model === model)[0];
        if(!car) {
            throw new Error(`${model} was not found!`);
        }
        // let price = car.price;
        if(car.mileage - desiredMileage > 0 && car.mileage - desiredMileage <= 40000) {
            car.price *= 0.95;
        }
        if(car.mileage - desiredMileage > 40000) {
            car.price *= 0.90;
        }
        car.soldPrice = car.price;
        delete car.price
        delete car.mileage;
        this.soldCars.push(car);
        this.availableCars.splice(this.availableCars.indexOf(car), 1);

        this.totalIncome += car.soldPrice;

        return `${model} was sold for ${car.soldPrice.toFixed(2)}$`
    }

    currentCar () {
        const allCars = this.availableCars.map(c => `---${c.model} - ${c.horsepower} HP - ${c.mileage.toFixed(2)} km - ${c.price.toFixed(2)}$`).join('\n');

        if(this.availableCars.length === 0) {
            return `There are no available cars`
        }
        return `-Available cars:\n${allCars}`;
    }

    salesReport (criteria) {
        let sortedSoldCars;
        if(criteria === 'horsepower') {
            sortedSoldCars = this.soldCars.sort((a,b) => b.horsepower - a.horsepower);
        } else if(criteria === 'model') {
            sortedSoldCars = this.soldCars.sort((a,b) => a.model.localeCompare(b.model));
        } else {
            throw new Error("Invalid criteria!")
        }
        sortedSoldCars = sortedSoldCars.map(c => `---${c.model} - ${c.horsepower} HP - ${c.soldPrice.toFixed(2)}$`).join('\n');

        return `-${this.name} has a total income of ${this.totalIncome.toFixed(2)}$\n-${this.soldCars.length} cars sold:\n${sortedSoldCars}`
        
    }
}

let dealership = new CarDealership('SoftAuto');
dealership.addCar('Toyota Corolla', 100, 3500, 190000);
dealership.addCar('Mercedes C63', 300, 29000, 187000);
dealership.addCar('Audi A3', 120, 4900, 240000);
dealership.sellCar('Toyota Corolla', 230000);
dealership.sellCar('Mercedes C63', 110000);
console.log(dealership.salesReport('horsepower'));


