class Garden {
    constructor(spaceAvailable, plants, storage) {
        this.spaceAvailable = spaceAvailable;
        this.plants = [];
        this.storage = [];
    }

    addPlant(plantName, spaceRequired) {
        if (this.spaceAvailable - spaceRequired < 0) {
            throw new Error("Not enough space in the garden.")
        }

        this.plants.push({ plantName, spaceRequired, ripe: false, quantity: 0 });
        this.spaceAvailable -= spaceRequired;

        return `The ${plantName} has been successfully planted in the garden.`
    }

    ripenPlant(plantName, quantity) {
        const plant = this.plants.filter(p => p.plantName === plantName)[0];

        if (!plant) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }
        if (plant.ripe) {
            throw new Error(`The ${plantName} is already ripe.`);
        }

        if (quantity <= 0) {
            throw new Error("The quantity cannot be zero or negative.");
        }

        plant.ripe = true
        plant.quantity += quantity;

        if (quantity === 1) return `${quantity} ${plantName} has successfully ripened.`;

        return `${quantity} ${plantName}s have successfully ripened.`
    }

    harvestPlant(plantName) {
        const plant = this.plants.filter(p => p.plantName === plantName)[0];
        if (!plant) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }
        if (!plant.ripe) {
            throw new Error(`The ${plantName} cannot be harvested before it is ripe.`);
        }

        this.plants.splice(this.plants.indexOf(plant), 1);

        const quantity = plant.quantity;
        this.storage.push({ plantName, quantity });

        this.spaceAvailable += plant.spaceRequired;

        return `The ${plantName} has been successfully harvested.`
    }

    generateReport() {
        let orderedPlants = this.plants.sort((a,b) => a.plantName.localeCompare(b.plantName));
        orderedPlants = orderedPlants.map(p => `${p.plantName}`).join(', ');
        let storageOut;
        if(this.storage.length === 0) {
            storageOut = `Plants in storage: The storage is empty.`;
        } else {
            storageOut = this.storage.map(p => `${p.plantName} (${p.quantity})`).join(', ')
        }

        return `The garden has ${this.spaceAvailable} free space left.\nPlants in the garden: ${orderedPlants}\nPlants in storage: ${storageOut}`;
    }
}


const myGarden = new Garden(250)
console.log(myGarden.addPlant('apple', 20));
console.log(myGarden.addPlant('orange', 200));
console.log(myGarden.addPlant('raspberry', 10));
console.log(myGarden.ripenPlant('apple', 10));
console.log(myGarden.ripenPlant('orange', 1));
console.log(myGarden.harvestPlant('orange'));
console.log(myGarden.generateReport());
