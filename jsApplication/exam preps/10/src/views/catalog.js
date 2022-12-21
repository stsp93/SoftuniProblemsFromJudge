import { getAllOffers } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (offers = []) => html`<section id="dashboard">
  <h2>Job Offers</h2>

  <!-- Display a div with information about every post (if any)-->
  ${offers.length > 0 ? offers.map(createCard) : html`<h2>No offers yet.</h2>`}


  <!-- Display an h2 if there are no posts -->

</section>`

const createCard = (card) => html`<div class="offer">
  <img src=${card.imageUrl} alt="example1" />
  <p>
    <strong>Title: </strong><span class="title">${card.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${card.salary}</span></p>
  <a class="details-btn" href="/details/${card._id}">Details</a>
</div>`

export async function showCatalog(ctx, next) {
  const offers = await getAllOffers()
  ctx.render(createTemplate(offers))
}