import { getAllMemes } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results) => html`<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${results.length > 0 ? results.map(createCard) : html`<p class="no-memes">No memes in database.</p>`}

        <!-- Display : If there are no memes in database -->

    </div>
</section>`

const createCard = (meme) => html`<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`


export async function showCatalog(ctx, next) {
    const results = await getAllMemes()

    ctx.render(createTemplate(results))
}