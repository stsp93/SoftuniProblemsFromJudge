function validate() {
    const input = document.querySelector('#email');

    const checkEmail = function (string) {
        const match = string.match(/^[a-z]+@[a-z]+\.[a-z]+$/g);
        if (match) {
            return
        } else {
            return 'error'
        }
    }

    const onChange = function (e) {
        checkEmail(e.target.value) ?
            input.classList.add('error') : input.classList.remove('error')

    }
    input.addEventListener('change', onChange)

}