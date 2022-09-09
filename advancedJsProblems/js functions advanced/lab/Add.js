function solution(input) {

    return function(num) {
        return num += input;
    }
}
let add5 = solution(5);
console.log(add5);
console.log(add5(2));
console.log(add5(3));
