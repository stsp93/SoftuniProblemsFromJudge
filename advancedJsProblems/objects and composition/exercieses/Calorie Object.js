function calorieObject(input) {
    const output = {};
    for(let i = 0; i < input.length; i+=2){
        output[input[i]] = +input[i+1]
    }
    return output
}
console.log(calorieObject(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']));