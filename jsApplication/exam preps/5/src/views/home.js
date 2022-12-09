import { getAllBooks } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results = []) => html`<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    ${results.length > 0 ? html`<ul class="other-books-list">
        ${results.map(createCard)}
    </ul>`: html`<p class="no-books">No books in database!</p>`}

    <!-- Display paragraph: If there are no books in the database -->

</section>`

const createCard = (card) => html`<li class="otherBooks">
    <h3>${card.title}</h3>
    <p>Type: ${card.type}</p>
    <p class="img"><img src="${card.imageUrl}"></p>
    <a class="button" href="/details/${card._id}">Details</a>
</li>`


export async function showHome(ctx, next) {
    const results = await getAllBooks()
    ctx.render(createTemplate(results))
}