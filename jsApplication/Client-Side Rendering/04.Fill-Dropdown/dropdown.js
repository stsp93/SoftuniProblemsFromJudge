import { html, render } from "../node_modules/lit-html/lit-html.js";


const [textIn, btn] = document.querySelectorAll('input')
btn.addEventListener('click', addItem)
const menu = document.getElementById('menu')

const addItemMarkup = (item) => html`<option value=${item._id}>${item.text}</option>`

let options = []

async function init() {
     const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown ');
    const data = await res.json();
    options = Object.values(data)
    update()
}
init()

function update() {
    render(options.map(addItemMarkup), menu)
}

async function addItem(ev) {
    ev.preventDefault();
    const text = textIn.value;
    
   const res= await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({text})

    });
    const data = await res.json()

    options.push(data)

   update()

}

