function biggerHalf(arr) {
    for (let i = 0; i < arr.length - i; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    const arr1 = arr.slice(0,arr.length / 2);
    const arr2 = arr.slice(arr.length / 2);
    if(arr2.length < arr1.length) {
        return arr1
    }
    return arr2
}
console.log(biggerHalf([4, 7, 2, 5]));
