function hierarchy() {
    class Figure {
        constructor(units = 'cm') {
            this.units = units;
        }

        unitsMap = {
            'cm': 1,
            'mm': 10,
            'm': 0.01,
        }

        get scale() {
            return this.unitsMap[this.units];
        }
        changeUnits(value) {

            if (!this.unitsMap[value]) return;

            this.units = value
        }
        toString() {
            return `Figures units: ${this.units}`
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius // in cm;

        }

        get area() {
            return (super.scale * this.radius) ** 2 * Math.PI;
        }

        toString() {
            return `${super.toString()} Area: ${super.scale * this.area} - radius: ${super.scale * this.radius}`
        }
    }

    class Rectangle extends Figure {
        constructor(width, height, units) {
            super(units);
            this.width = width; // in cm
            this.height = height; // in cm
        }

        get area() {
            return super.scale * this.width * super.scale * this.height;
        }

        toString() {
            return super.toString() + ` Area: ${this.area} - width: ${super.scale * this.width}, height: ${super.scale * this.height}`
        }
    }

    return { Figure, Circle, Rectangle }
}
const { Circle } = hierarchy()
const { Rectangle } = hierarchy()

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits('mm');
console.log(c.area); // 7853.981633974483
console.log(c.toString()) 
