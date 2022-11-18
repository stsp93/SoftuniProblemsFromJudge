const formEl = document.getElementById('form');
const submitBtn = document.getElementById('submit');
const tbodyEl = document.querySelector('tbody');
const URL = 'http://localhost:3030/jsonstore/collections/students/'

function renderRow(data) {
    const tr = document.createElement('tr');
    const firstnameTd = document.createElement('td');
    firstnameTd.textContent = data.firstName;
    const lastnameTd = document.createElement('td');
    lastnameTd.textContent = data.lastName;
    const facNumTd = document.createElement('td');
    facNumTd.textContent = data.facultyNumber;
    const gradeTd = document.createElement('td');
    gradeTd.textContent = data.grade;

    tr.append(firstnameTd, lastnameTd, facNumTd, gradeTd);
    return tr
}

async function submit(ev) {
    ev.preventDefault();

    const form = new FormData(formEl);
    const [firstName, lastName, facultyNumber, grade] = [...form.values()];
    if (firstName === '' || lastName === '' || facultyNumber === '' || grade === '') return;

    const studentData = {
        firstName,
        lastName,
        facultyNumber,
        grade,
    }
    try {
        const res = await fetch(URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        const data = await res.json();
        tbodyEl.appendChild(renderRow(data));

    } catch (err) {
        console.log(err);
    }
}

async function initRender() {
    try {
        const res = await fetch(URL);
        const data = await res.json();

        const tableRows = Object.values(data).map(renderRow);
        tbodyEl.append(...tableRows);
    } catch (err) {
        console.log(err);
    }

}

initRender();

submitBtn.addEventListener('click', submit);