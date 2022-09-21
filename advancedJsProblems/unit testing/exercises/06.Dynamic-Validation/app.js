function validate() {
    const emailEl = document.querySelector('#email');
   const emailPattern = /^[a-z]+@[a-z]+\.[a-z]+$/g
   emailEl.addEventListener('change', () => {
    if(!emailEl.value.match(emailPattern)) {
        emailEl.classList.add('error')
    }else {
        emailEl.classList.remove('error')

    }
   })
}