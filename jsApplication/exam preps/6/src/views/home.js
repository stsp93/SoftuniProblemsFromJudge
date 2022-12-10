import { getRecentGames } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results = []) => html`<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>

        <!-- Display div: with information about every game (if any) -->

        ${results.length > 0 ? results.map(createCard) : html`<p class="no-articles">No games yet</p>`}

        <!-- Display paragraph: If there is no games  -->

    </div>
</section>`

const createCard = (card) => html`<div class="game">
    <div class="image-wrap">
        <img src=".${card.imageUrl}">
    </div>
    <h3>${card.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href="/details/${card._id}" class="btn details-btn">Details</a>
    </div>
</div>`



export async function showHome(ctx, next) {
    const results = await getRecentGames()
    ctx.render(createTemplate(results))
}