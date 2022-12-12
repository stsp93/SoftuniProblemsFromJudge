import { getAllPets } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results = []) => html`<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${results.length > 0 ? results.map(createCard) : html`<div>
            <p class="no-pets">No pets in dashboard</p>
        </div>`}
        <!--If there is no pets in dashboard-->

    </div>
</section>`

const createCard = (pet) => html`<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src=${pet.image}>
    </article>
    <h2 class="name">${pet.name}</h2>
    <h3 class="breed">${pet.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${pet._id}">Details</a>
    </div>
</div>`


export async function showCatalog(ctx, next) {
    const results = await getAllPets()
    ctx.render(createTemplate(results))
}