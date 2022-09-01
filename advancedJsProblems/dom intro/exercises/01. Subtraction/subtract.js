function subtract() {
    const resultEl = document.querySelector('#result')
    const firstNumber = +document.querySelector('#firstNumber').value
    const secondNumber = +document.querySelector('#secondNumber').value
    resultEl.textContent = firstNumber - secondNumber
}