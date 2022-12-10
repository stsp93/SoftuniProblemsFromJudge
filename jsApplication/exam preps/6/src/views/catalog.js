import { getAllGames } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results =[]) => html` <section id="catalog-page">
<h1>All Games</h1>
<!-- Display div: with information about every game (if any) -->
${results.length > 0 ? results.map(createCard): html`<h3 class="no-articles">No articles yet</h3>`}


<!-- Display paragraph: If there is no games  -->

</section>`

const createCard = (card) => html`<div class="allGames">
<div class="allGames-info">
    <img src=".${card.imageUrl}">
    <h6>${card.category}</h6>
    <h2>${card.title}</h2>
    <a href="/details/${card._id}" class="details-button">Details</a>
</div>
</div>`

export async function showCatalog(ctx, next) {
    const results = await getAllGames();
    ctx.render(createTemplate(results))
}