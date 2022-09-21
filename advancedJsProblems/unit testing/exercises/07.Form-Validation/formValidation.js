function validate() {
    const [usernameEl, emailEl, passwordEl, confirmPasswordEl, companyCheckboxEl, companyNumberEl] = document.querySelectorAll('.pairContainer input');
    const companyInfoEl = document.querySelector('#companyInfo');
    const btnSubmit = document.querySelector('#submit');
    const validDivEl = document.querySelector('#valid');

    const emailPattern = /^[^@.]+@[^@]*\.[^@]*$/g


    const onCheckboxClick = function () {
        companyInfoEl.style.display = this.checked ? 'block' : 'none';
    }

    const onSubmit = function (e) {
        e.preventDefault()
        let formIsValid = true;

        // username check
        const username = usernameEl.value;
        if (!username.match(/^[A-Za-z0-9]{3,20}$/g)) {
            onInvalid(usernameEl);
            formIsValid = false;
        } else {
            onValid(usernameEl);
        }

        // emailcheck
        const email = emailEl.value;
        if (!email.match(emailPattern)) {
            onInvalid(emailEl);
            formIsValid = false;
        } else {
            onValid(emailEl);
        }

        // password check
        const password = passwordEl.value;
        const confirmPassword = confirmPasswordEl.value;
        if (password.length < 5 || 
            password.length > 15 || 
            password.match(/[^\w]/g) ||
            password !== confirmPassword) {
            onInvalid(passwordEl);
            formIsValid = false;
        } else {
            onValid(passwordEl)
        };
        // confirmPass check
        if (confirmPassword.length < 5 ||
            confirmPassword.length > 15 ||
            confirmPassword.match(/[^\w]/g) ||
            password !== confirmPassword) {
            onInvalid(confirmPasswordEl);
            formIsValid = false;
        } else {

            onValid(confirmPasswordEl)
        };

        //company number check
        if (companyCheckboxEl.checked) {
            const companyNumber = +companyNumberEl.value;
            if (companyNumber < 1000 || companyNumber > 9999) {
                onInvalid(companyNumberEl);
                formIsValid = false;
            } else {
                onValid(companyNumberEl);
            }
        }
        if (formIsValid) {
            validDivEl.style.display = 'block'
        } else {
            validDivEl.style.display = 'none'
        }
    }

    const onInvalid = function (el) {
        // el.style.border = ''
        el.style.borderColor = 'red'
    }
    const onValid = function (el) {
        el.style.border = 'none'
    }

    btnSubmit.addEventListener('click', onSubmit)
    companyCheckboxEl.addEventListener('change', onCheckboxClick)
}
