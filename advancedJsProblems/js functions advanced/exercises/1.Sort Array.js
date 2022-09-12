function sortArr(arr, order) {
    for(let i = 0; i< arr.length;i++){
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if(order === 'asc') {
                if(arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            } else {
                if(arr[j] < arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }

    return arr
}
console.log(sortArr([4, 1, -2, -5], 'asc'));