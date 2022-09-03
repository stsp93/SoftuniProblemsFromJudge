function deleteByEmail() {
    const inputEl = document.querySelector('input');
    const emailEls = document.querySelectorAll('tbody td:nth-child(even)');
    const resultEl = document.querySelector('#result')
    for(let el of emailEls) {
        if(el.textContent === inputEl.value){
            el.parentElement.remove();
            inputEl.value = '';
            resultEl.textContent = 'Deleted.'
            return el;
        }
    }

    resultEl.textContent = 'Not found.'
    return ;

}