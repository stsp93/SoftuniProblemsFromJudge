import { getUser } from "../api/auth.js"
import { deleteMeme, getDetails } from "../api/data.js"
import { html,nothing } from "../lib.js"

const createTemplate = (meme,isCreator) => html`<section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isCreator? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button @click=${onDelete} class="button danger">Delete</button>`:nothing}
        
        
    </div>
</div>
</section>`

let context;
export async function showDetails(ctx, next) {
    context = ctx;
    try {
        const details = await getDetails(ctx.params.id)
        const isCreator = getUser()?._id === details._ownerId
    ctx.render(createTemplate(details,isCreator))
    }catch (err) {
        context.renderError(err)
    }
    
}

async function onDelete() {
    if(confirm('Are you sure?')) {  
             try {
                await deleteMeme(context.params.id);       
        context.page.redirect('/catalog')
             } catch (err) {
                context.renderError(err)
             }
        
    }
}