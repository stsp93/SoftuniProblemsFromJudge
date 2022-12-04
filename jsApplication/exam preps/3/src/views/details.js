import { getUser } from "../api/auth.js"
import { addLikeTheater, deleteTheater, getById, getLikeCount, getUserLike } from "../api/data.js"
import { html, nothing } from "../lib.js"

const createTemplate = (details, isOwner, likesCount, onLike, liked) => html`<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${details.title}</h1>
            <div>
                <img src="..${details.imageUrl}" />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${details.description}</p>
            <h4>Date: ${details.date}</h4>
            <h4>Author: ${details.author}</h4>
            <div class="buttons">
                ${isOwner ? html`<a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${details._id}">Edit</a>` : nothing}
                ${(getUser() && !isOwner && !liked) ? html`<a @click=${onLike} class="btn-like"
                    href="javascript:void(0)">Like</a>
            </div>
            ` : nothing}
            <p class="likes">Likes: ${likesCount}</p>
        </div>
    </div>
</section>`

let context;
export async function showDetails(ctx, next) {
    context = ctx;
    const res = await getById(ctx.params.id);
    let likesCount = await getLikeCount(ctx.params.id)
    let liked = await getUserLike(ctx.params.id, getUser()._id);


    const isOwner = getUser()?._id === res._ownerId;
    ctx.render(createTemplate(res, isOwner, likesCount, onLike, liked));

    async function onLike(ev) {
        ev.target.remove();

        const theaterId = ctx.params.id
        const res2 = await getById(ctx.params.id);
        const like = await addLikeTheater( {theaterId});
        liked = await getUserLike(ctx.params.id, getUser()._id);

        console.log(like);
        console.log(like);

        likesCount = await getLikeCount(ctx.params.id)
        ctx.render(createTemplate(res2, isOwner, likesCount, onLike, liked));

    }
}

async function onDelete() {
    if (confirm('Are you sure?')) {
        const res = await deleteTheater(context.params.id);
        context.page.redirect('/')
    }
}

