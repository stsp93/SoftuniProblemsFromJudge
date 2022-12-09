import { getUser } from "../api/auth.js"
import { getMyBooks } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (results = []) => html`<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${results.length > 0 ? html`<ul class="my-books-list">
        ${results.map(createCard)}
    </ul>`: html`<p class="no-books">No books in database!</p>`}


    <!-- Display paragraph: If the user doesn't have his own books  -->

</section>`

const createCard = (card) => html`<li class="otherBooks">
    <h3>${card.title}</h3>
    <p>Type: ${card.type}</p>
    <p class="img"><img src="${card.imageUrl}"></p>
    <a class="button" href="/details/${card._id}">Details</a>
</li>`

export async function showMyBooks(ctx, next) {
    const results = await getMyBooks(getUser()._id)
    ctx.render(createTemplate(results))
}


