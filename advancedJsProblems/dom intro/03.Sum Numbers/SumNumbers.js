function calc() {
    // TODO: sum = num1 + num2
    let num1 = document.querySelector('#num1')
    let num2 = document.querySelector('#num2')
    const sum = document.querySelector('#sum')
    sum.value = +num1.value + +num2.value;
    num1.value = '';
    num2.value = '';
}
