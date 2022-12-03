import { getUser } from "../api/auth.js";
import { getAllRecords } from "../api/data.js"
import { html,nothing } from "../lib.js"

const createTemplate = (cards) => html`<section id="catalogPage">
<h1>All Albums</h1>

${cards?.length > 0 ? cards.map(createCard): html`<p>No Albums in Catalog!</p>`}

</section>`

const createCard = (card) => html`<div class="card-box">
<img src="..${card.imgUrl}">
<div>
    <div class="text-center">
        <p class="name">Name: ${card.name}</p>
        <p class="artist">Artist: ${card.artist}</p>
        <p class="genre">Genre: ${card.genre}</p>
        <p class="price">Price: $${card.price}</p>
        <p class="date">Release Date: ${card.releaseDate}</p>
    </div>
    ${getUser()? html`<div class="btn-group">
        <a href="/details/${card._id}" id="details">Details</a>
    </div>`: nothing}
    
</div>
</div>`

export async function showCatalog(ctx, next) {
    const results = await getAllRecords();

    ctx.render(createTemplate(results))
}