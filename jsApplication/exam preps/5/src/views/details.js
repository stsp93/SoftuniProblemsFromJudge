import { getUser } from "../api/auth.js"
import { addLike, deleteBook, getDetails, getTotalLikes, getUserLike } from "../api/data.js"
import { html,nothing } from "../lib.js"

const createTemplate = (result,isOwner,totalLikes,isLiked,onLike) => html`<section id="details-page" class="details">
<div class="book-information">
    <h3>${result.title}</h3>
    <p class="type">Type: ${result.type}</p>
    <p class="img"><img src="${result.imageUrl}"></p>
    <div class="actions">
        ${isOwner ? html`<a class="button" href="/edit/${result._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`:nothing}
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        
        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        ${!isLiked && !isOwner && getUser() ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`: nothing}
        

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${totalLikes}</span>
        </div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${result.description}</p>
</div>
</section>`

let context;

export async function showDetails(ctx, next) {
    context = ctx;
    let result = await getDetails(ctx.params.id)
    const isOwner = getUser()?._id === result._ownerId;
    let totalLikes = await getTotalLikes(ctx.params.id);
    let isLiked;
    if(!getUser()) {
        isLiked = 0;
    } else {
        isLiked = await getUserLike(ctx.params.id, getUser()?._id)
    }

    async function onLike(ev) {
        ev.target.remove();
        result = await getDetails(ctx.params.id)
        const res = await addLike({bookId:ctx.params.id});
        totalLikes = await getTotalLikes(ctx.params.id);
        if(!getUser()) {
            isLiked = 0;
        } else {
            isLiked = await getUserLike(ctx.params.id, getUser()._id)
        }

        ctx.render(createTemplate(result,isOwner,totalLikes,isLiked,onLike))
    }

    ctx.render(createTemplate(result,isOwner,totalLikes,isLiked,onLike))
}

async function onDelete() {
    if(confirm('Are you sure ?')) {
        const res = deleteBook(context.params.id);

        context.page.redirect('/')
    }
}