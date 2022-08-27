function carFactory(carReq) {
    let engine, carriage, wheels;

    const model = carReq.model
    if (carReq.power <= 90) {
        engine = { power: 90, volume: 1800 }
    } else if (carReq.power <= 120) {
        engine = { power: 120, volume: 2400 }
    } else {
        engine = { power: 200, volume: 3500 }
    }

    carriage = { type: carReq.carriage, color: carReq.color };
    wheels = carReq.wheelsize % 2 === 1 ? [0,0,0,0].map(w => w = carReq.wheelsize) : [0,0,0,0].map(w => w = carReq.wheelsize - 1);
    return {model,engine,carriage,wheels}
}
console.log(carFactory({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}
));