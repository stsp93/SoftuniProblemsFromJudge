import { html, render } from "../node_modules/lit-html/lit-html.js"

const body = document.body;

let data = [];
let hidden = true

const createTable = (book,i) => html`<tr>
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>
        <button data-index=${i} >Edit</button>
        <button data-index=${i} >Delete</button>
    </td>
</tr>`

const page = data => html`<button @click=${loadAll} id="loadBooks">LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${data.map((book,i) => createTable(book,i))}
    </tbody>
</table>

<form  id="add-form" style="display:${hidden? 'block':'none'}">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input @click=${addBook} type="submit" value="Submit">
</form>

<form id="edit-form" style="display:${hidden? 'none':'block'}">
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input @click=${editBook} type="submit" value="Save">
</form>
`;

function update() {
    render(page(data), body)
}

update()

async function loadAll() {
    const res = await fetch('http://localhost:3030/jsonstore/collections/books');
    const books = await res.json();
    data = Object.values(books);
    console.log(data);

    update()
}


document.querySelector('tbody').addEventListener('click', onAction);

async function onAction(ev) {
    ev.preventDefault();
    const btn = ev.target;
    if(btn.tagName !== 'BUTTON') return;

    if(btn.textContent === 'Delete') {
        const id = data[btn.dataset.index]._id;
        await fetch (`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        data.splice(btn.dataset.index,1);
        update();
    } else if(btn.textContent === 'Edit') {
        hidden = false;
        update();
        const {title, author} = data[btn.dataset.index];
        const [idIn,titleIn,authorIn] = editForm.querySelectorAll('input');
        titleIn.value = title;
        authorIn.value = author;
        idIn.value = data[btn.dataset.index]._id;

    }
}


const addForm = document.getElementById('add-form')
const editForm = document.getElementById('edit-form')

async function addBook(ev) {
    ev.preventDefault()
    console.log(addForm);
    const formData = new FormData(addForm);
    const payload = Object.fromEntries(formData);

    const res = await fetch('http://localhost:3030/jsonstore/collections/books', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();

    console.log(data);
    addForm.reset()
}

async function editBook(ev) {
    ev.preventDefault();
    const formData = new FormData(editForm);
    const {id,author, title} = Object.fromEntries(formData);

const res = await fetch (`http://localhost:3030/jsonstore/collections/books/${id}`, {
    method:'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({author, title})
})
const data = await res.json();
console.log(data);
editForm.reset()

hidden = true;

update();

}




