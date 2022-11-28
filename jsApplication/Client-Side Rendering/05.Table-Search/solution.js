import { html, nothing, render } from "../node_modules/lit-html/lit-html.js";

document.querySelector('#searchBtn').addEventListener('click', onClick);
const inputField = document.getElementById('searchField');
const tbody = document.querySelector('tbody');

const generateRow = person => html`<tr class=${person.selected? 'select': nothing}>
   <td>${person.firstName} ${person.lastName}</td>
   <td>${person.email}</td>
   <td>${person.course}</td>
</tr>`;

let persons = []

async function loadPersons() {
   try {

      const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
      const data = await res.json()

      persons = Object.values(data).map(p => Object.assign(p, {selected : false}))

      update()
   } catch (err) {
      console.log(err);
   }
}

function update() {
   render(persons.map(generateRow), tbody) 
}

loadPersons()

function onClick() {
   const input = inputField.value;

   persons.forEach(p => {
      if([p.firstName,p.lastName,p.email,p.course].some(str => str.toLowerCase().includes(input.toLowerCase()))) {
         p.selected = true;
      } else {
         p.selected = false;
      }
   })

update()

}


