function smallest2Nums(arr) {

    // function findSmallest(array) {
    //     let smallest = Number.MAX_SAFE_INTEGER;
    //     for (let num of array) {
    //         if (num < smallest) {
    //             smallest = num;
    //         }
    //     }
    //     return smallest;
    // }

    // const first = findSmallest(arr)
    // arr.splice(arr.indexOf(first), 1);
    // let second;
    // if(arr.length == 0) {
    //     second = first
    // } else {
    //     second = findSmallest(arr);
    // }

    arr.sort((a, b) => a - b);


    return `${arr[0]} ${arr[1]}`

}

console.log(smallest2Nums([1, 2, 3, -1, 1, 1, -1]));
