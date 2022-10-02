'use strict'
function crystals(input) {
    let [finishedCrystal, ...ore] = input;

    
    
    ore.forEach(function (chunk) {
        let [cutCount, lapCount, grindCount, etchCount, xCount] = [0, 0, 0, 0, 0];
        let isXRayed = false;
        function xray(processedChunk){
            return processedChunk +1 ;
        };
        function cut(processedChunk) {
            return processedChunk / 4;
        }
        function lap(processedChunk) {
            return (processedChunk * 0.8)
        }
        function grind(processedChunk) {
            return processedChunk - 20;
        }
        function etch(processedChunk) {
            return processedChunk - 2;
        }
        console.log(`Processing chunk ${chunk} microns`);
        while (chunk !== finishedCrystal) {
            while (chunk / 4 >= finishedCrystal) {
                chunk = cut(chunk);
                cutCount++;
            }
            if (cutCount > 0) {
                console.log(`Cut x${cutCount}`);
                console.log(`Transporting and washing`);
                chunk = Math.floor(chunk);
            }

            while (chunk * 0.8 >= finishedCrystal) {
                chunk = lap(chunk);
                lapCount++;
            }
            if (lapCount > 0) {
                console.log(`Lap x${lapCount}`);
                console.log(`Transporting and washing`);
                chunk = Math.floor(chunk);
            }

            while (chunk - 20 >= finishedCrystal) {
                chunk = grind(chunk);
                grindCount++;
            }
            if (grindCount > 0) {
                console.log(`Grind x${grindCount}`);
                console.log(`Transporting and washing`);
                chunk = Math.floor(chunk);
            }

            while (chunk - 2 >= finishedCrystal - 1) {
                chunk = etch(chunk);
                etchCount++;
            }
            if (etchCount > 0) {
                console.log(`Etch x${etchCount}`);
                console.log(`Transporting and washing`);
                chunk = Math.floor(chunk);
            }
            if (chunk < finishedCrystal) {
                chunk = xray(chunk);
                console.log(`X-ray x1`);
            }
            console.log(`Finished crystal ${finishedCrystal} microns`);

        }
    })
}
crystals();