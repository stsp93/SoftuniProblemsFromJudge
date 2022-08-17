function speedLimit(speed, area) {
    const limits = {
        city: 50,
        interstate: 90,
        motorway: 130,
        residential: 20,
    }
    function speeding(speed, limit) {
        const dif = speed - limit;
        if (dif > 40) {
            return {
                status: `reckless driving`,
                difference: dif,
            }
        }
        if (dif > 20) {
            return {
                status: `excessive speeding`,
                difference: dif,
            }
        }
        if (dif > 0) {
            return {
                status: `speeding`,
                difference: dif,
            }
        }
    }
    if (speeding(speed,limits[area])) {
        const { status, difference } = speeding(speed,limits[area]);
        return `The speed is ${difference} km/h faster than the allowed speed of ${limits[area]} - ${status}`
    } else {
        return `Driving ${speed} km/h in a ${limits[area]} zone`
    }
}
console.log(speedLimit(21, 'residential'));