import { getAllShoes } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (items) => html`<section id="dashboard">
  <h2>Collectibles</h2>
  <ul class="card-wrapper">
    ${items.length > 0 ? items.map(createItem) : html`<h2>There are no items added yet.</h2>`}

  </ul>


</section>`

const createItem = (item) => html`<li class="card">
  <img src=".${item.imageUrl}" alt="travis" />
  <p>
    <strong>Brand: </strong><span class="brand">${item.brand}</span>
  </p>
  <p>
    <strong>Model: </strong><span class="model">${item.model}</span>
  </p>
  <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
  <a class="details-btn" href="details/${item._id}">Details</a>
</li>`

export async function showDashboard(ctx, next) {

  const results = await getAllShoes();
  ctx.render(createTemplate(results));

}