import { getUser } from '../api/auth.js';
import { getSearch } from '../api/data.js';
import { html, nothing} from '../lib.js';

const createTemplate = (items = []) => html`<section id="search">
  <h2>Search by Brand</h2>

  <form @submit=${onSubmit} class="search-wrapper cf">
    <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>

  <div id="search-container">
    ${items.length > 0 ? html`<ul class="card-wrapper">
      ${items.map(createItem)}
    </ul>` : html`<h2>There are no results found.</h2>`}


    <!-- Display an h2 if there are no posts -->

  </div>
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
  ${item._ownerId === getUser()?._id ? html`<a class="details-btn" href="/details/${item._id}">Details</a>`: nothing}
  
</li>`

let context;

export function showSearch(ctx, next) {
  context = ctx;
  ctx.render(createTemplate());
}

async function onSubmit(ev) {
  ev.preventDefault();

  const input = ev.target.querySelector('input').value;

  const res = await getSearch(input);

  context.render(createTemplate(res));
}