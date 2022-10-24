function solve() {
    const [fnameIn, lnameIn, emailIn, birthIn, positIn, salaryIn] = document.querySelectorAll('input');
    const hireWorkerBtn = document.querySelector('#add-worker');
    const tBody = document.querySelector('#tbody');
    const salaryEl = document.querySelector('#sum');


    function hire(e) {
        e.preventDefault();

        let fname = fnameIn.value
        let lname = lnameIn.value
        let email = emailIn.value
        let birth = birthIn.value
        let posit = positIn.value
        let salary = salaryIn.value

        if (fname === '' || lname === '' || email === '' || birth === '' || posit === '' || salary === '') return;
        fnameIn.value = '';
        lnameIn.value = '';
        emailIn.value = '';
        birthIn.value = '';
        positIn.value = '';
        salaryIn.value = '';

        let row = document.createElement('tr');
        let fnameTd = document.createElement('td');
        fnameTd.textContent = fname
        let lnameTd = document.createElement('td');
        lnameTd.textContent = lname
        let emailTd = document.createElement('td');
        emailTd.textContent = email
        let birthTd = document.createElement('td');
        birthTd.textContent = birth
        let positTd = document.createElement('td');
        positTd.textContent = posit
        let salaryTd = document.createElement('td');
        salaryTd.textContent = salary


        let buttonTd = document.createElement('td');

        const firedBtn = document.createElement('button');
        firedBtn.textContent = 'Fired';
        firedBtn.classList.add('fired')
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit')

        buttonTd.appendChild(firedBtn);
        buttonTd.appendChild(editBtn);

        row.appendChild(fnameTd)
        row.appendChild(lnameTd)
        row.appendChild(emailTd)
        row.appendChild(birthTd)
        row.appendChild(positTd)
        row.appendChild(salaryTd)
        row.appendChild(buttonTd)

        tBody.appendChild(row);

        let totalSalary = +salaryEl.textContent;
        totalSalary += +salary;
        salaryEl.textContent = totalSalary.toFixed(2)

        firedBtn.addEventListener('click', function() {
            totalSalary = +salaryEl.textContent;
            totalSalary -= +salary;
            salaryEl.textContent = totalSalary.toFixed(2);

            row.remove();
        })

        editBtn.addEventListener('click', function() {
            fnameIn.value = fname;
            lnameIn.value = lname;
            emailIn.value = email;
            birthIn.value = birth;
            positIn.value = posit;
            salaryIn.value = salary;

            totalSalary = +salaryEl.textContent;
            totalSalary -= +salary;
            salaryEl.textContent = totalSalary.toFixed(2);

            row.remove();
        })
    }
    
    hireWorkerBtn.addEventListener('click', hire);

}
solve()