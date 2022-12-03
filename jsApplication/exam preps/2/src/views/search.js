import { getUser } from "../api/auth.js";
import { searchItems } from "../api/data.js";
import { html,nothing } from "../lib.js"

const createTemplate = (results = [], clicked = false) => html`<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${onSearch} class="button-list">Search</button>
</div>

<h2>Results:</h2>
${clicked ? html`<div class="search-result">
    ${results.length > 0? results.map(createCard) : html`<p class="no-result">No result.</p>`}
</div>`:nothing}

</section>
`

const createCard = (card) => html`<div class="card-box">
<img src="..${card.imgUrl}">
<div>
    <div class="text-center">
        <p class="name">Name: ${card.name}</p>
        <p class="artist">Artist: ${card.artist}</p>
        <p class="genre">Genre: ${card.genre}</p>
        <p class="price">Price: $${card.price}</p>
        <p class="date">Release Date: ${card.date}</p>
    </div>
    ${getUser()? html`<div class="btn-group">
        <a href="/details/${card._id}" id="details">Details</a>
    </div>`:nothing}
    
</div>
</div>`

let context;

export function showSearch(ctx, next) {
    context = ctx;
    ctx.render(createTemplate())
}

async function onSearch() {
    const input = document.querySelector('input').value;

    try{
        const results = await searchItems(input);
        context.render(createTemplate(results,true))


    }catch (err) {
        alert(err)
    }
}