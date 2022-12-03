import { getUser } from "../api/auth.js";
import { deleteItem, getAlbumDetails } from "../api/data.js";
import { html,nothing } from "../lib.js"

const createTemplate = (result, isOwner) => html`<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src="..${result.imgUrl}">
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${result.name}</h1>
            <h3>Artist: ${result.artist}</h3>
            <h4>Genre: ${result.genre}</h4>
            <h4>Price: $${result.price}</h4>
            <h4>Date: ${result.releaseDate}</h4>
            <p>Description: ${result.description}</p>
        </div>

       ${isOwner? html`<div class="actionBtn">
            <a href="/edit/${result._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>`: nothing}
        
    </div>
</div>
</section>`

let context;

export async function showDetails(ctx, next) {
    context = ctx;


    const result = await getAlbumDetails(ctx.params.id)
    const isOwner = getUser()._id === result._ownerId;
    ctx.render(createTemplate(result, isOwner))
}

async function onDelete() {
    if(confirm('Are you sure?')) {
        const res = await deleteItem(context.params.id);
        context.page.redirect('/catalog')
    }
}