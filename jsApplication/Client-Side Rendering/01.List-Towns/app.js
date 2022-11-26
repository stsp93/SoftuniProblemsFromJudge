import { html, render } from "../node_modules/lit-html/lit-html.js";

const input = document.getElementById('towns')
const btn = document.getElementById('btnLoadTowns')
const root = document.getElementById('root')

btn.addEventListener('click', onClick)

function onClick(ev) {
    ev.preventDefault();
    const towns = input.value.split(' ');
    console.log(towns);


    

    render(ul(towns), root)

}
const ul = (towns) => html`<ul>
    ${towns.map((t) => html`<li>${t}</li>`)}
</ul>`