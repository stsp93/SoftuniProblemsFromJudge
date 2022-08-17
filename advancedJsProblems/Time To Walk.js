function timeToWalk(steps, footprLength, speed) {
    const distKM = (steps * footprLength / 1000);
    const breakTimeMins = distKM % 0.5 === 0 ? Math.floor(distKM / 0.5) - 1 : Math.floor(distKM / 0.5);
    const breakTimeDecimal = (breakTimeMins / 60)
    let timeDec = distKM / speed;
    timeDec += breakTimeDecimal;
    const hours = Math.floor(timeDec);
    const minsDecimal = (timeDec - hours) * 60;
    const minutes = Math.floor(minsDecimal);
    const seconds = ((minsDecimal - minutes) * 60).toFixed(0); 



    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
console.log(timeToWalk(4000, 0.60, 5));