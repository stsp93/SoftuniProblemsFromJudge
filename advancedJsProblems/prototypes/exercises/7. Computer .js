function createComputerHierarchy() {
    class Device {
        constructor(manufacturer) {
            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Device {
        constructor(manufacturer, responseTime) {
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Device {
        constructor(manufacturer, width, height) {
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Device {
        constructor(manufacturer, expectedLife) {
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer extends Device {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            super(manufacturer);
            if (this.constructor === Computer) throw new Error('Abstract classes cannot be instantiated');
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weigth, color,battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weigth = weigth;
            this.color = color;
            this.battery = battery;
        }
        get battery() {
            return this._battery;
        }
        set battery(battery) {
            if (battery.constructor !== Battery) throw new TypeError('Passed argumend not of correct type');
            this._battery = battery;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }
        get keyboard() {
            return this._keyboard;
        }
        set keyboard(keyboard) {
            if (keyboard.constructor !== Keyboard) throw TypeError('Passed argumend not of correct type');

            this._keyboard = keyboard;
        }

        get monitor() {
            return this._monitor;
        }
        set monitor(monitor) {
            if (monitor.constructor !== Monitor) throw new TypeError('Passed argumend not of correct type');

            this._monitor = monitor;
        }
    }



    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }


}

const test = createComputerHierarchy();

let keyboard = new test.Keyboard('Logitech', 70);
let monitor = new test.Monitor('Benq', 28, 18);
let desktop = new test.Desktop("JAR Computers", 3.3, 8, 1, keyboard, monitor);

console.log(desktop.manufacturer)
console.log(desktop.processorSpeed)
console.log(desktop.ram)
console.log(desktop.hardDiskSpace)
console.log(desktop.keyboard)
console.log(desktop.monitor)