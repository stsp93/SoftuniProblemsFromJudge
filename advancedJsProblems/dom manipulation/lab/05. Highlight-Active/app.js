function focused() {
    const boxes = document.querySelectorAll('input')
    const onFocus = function (e) {
        e.target.parentElement.classList.add('focused');
    }
    const onBlur = function (e) {
        e.target.parentElement.classList.remove('focused');
    }

    for (let box of boxes) {
        box.addEventListener('focus', onFocus);
        box.addEventListener('blur', onBlur)
    }
}