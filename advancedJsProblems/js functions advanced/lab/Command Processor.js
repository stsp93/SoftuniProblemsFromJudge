function solution() {
    let state = '';

    function append(string){
        return state += string
    }
    function removeStart(n) {
        return state = state.slice(n);
    }
    function removeEnd(n) {
        return state = state.slice(0, -n);
    }
    function print() {
        console.log(state);
    }
    return {append, removeStart, removeEnd, print}
}

let firstZeroTest = solution();


firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
let secondZeroTest = solution();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();
