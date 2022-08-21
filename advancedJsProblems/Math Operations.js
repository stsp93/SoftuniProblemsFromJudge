function mathOperations(num1, num2, opr) {
    const oprs = {
        '+': num1 + num2,
        '-':num1 - num2,
        '*':num1 * num2,
        '/':num1 / num2,
        '%':num1 % num2,
        '**':num1 ** num2,
    }

    return oprs[opr];
}
console.log(mathOperations(3,5, '+'));
