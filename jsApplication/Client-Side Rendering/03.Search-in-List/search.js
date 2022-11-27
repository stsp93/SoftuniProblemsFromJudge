import { html, nothing, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const btn = document.querySelector('button');
const input = document.querySelector('input')
const result = document.getElementById('result');
const townsDiv = document.getElementById('towns');
btn.addEventListener('click', search)

const showTown = (town, searchValue) => html`<li class=${town.includes(searchValue) ? 'active'  : nothing}>${town}</li>`

const showTowns = (towns, searchValue) => html`<ul>
   ${towns.map(t => showTown(t, searchValue))}
</ul>`



render(showTowns(towns), townsDiv)

function search() {
   const userInput = input.value;
   result.textContent = towns.filter(t => t.includes(userInput)).length + ' matches found';

   render(showTowns(towns, userInput), townsDiv)

}

