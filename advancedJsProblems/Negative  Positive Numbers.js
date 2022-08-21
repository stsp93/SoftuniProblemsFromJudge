function negativePositiveNum(arr) {
    const newArr = []
    arr.forEach((e, i) => {
        if(e >= 0) {
            newArr.push(e);            
        } else {
            newArr.unshift(e);
        }
    });
    return newArr.join('\n');
}
console.log(negativePositiveNum([7, -2, 8, 9]));