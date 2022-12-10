import { getUser } from "../api/auth.js";
import { deleteGame, getAllComments, getDetails, postNewComment } from "../api/data.js";
import { html, nothing } from "../lib.js"

const createTemplate = (result, comments, isOwner) => html`<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${result.imageUrl}" />
            <h1>${result.title}</h1>
            <span class="levels">MaxLevel: ${result.maxLevel}</span>
            <p class="type">${result.category}</p>
        </div>

        <p class="text">
            ${result.summary}
        </p>

        <div class="details-comments">
            ${comments.length > 0 ? html`<h2>Comments:</h2>
            <ul>
                ${comments.map(createComment)}
            </ul>
        </div>`: html`<p class="no-comment">No comments.</p>`}
        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${result._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>`: nothing}

    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${!isOwner && getUser() ? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`: nothing}
</section>`

const createComment = (comment) => html`<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`

let context;
export async function showDetails(ctx, next) {
    context = ctx;
    const result = await getDetails(ctx.params.id);
    const isOwner = getUser()?._id === result._ownerId
    let comments = await getAllComments(ctx.params.id);
    ctx.render(createTemplate(result, comments, isOwner));
}

async function onDelete() {
    if (confirm('Are you sure ?')) {
        const res = await deleteGame(context.params.id);
        params.page.redirect(`/`)
    }

}

async function onComment(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target)
    const comment = Object.fromEntries(formData);
    comment['gameId'] = context.params.id;
    try {
        const res = await postNewComment(comment);
        context.page.redirect(`/details/${context.params.id}`)
    } catch (err) {
        alert(err);
    }
}


