import { getSearch } from "../api/data.js";
import { html } from "../lib.js"

const createTemplate = (cars = []) => html`<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button @click = ${onSearch} class="button-list">Search</button>
</div>

<h2>Results:</h2>
<div class="listings">

${cars.length > 0? cars.map(createCarTemplate) : html`<p class="no-cars"> No results.</p>`}
</div>
</section>`

const createCarTemplate = (car) => html`<div class="listing">
<div class="preview">
    <img src="${car.imageUrl}">
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
    </div>
</div>
</div>`

let context;

export function showSearch(ctx, next) {
    ctx.render(createTemplate())
    context = ctx;
}

async function onSearch() {
    const input = document.querySelector('input').value;

    const res = await getSearch(input);

    context.render(createTemplate(res))
}