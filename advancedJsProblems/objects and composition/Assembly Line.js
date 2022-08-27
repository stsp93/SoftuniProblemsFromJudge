function createAssemblyLine() {
    const hasClima = function (carObject) {
        carObject.temp = 21;
        carObject.tempSettings = 21;
        carObject.adjustTemp = function () {
            if (this.temp < this.tempSettings) {
                this.temp += 1;
            } else if (this.temp > this.tempSettings) {
                this.temp -= 1;
            }
        }
    }
    const hasAudio = function (carObject) {
        carObject.currentTrack = {
            name: null,
            artit: null,
        };
        carObject.nowPlaying = function () {
            console.log(`Now playing '${this.currentTrack.name}' by ${this.currentTrack.artist}`);
        };
    }
    const hasParktronic = function (carObject) {
        carObject.checkDistance = function (distance) {
            if(distance < 0.1) {
                console.log("Beep! Beep! Beep!");
            } else if(distance < 0.25) {
                console.log("Beep! Beep!");
            } else if (distance < 0.5) {
                console.log("Beep!");
            } else {
                console.log('');
            }
        }
    }
    return { hasClima, hasAudio, hasParktronic }
}
const assemblyLine = createAssemblyLine();

const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};
assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);

assemblyLine.hasAudio(myCar);
myCar.currentTrack = {
    name: 'Never Gonna Give You Up',
    artist: 'Rick Astley'
};
myCar.nowPlaying();

assemblyLine.hasParktronic(myCar);
myCar.checkDistance(0.4);
myCar.checkDistance(0.2);



console.log(myCar);
