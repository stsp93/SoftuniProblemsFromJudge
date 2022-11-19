const loadbooksBtn = document.getElementById('loadBooks');
const URL = 'http://localhost:3030/jsonstore/collections/books';
const tbody = document.querySelector('tbody');
const formEl = document.querySelector('form');
const [titleIn, authorIn] = document.querySelectorAll('input')
const form = new FormData(formEl);
const submitBtn = document.querySelector('form button');

async function loadbooks() {
    const res = await fetch(URL);
    const data = await res.json();

    console.log(data);
    tbody.innerHTML = '';
    tbody.insertAdjacentHTML('beforeend', Object.entries(data).map(renderRow).join(''));
}

function renderRow(data) {
    // ********* data[1]._id !!!!!!!!
    const markup = `<tr data-id="${data[0]}">
    <td>${data[1].title}</td>
    <td>${data[1].author}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>`
    return markup;
}

async function submit(ev) {
    ev.preventDefault();
    if(ev.target.textContent === 'Save') return;
    
    const title = titleIn.value;
    const author = authorIn.value;
    if (title === '' || author === '') return;
    const bookData = {
        author,
        title
    }
    



    try {
        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData),
        });
        const data = await res.json();

        tbody.insertAdjacentHTML('beforeend', renderRow(Object.entries(data)));
    } catch (err) {
        console.log(err);
    }

}

function action(ev) {
    const btn = ev.target;
    const id = btn.parentElement.parentElement.dataset.id;

    if(btn.textContent === 'Edit') {
        editBook(id, btn);
    }
    if(btn.textContent === 'Delete') {
        deleteBook(id)
    }
    return;
}

async function editBook(id, btn) {
    const res = await fetch(`${URL}/${id}`);
    const data = await res.json();

   const [titleFormTr, authorFromTr] = btn.parentElement.parentElement.querySelectorAll('td');
    titleIn.value = titleFormTr.textContent;
    authorIn.value = authorFromTr.textContent;
    submitBtn.textContent = 'Save';

    submitBtn.addEventListener('click',() => save(id))

}

async function save(id) {
    const title = titleIn.value;
    const author = authorIn.value;

    const bookData = {
        author,
        title
    }
    const res = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData),
    });
    const data = await res.json();

    submitBtn.textContent = 'Submit'
    submitBtn.removeEventListener('click', () => save(id));
}

async function deleteBook(id) {
    const res = await fetch(`${URL}/${id}`, {
        method:'DELETE'
    });
    const data = await res.json();
}



loadbooksBtn.addEventListener('click', loadbooks);
submitBtn.addEventListener('click', submit);
tbody.addEventListener('click', action)